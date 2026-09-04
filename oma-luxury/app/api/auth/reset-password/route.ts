import { NextRequest, NextResponse } from "next/server";
import { AUTH_CONFIGURATION_MESSAGE, isAuthConfigured } from "@/lib/auth-config";
import { mapAuthErrorMessage } from "@/lib/auth-server";
import { normalizeEmail, validatePasswordResetInput } from "@/lib/auth-validation";
import { createRouteHandlerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  if (!isAuthConfigured()) {
    return NextResponse.json({ error: AUTH_CONFIGURATION_MESSAGE }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as { email?: string } | null;

  try {
    validatePasswordResetInput(body?.email ?? "");
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid reset request." },
      { status: 400 },
    );
  }

  const { supabase, applyCookies } = createRouteHandlerSupabaseClient(request);
  const redirectTo = `${new URL(request.url).origin}/account/reset-password`;
  const reset = await supabase.auth.resetPasswordForEmail(normalizeEmail(body!.email!), { redirectTo });

  if (reset.error) {
    return applyCookies(
      NextResponse.json({ error: mapAuthErrorMessage(reset.error.message) }, { status: 400 }),
    );
  }

  return applyCookies(NextResponse.json({ ok: true }));
}

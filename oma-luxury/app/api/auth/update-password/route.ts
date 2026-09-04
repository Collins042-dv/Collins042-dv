import { NextRequest, NextResponse } from "next/server";
import { AUTH_CONFIGURATION_MESSAGE, isAuthConfigured } from "@/lib/auth-config";
import { mapAuthErrorMessage } from "@/lib/auth-server";
import { validatePassword } from "@/lib/auth-validation";
import { createRouteHandlerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  if (!isAuthConfigured()) {
    return NextResponse.json({ error: AUTH_CONFIGURATION_MESSAGE }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as { password?: string } | null;

  try {
    validatePassword(body?.password ?? "");
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid password update request." },
      { status: 400 },
    );
  }

  const { supabase, applyCookies } = createRouteHandlerSupabaseClient(request);
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return applyCookies(
      NextResponse.json({ error: "Your recovery session has expired. Request a new reset link." }, { status: 401 }),
    );
  }

  const update = await supabase.auth.updateUser({ password: body!.password! });

  if (update.error) {
    return applyCookies(
      NextResponse.json({ error: mapAuthErrorMessage(update.error.message) }, { status: 400 }),
    );
  }

  return applyCookies(NextResponse.json({ ok: true }));
}

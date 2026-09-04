import { NextRequest, NextResponse } from "next/server";
import { AUTH_CONFIGURATION_MESSAGE, isAuthConfigured } from "@/lib/auth-config";
import { mapAuthErrorMessage } from "@/lib/auth-server";
import { createRouteHandlerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  if (!isAuthConfigured()) {
    return NextResponse.json({ error: AUTH_CONFIGURATION_MESSAGE }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as
    | { accessToken?: string; refreshToken?: string }
    | null;

  if (!body?.accessToken || !body.refreshToken) {
    return NextResponse.json({ error: "Recovery tokens are missing from the reset link." }, { status: 400 });
  }

  const { supabase, applyCookies } = createRouteHandlerSupabaseClient(request);
  const session = await supabase.auth.setSession({
    access_token: body.accessToken,
    refresh_token: body.refreshToken,
  });

  if (session.error) {
    return applyCookies(
      NextResponse.json({ error: mapAuthErrorMessage(session.error.message) }, { status: 400 }),
    );
  }

  return applyCookies(NextResponse.json({ ok: true }));
}

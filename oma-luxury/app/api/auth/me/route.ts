import { NextRequest, NextResponse } from "next/server";
import { AUTH_CONFIGURATION_MESSAGE, isAuthConfigured } from "@/lib/auth-config";
import { buildAuthUser, getProfileByUserId, mapAuthErrorMessage } from "@/lib/auth-server";
import { createRouteHandlerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  if (!isAuthConfigured()) {
    return NextResponse.json({ user: null, error: AUTH_CONFIGURATION_MESSAGE }, { status: 503 });
  }

  const { supabase, applyCookies } = createRouteHandlerSupabaseClient(request);
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return applyCookies(NextResponse.json({ error: mapAuthErrorMessage(error.message) }, { status: 401 }));
  }

  if (!user) {
    return applyCookies(NextResponse.json({ user: null }));
  }

  const profile = await getProfileByUserId(supabase, user.id).catch(() => null);

  return applyCookies(NextResponse.json({ user: buildAuthUser(user, profile) }));
}

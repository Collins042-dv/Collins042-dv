import { NextRequest, NextResponse } from "next/server";
import { AUTH_CONFIGURATION_MESSAGE, isAuthConfigured } from "@/lib/auth-config";
import { buildAuthUser, getProfileByUserId, mapAuthErrorMessage, upsertProfile } from "@/lib/auth-server";
import { normalizeEmail, validateLoginInput } from "@/lib/auth-validation";
import { createRouteHandlerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  if (!isAuthConfigured()) {
    return NextResponse.json({ error: AUTH_CONFIGURATION_MESSAGE }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as { email?: string; password?: string } | null;

  try {
    validateLoginInput(body?.email ?? "", body?.password ?? "");
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid login request." },
      { status: 400 },
    );
  }

  const { supabase, applyCookies } = createRouteHandlerSupabaseClient(request);
  const email = normalizeEmail(body!.email!);
  const password = body!.password!;
  const signIn = await supabase.auth.signInWithPassword({ email, password });

  if (signIn.error || !signIn.data.user) {
    return applyCookies(
      NextResponse.json({ error: mapAuthErrorMessage(signIn.error?.message) }, { status: 401 }),
    );
  }

  const existingProfile = await getProfileByUserId(supabase, signIn.data.user.id).catch(() => null);
  const profile =
    existingProfile ||
    (await upsertProfile(supabase, {
      id: signIn.data.user.id,
      name:
        (typeof signIn.data.user.user_metadata.name === "string" && signIn.data.user.user_metadata.name) ||
        email.split("@")[0],
      email,
      role: "CUSTOMER",
    }).catch(() => null));

  return applyCookies(NextResponse.json({ user: buildAuthUser(signIn.data.user, profile) }));
}

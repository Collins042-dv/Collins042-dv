import { NextRequest, NextResponse } from "next/server";
import { AUTH_CONFIGURATION_MESSAGE, isAuthConfigured } from "@/lib/auth-config";
import { buildAuthUser, mapAuthErrorMessage, upsertProfile } from "@/lib/auth-server";
import { normalizeEmail, validateRegistrationInput } from "@/lib/auth-validation";
import { createRouteHandlerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  if (!isAuthConfigured()) {
    return NextResponse.json({ error: AUTH_CONFIGURATION_MESSAGE }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as
    | { name?: string; email?: string; password?: string }
    | null;

  try {
    validateRegistrationInput(body?.name ?? "", body?.email ?? "", body?.password ?? "");
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid registration request." },
      { status: 400 },
    );
  }

  const name = body!.name!.trim();
  const email = normalizeEmail(body!.email!);
  const password = body!.password!;

  const { supabase, applyCookies } = createRouteHandlerSupabaseClient(request);
  const signUp = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        full_name: name,
      },
    },
  });

  if (signUp.error) {
    const message = mapAuthErrorMessage(signUp.error.message);
    return applyCookies(
      NextResponse.json({ error: message }, { status: message.includes("already exists") ? 409 : 400 }),
    );
  }

  if (signUp.data.session && signUp.data.user) {
    const profile = await upsertProfile(supabase, {
      id: signUp.data.user.id,
      name,
      email,
      role: "CUSTOMER",
    }).catch((error: unknown) =>
      NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create profile." }, { status: 500 }),
    );

    if (profile instanceof NextResponse) {
      return applyCookies(profile);
    }

    return applyCookies(NextResponse.json({ user: buildAuthUser(signUp.data.user, profile) }));
  }

  const signIn = await supabase.auth.signInWithPassword({ email, password });

  if (signIn.error || !signIn.data.user) {
    const normalizedMessage = mapAuthErrorMessage(signIn.error?.message);
    return applyCookies(
      NextResponse.json(
        {
          error:
            normalizedMessage === "Email verification is required before signing in."
              ? "Your account was created, but Supabase email confirmation is enabled. Verify the email or disable confirmation if you need instant sign-in after registration."
              : normalizedMessage,
        },
        { status: 400 },
      ),
    );
  }

  const profile = await upsertProfile(supabase, {
    id: signIn.data.user.id,
    name,
    email,
    role: "CUSTOMER",
  }).catch((error: unknown) =>
    NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create profile." }, { status: 500 }),
  );

  if (profile instanceof NextResponse) {
    return applyCookies(profile);
  }

  return applyCookies(NextResponse.json({ user: buildAuthUser(signIn.data.user, profile) }));
}

import { NextRequest, NextResponse } from "next/server";
import { AUTH_CONFIGURATION_MESSAGE, isAuthConfigured } from "@/lib/auth-config";
import { buildAuthUser, getProfileByUserId, mapAuthErrorMessage, upsertProfile } from "@/lib/auth-server";
import { normalizeEmail, validateProfileInput } from "@/lib/auth-validation";
import { createRouteHandlerSupabaseClient } from "@/lib/supabase/server";

export async function PATCH(request: NextRequest) {
  if (!isAuthConfigured()) {
    return NextResponse.json({ error: AUTH_CONFIGURATION_MESSAGE }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as { name?: string; email?: string } | null;

  try {
    validateProfileInput(body?.name ?? "", body?.email ?? "");
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid profile request." },
      { status: 400 },
    );
  }

  const name = body!.name!.trim();
  const email = normalizeEmail(body!.email!);
  const { supabase, applyCookies } = createRouteHandlerSupabaseClient(request);
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return applyCookies(
      NextResponse.json({ error: "You must be signed in to update your profile." }, { status: 401 }),
    );
  }

  const update = await supabase.auth.updateUser({
    ...(email !== user.email ? { email } : {}),
    data: {
      ...user.user_metadata,
      name,
      full_name: name,
    },
  });

  if (update.error || !update.data.user) {
    return applyCookies(
      NextResponse.json({ error: mapAuthErrorMessage(update.error?.message) }, { status: 400 }),
    );
  }

  const existingProfile = await getProfileByUserId(supabase, user.id).catch(() => null);
  const profile = await upsertProfile(supabase, {
    id: user.id,
    email,
    name,
    role: existingProfile?.role ?? "CUSTOMER",
  });

  return applyCookies(NextResponse.json({ user: buildAuthUser(update.data.user, profile) }));
}

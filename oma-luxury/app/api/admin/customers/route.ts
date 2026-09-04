import { NextRequest, NextResponse } from "next/server";
import { AUTH_CONFIGURATION_MESSAGE, isAuthConfigured } from "@/lib/auth-config";
import { getProfileByUserId } from "@/lib/auth-server";
import { createRouteHandlerSupabaseClient, createServiceRoleSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  if (!isAuthConfigured()) {
    return NextResponse.json({ error: AUTH_CONFIGURATION_MESSAGE }, { status: 503 });
  }

  const { supabase, applyCookies } = createRouteHandlerSupabaseClient(request);
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return applyCookies(NextResponse.json({ error: "You must be signed in to view customers." }, { status: 401 }));
  }

  const profile = await getProfileByUserId(supabase, user.id).catch(() => null);

  if (!profile || profile.role !== "ADMIN") {
    return applyCookies(NextResponse.json({ error: "Admin access is required." }, { status: 403 }));
  }

  let adminSupabase;

  try {
    adminSupabase = createServiceRoleSupabaseClient();
  } catch (error) {
    return applyCookies(
      NextResponse.json(
        { error: error instanceof Error ? error.message : "SUPABASE_SERVICE_ROLE_KEY is required for admin customer access." },
        { status: 500 },
      ),
    );
  }

  const { data, error } = await adminSupabase.from("profiles").select("id, name, email, role").order("name");

  if (error) {
    return applyCookies(
      NextResponse.json(
        { error: "Supabase profiles table is not configured. Create the `profiles` table and policies from the README." },
        { status: 500 },
      ),
    );
  }

  return applyCookies(
    NextResponse.json({
      customers: (data ?? []).map((customer) => ({
        ...customer,
        ordersCount: 0,
        totalSpend: 0,
      })),
    }),
  );
}

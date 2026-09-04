import { NextRequest, NextResponse } from "next/server";
import { isAuthConfigured } from "@/lib/auth-config";
import { createRouteHandlerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  if (!isAuthConfigured()) {
    return NextResponse.json({ ok: true });
  }

  const { supabase, applyCookies } = createRouteHandlerSupabaseClient(request);
  await supabase.auth.signOut();
  return applyCookies(NextResponse.json({ ok: true }));
}

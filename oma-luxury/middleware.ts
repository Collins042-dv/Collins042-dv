import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isAuthConfigured } from "@/lib/auth-config";
import { getProfileByUserId } from "@/lib/auth-server";
import { createMiddlewareSupabaseClient } from "@/lib/supabase/server";

const publicAccountRoutes = new Set([
  "/account/login",
  "/account/register",
  "/account/forgot-password",
]);

export async function middleware(request: NextRequest) {
  if (!isAuthConfigured()) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient(request, response);
  const pathname = request.nextUrl.pathname;
  const protectedAccountRoute = pathname.startsWith("/account") && !publicAccountRoutes.has(pathname);
  const adminRoute = pathname.startsWith("/admin");

  if (!protectedAccountRoute && !adminRoute) {
    return response;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/account/login";
    redirectUrl.searchParams.set("next", `${pathname}${request.nextUrl.search}`);
    return NextResponse.redirect(redirectUrl);
  }

  if (!adminRoute) {
    return response;
  }

  const profile = await getProfileByUserId(supabase, user.id).catch(() => null);

  if (profile?.role !== "ADMIN") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/forbidden";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: ["/account/:path*", "/admin/:path*"],
};

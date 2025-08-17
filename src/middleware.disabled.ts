import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_COOKIE = "adminDash";
const ADMIN_PATH = "/admin";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only guard /admin routes (but not /admin/login and API session setter)
  const isAdminRoute = pathname.startsWith(`${ADMIN_PATH}`) && !pathname.startsWith(`${ADMIN_PATH}/login`);
  const isSessionApi = pathname.startsWith("/api/admin/session");

  if (!isAdminRoute || isSessionApi) return NextResponse.next();

  const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
  const expected = process.env.ADMIN_DASH_PASSWORD;

  if (cookie && expected && cookie === expected) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = `${ADMIN_PATH}/login`;
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*"],
};

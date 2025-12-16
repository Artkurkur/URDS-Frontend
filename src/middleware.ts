import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const pathname = request.nextUrl.pathname;

  const protectedRoutes = [
    "/URDS/MAMAS",
    "/URDS/Chokuliyt",
    "/URDS/Gerald",
  ];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // ❌ Not logged in → force sign in
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/URDS", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/URDS/:path*"],
};

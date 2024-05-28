import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname.includes("/admin") &&
      req.nextauth.token?.user.userTypes !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
    if (
      req.nextUrl.pathname.includes("/reports") &&
      !req.nextUrl.pathname.startsWith("/users") &&
      req.nextauth.token?.user.userTypes === "USER"
    ) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
  },
  {
    callbacks: {
      authorized: (params) => {
        let { token } = params;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/reports/:path*",
    "/statistics/:path*",
    "/users/:path*",
  ],
};

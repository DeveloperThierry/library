import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isTargetPage = nextUrl.pathname === "/admin/books/new";

  // Check if the path starts with /admin and isn't already the target page
  if (nextUrl.pathname.startsWith("/admin") && !isTargetPage) {
    return NextResponse.redirect(new URL("/admin/books/new", nextUrl));
  }

  // Otherwise, continue with normal auth flow
  return NextResponse.next();
});

// Important: The matcher controls which routes this middleware runs on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
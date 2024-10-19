import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const cookies = request.cookies;
  console.log("Hi there");

  return NextResponse.redirect(new URL("/auth"));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/admin/:path*"],
};

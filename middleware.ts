// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  res.headers.set("Access-Control-Allow-Origin", "*");
  // optionally handle pre-flight here too:
  if (req.method === "OPTIONS") {
    res.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return res;
  }
  return res;
}

export const config = {
  matcher: "/api/:path*", // run this middleware only on /api/* routes
};

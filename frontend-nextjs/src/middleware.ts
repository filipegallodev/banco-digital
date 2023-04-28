import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  if (url.pathname === "/nova") {
    url.pathname = "/transferencias/nova";
    return NextResponse.redirect(url);
  }
}

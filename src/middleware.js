import { NextResponse } from "next/server";

export const middleware = (request) => {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // admin 경로인지 확인
  if (pathname.startsWith("/admin")) {
    response.headers.set("x-layout-type", "admin");
  } else {
    response.headers.set("x-layout-type", "mobile");
  }

  return response;
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

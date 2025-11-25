import { NextResponse } from "next/server";

const proxy = (request) => {
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

export default proxy;

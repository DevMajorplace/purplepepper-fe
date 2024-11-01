import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|fonts|images).*)"],
};

// 로그인 이후 접근 불가 페이지
const publicRoutes = ["/login", "/register", "/find-password"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const currentPath = request.nextUrl.pathname;

  // 토큰이 없고 메인이 아닌 회원 페이지에 접근시
  if (!token && currentPath !== "/" && !publicRoutes.includes(currentPath)) {
    const url = request.nextUrl.clone();

    url.pathname = "/login";

    return NextResponse.redirect(url);
  }

  if (token && publicRoutes.includes(currentPath)) {
    const url = request.nextUrl.clone();

    url.pathname = "/dashboard";

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

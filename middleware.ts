import { NextResponse } from 'next/server';
import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';

export default withAuth(
  async function middleware(request: NextRequestWithAuth) {
    const pathname = request.nextUrl.pathname;

    // manifest.json 요청은 예외 처리
    if (pathname === '/manifest.json') {
      return NextResponse.next();
    }

    console.log('middleware 실행', {
      path: request.nextUrl.pathname,
      token: request.nextauth.token,
    });

    // 토큰이 없거나 만료된 경우
    if (!request.nextauth.token) {
      return NextResponse.json(
        { error: '인증되지 않은 요청입니다.' },
        { status: 401 }
      );
    }

    // 토큰의 만료 시간 확인
    const tokenExpires = request.nextauth.token.accessTokenExpires as number;
    if (tokenExpires && Date.now() > tokenExpires) {
      return NextResponse.json(
        { error: '토큰이 만료되었습니다.' },
        { status: 401 }
      );
    }

    // userId와 nickname을 토큰에서 추출
    const userId = request.nextauth.token.userId as string;
    const nickname = request.nextauth.token.nickname as string;

    if (!userId || !nickname) {
      return NextResponse.json(
        { error: '유저 정보를 찾을 수 없습니다.' },
        { status: 401 }
      );
    }

    // 로그인된 경우 /home으로 리다이렉션
    if (
      request.nextUrl.pathname === '/login' ||
      (request.nextUrl.pathname === '/' && request.nextauth.token)
    ) {
      return NextResponse.redirect(new URL('/home', request.url));
    }

    // userId와 인코딩된 nickname을 헤더에 추가
    const response = NextResponse.next();
    response.headers.set('User-Id', userId);
    response.headers.set('Nickname', encodeURIComponent(nickname));
    return response;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/login',
    },
  }
);

// 미들웨어를 적용할 경로 설정
export const config = {
  matcher: [
    // API 경로에 대해서만 적용
    '/api/:path*',
    // auth 관련 경로 및 정적 파일 제외
    '/((?!api/auth|_next/static|_next/image|favicon.ico|manifest.json|login|$).*)',
  ],
};

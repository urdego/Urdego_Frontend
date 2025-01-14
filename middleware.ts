import { NextResponse } from 'next/server';
import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';

export default withAuth(
  async function middleware(request: NextRequestWithAuth) {
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

    return NextResponse.next();
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
    // auth 관련 경로는 제외
    '/((?!api/auth|_next/static|_next/image|favicon.ico|login|$).*)',
  ],
};

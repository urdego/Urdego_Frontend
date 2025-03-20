import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { refreshKakaoToken } from '@/lib/auth/refreshToken';

const KAKAO_UNLINK_URI = 'https://kapi.kakao.com/v1/user/unlink';
const APPLE_UNLINK_URI = 'https://appleid.apple.com/auth/revoke';

export async function POST(req: NextRequest) {
  try {
    // 1. 현재 세션의 토큰 가져오기
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ error: '인증 필요' }, { status: 401 });
    }

    // 세션에서 userId 가져오기
    const userId = token.userId;
    if (!userId) {
      throw new Error('유효한 사용자 ID가 없습니다.');
    }

    // 요청 바디에서 탈퇴 사유 가져오기
    const { withDrawalReason } = await req.json();
    let accessToken = token.accessToken;

    if (!accessToken || typeof accessToken !== 'string') {
      throw new Error('유효한 Access Token이 없습니다.');
    }

    // 2. 소셜 로그인 연결 해제
    if (token.provider === 'kakao') {
      try {
        let kakaoResponse = await fetch(KAKAO_UNLINK_URI, {
          method: 'POST',
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!kakaoResponse.ok) {
          const errorData = await kakaoResponse.json();

          if (
            errorData.code === -401 &&
            token.refreshToken &&
            typeof token.refreshToken === 'string'
          ) {
            console.log('Access Token 만료됨, 갱신 시도');

            try {
              // 리팩토링된 함수 사용
              const newTokenData = await refreshKakaoToken(token.refreshToken);
              accessToken = newTokenData.access_token;

              // 다시 연결 해제 요청
              kakaoResponse = await fetch(KAKAO_UNLINK_URI, {
                method: 'POST',
                headers: { Authorization: `Bearer ${accessToken}` },
              });

              if (!kakaoResponse.ok) {
                throw new Error('카카오 연결 해제 실패');
              }
            } catch (refreshError) {
              console.error('카카오 토큰 갱신 중 오류:', refreshError);
              return NextResponse.json(
                { error: '카카오 연결 해제 실패' },
                { status: 500 }
              );
            }
          } else {
            throw new Error('카카오 연결 해제 실패');
          }
        }
      } catch (error) {
        console.error('카카오 연결 해제 중 오류:', error);
        return NextResponse.json(
          { error: '카카오 연결 해제 실패' },
          { status: 500 }
        );
      }
    } else if (token.provider === 'apple') {
      // 애플 탈퇴 시에만 CSRF 토큰 추출
      const cookies = req.cookies;
      const csrfTokenCookie = cookies.get('__Host-next-auth.csrf-token');

      if (!csrfTokenCookie) {
        throw new Error('CSRF 토큰을 찾을 수 없습니다.');
      }

      // 쿠키 값에서 CSRF 토큰 추출
      console.log('CSRF 토큰 전체:', csrfTokenCookie.value);
      const csrfToken = csrfTokenCookie.value;
      console.log('사용할 CSRF 토큰:', csrfToken);

      const response = await fetch(APPLE_UNLINK_URI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: process.env.APPLE_CLIENT_ID!,
          client_secret: process.env.APPLE_CLIENT_SECRET!,
          token: csrfToken,
        }),
      });

      if (!response.ok) {
        const responseText = await response.text();
        console.error('애플 연결 해제 실패 원본 응답:', responseText);
        try {
          const errorData = JSON.parse(responseText);
          console.error('애플 연결 해제 실패:', errorData);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
          console.error('애플 응답 파싱 실패');
        }
        throw new Error('애플 연결 해제 실패');
      }
    }

    // 3. 백엔드 회원 정보 삭제
    const withdrawResponse = await fetch(
      `${process.env.API_URL}/api/user-service/users/${userId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ withDrawalReason }),
      }
    );

    if (!withdrawResponse.ok) {
      throw new Error('회원 정보 삭제 실패');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('회원 탈퇴 처리 중 에러:', error);
    return NextResponse.json({ error: '회원 탈퇴 처리 실패' }, { status: 500 });
  }
}

import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const KAKAO_UNLINK_URI = 'https://kapi.kakao.com/v1/user/unlink';
const APPLE_UNLINK_URI = 'https://appleid.apple.com/auth/revoke';
const KAKAO_TOKEN_URI = 'https://kauth.kakao.com/oauth/token';

async function refreshKakaoToken(refreshToken: string) {
  if (!refreshToken || typeof refreshToken !== 'string') {
    throw new Error('유효한 Refresh Token이 없습니다.');
  }

  const response = await fetch(KAKAO_TOKEN_URI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: process.env.KAKAO_CLIENT_ID!,
      refresh_token: refreshToken,
      client_secret: process.env.KAKAO_CLIENT_SECRET!, // (+ client_secret 활성화했기에 추가)
    }),
  });

  const tokenData = await response.json();
  console.log('카카오 토큰 갱신 응답:', tokenData);

  if (!response.ok) {
    console.error(
      '카카오 토큰 갱신 실패:',
      response.status,
      response.statusText
    );
    throw new Error('카카오 토큰 갱신 실패');
  }

  return tokenData; // access_token 및 refresh_token 반환
}

export async function POST(req: NextRequest) {
  try {
    // 1. 현재 세션의 토큰 가져오기
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ error: '인증 필요' }, { status: 401 });
    }

    // 요청 바디에서 탈퇴 사유 가져오기
    const { userId, withDrawalReason } = await req.json();
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
      const appleResponse = await fetch(APPLE_UNLINK_URI, {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!appleResponse.ok) {
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

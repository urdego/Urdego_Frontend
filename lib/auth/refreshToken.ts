import type { Token } from 'next-auth';

const KAKAO_TOKEN_URI = 'https://kauth.kakao.com/oauth/token';
const APPLE_TOKEN_URI = 'https://appleid.apple.com/auth/token';

// 카카오 토큰 갱신 함수
export async function refreshKakaoToken(refreshToken: string) {
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
      client_secret: process.env.KAKAO_CLIENT_SECRET!,
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

// 애플 토큰 갱신 함수
export async function refreshAppleToken(refreshToken: string) {
  if (!refreshToken || typeof refreshToken !== 'string') {
    throw new Error('유효한 Refresh Token이 없습니다.');
  }

  const response = await fetch(APPLE_TOKEN_URI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: process.env.APPLE_ID!,
      client_secret: process.env.APPLE_CLIENT_SECRET!,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('애플 토큰 갱신 실패:', errorData);
    throw new Error('애플 토큰 갱신 실패');
  }

  const tokenData = await response.json();
  console.log('애플 토큰 갱신 응답:', tokenData);

  return tokenData;
}

// NextAuth에서 사용하는 통합 토큰 갱신 함수
export async function refreshAccessToken(token: Token): Promise<Token> {
  try {
    console.log('토큰 갱신 시작:', { provider: token.provider });

    if (!token.refreshToken) throw new Error('refresh token이 없습니다.');

    let tokenData;

    if (token.provider === 'kakao') {
      tokenData = await refreshKakaoToken(token.refreshToken);
    } else if (token.provider === 'apple') {
      tokenData = await refreshAppleToken(token.refreshToken);
    } else {
      throw new Error('지원하지 않는 프로바이더입니다.');
    }

    console.log('토큰 갱신 성공:', {
      provider: token.provider,
      expires_in: tokenData.expires_in,
      hasAccessToken: !!tokenData.access_token,
      hasRefreshToken: !!tokenData.refresh_token,
    });

    return {
      ...token,
      accessToken: tokenData.access_token,
      accessTokenExpires: Date.now() + tokenData.expires_in * 1000,
      refreshToken: tokenData.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error('토큰 갱신 실패:', {
      provider: token.provider,
      error: error instanceof Error ? error.message : error,
    });
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

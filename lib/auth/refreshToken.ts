import axios from 'axios';
import type { Token } from 'next-auth';

export async function refreshAccessToken(token: Token): Promise<Token> {
  try {
    console.log('토큰 갱신 시작:', { provider: token.provider });

    if (!token.refreshToken) throw new Error('refresh token이 없습니다.');

    let url: string;
    let body: URLSearchParams;

    if (token.provider === 'kakao') {
      url = 'https://kauth.kakao.com/oauth/token';
      body = new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: process.env.KAKAO_CLIENT_ID!,
        refresh_token: token.refreshToken,
        client_secret: process.env.KAKAO_CLIENT_SECRET!,
      });
    } else if (token.provider === 'apple') {
      url = 'https://appleid.apple.com/auth/token';
      body = new URLSearchParams({
        client_id: process.env.APPLE_CLIENT_ID!,
        client_secret: process.env.APPLE_CLIENT_SECRET!,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      });
    } else {
      throw new Error('지원하지 않는 프로바이더입니다.');
    }

    const response = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('토큰 갱신 성공:', {
      provider: token.provider,
      expires_in: response.data.expires_in,
      hasAccessToken: !!response.data.access_token,
      hasRefreshToken: !!response.data.refresh_token,
    });

    return {
      ...token,
      accessToken: response.data.access_token,
      accessTokenExpires: Date.now() + response.data.expires_in * 1000,
      refreshToken: response.data.refresh_token ?? token.refreshToken,
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

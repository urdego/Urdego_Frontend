import axios from 'axios';
import type { Token } from 'next-auth';

export async function refreshAccessToken(token: Token): Promise<Token> {
  try {
    console.log('토큰 갱신 시작:', { provider: token.provider });

    if (!token.refreshToken) throw new Error('refresh token이 없습니다.');

    const url =
      token.provider === 'kakao'
        ? 'https://kauth.kakao.com/oauth/token'
        : 'https://appleid.apple.com/auth/token';

    console.log('토큰 갱신 요청 URL:', url);

    const response = await axios.post(url, {
      grant_type: 'refresh_token',
      client_id: process.env[`${token.provider?.toUpperCase()}_CLIENT_ID`],
      refresh_token: token.refreshToken,
    });

    console.log('토큰 갱신 성공:', {
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

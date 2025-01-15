import NextAuth, { NextAuthOptions } from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import AppleProvider from 'next-auth/providers/apple';
import { createPrivateKey } from 'crypto';
import { SignJWT } from 'jose';
import { refreshAccessToken } from '@/lib/auth/refreshToken';

// 애플 토큰 생성 함수
const getAppleToken = async () => {
  const key = `-----BEGIN PRIVATE KEY-----\n${process.env.APPLE_PRIVATE_KEY}\n-----END PRIVATE KEY-----`;
  const token = await new SignJWT({})
    .setAudience('https://appleid.apple.com')
    .setIssuer(process.env.APPLE_TEAM_ID!)
    .setIssuedAt(new Date().getTime() / 1000)
    .setExpirationTime(new Date().getTime() / 1000 + 3600 * 2)
    .setSubject(process.env.APPLE_ID!)
    .setProtectedHeader({
      alg: 'ES256',
      kid: process.env.APPLE_KEY_ID,
    })
    .sign(createPrivateKey(key));

  console.log('Generated Apple Client Secret:', token); // 토큰 로그 출력
  return token;
};

// Apple 토큰을 미리 생성
const appleClientSecret = await getAppleToken();

const authOptions: NextAuthOptions = {
  debug: true, // 디버그 모드 활성화
  logger: {
    error: (code, metadata) => {
      console.error('Auth 에러:', code, metadata);
    },
    warn: (code) => {
      console.warn('Auth 경고:', code);
    },
  },
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID!,
      clientSecret: appleClientSecret,
      authorization: {
        params: {
          scope: 'name email',
          response_mode: 'form_post',
          response_type: 'code',
          redirect_uri: process.env.NEXTAUTH_URL + '/api/auth/callback/apple',
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
          from: 'apple',
        };
      },
    }),
  ],

  // Apple 로그인을 위한 쿠키 설정
  cookies: {
    callbackUrl: {
      name: `__Secure-next-auth.callback-url`,
      options: {
        httpOnly: false,
        sameSite: 'none',
        path: '/',
        secure: true,
      },
    },
    pkceCodeVerifier: {
      name: 'next-auth.pkce.code_verifier',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true,
      },
    },
  },

  session: {
    strategy: 'jwt', //JWT 기반 인증
    maxAge: 24 * 60 * 60, // 24시간 - 세션 총 유효기간
    updateAge: 10 * 60 * 60, // 1시간  - 세션 업데이트 주기
  },
  secret: process.env.NEXTAUTH_SECRET, //JWT 암호화 키 설정
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('로그인 시도 데이터:', {
        user,
        account,
        profile,
        email,
        credentials,
      });
      return true;
    },

    async jwt({ token, account }) {
      // 초기 로그인 시 토큰 설정
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = Date.now() + account.expires_in * 1000;
        token.provider = account.provider;
      }

      // 토큰이 만료되지 않았으면 현재 토큰 반환
      const tokenExpires = token.accessTokenExpires as number;
      // 만료 10분 전부터 갱신 시도
      if (tokenExpires && Date.now() + 10 * 60 * 1000 > tokenExpires) {
        console.log('토큰 만료 10분 전, 갱신:', {
          현재시간: new Date(Date.now()).toISOString(),
          만료시간: new Date(tokenExpires).toISOString(),
        });
        return refreshAccessToken(token);
      }

      return token;
    },
    async session({ session, token }) {
      // JWT 토큰의 정보를 세션에 포함
      return {
        ...session,
        user: {
          ...session.user,
          accessToken: token.accessToken,
          // refreshToken은 보안을 위해 클라이언트에 전달 X
        },
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

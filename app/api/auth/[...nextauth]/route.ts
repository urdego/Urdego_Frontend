import NextAuth, { NextAuthOptions } from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import AppleProvider from 'next-auth/providers/apple';
import { createPrivateKey } from 'crypto';
import { SignJWT } from 'jose';

// 애플 토큰 생성 함수
const getAppleToken = async () => {
  const key = `-----BEGIN PRIVATE KEY-----\n${process.env.APPLE_PRIVATE_KEY}\n-----END PRIVATE KEY-----`;
  return await new SignJWT({})
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
          redirect_uri: '/api/auth/callback/apple',
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
    maxAge: 24 * 60 * 60, // 24시간
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
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { authOptions, handler as GET, handler as POST };

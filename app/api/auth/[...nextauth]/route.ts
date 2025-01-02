import NextAuth, { NextAuthOptions } from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import AppleProvider, { AppleProfile } from 'next-auth/providers/apple';
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

const authOptions: NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID!,
      clientSecret: {
        async: true,
        token: async () => {
          console.log('애플 토큰 생성 시작');
          const token = await getAppleToken();
          console.log('생성된 애플 토큰:', token);
          return token;
        },
      } as unknown as string,
      profile(profile: AppleProfile) {
        console.log('애플 프로필 데이터:', profile);
        console.log('애플 프로필 sub:', profile.sub);
        console.log('애플 프로필 email:', profile.email);
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
    async signIn({ user, account, profile }) {
      console.log('로그인 시도:', account?.provider);

      if (account?.provider === 'kakao') {
        console.log('카카오 로그인 정보:');
        console.log('유저:', {
          id: user.id,
          email: user.email,
          name: user.name,
        });
        console.log('카카오 프로필:', profile);
      }

      if (account?.provider === 'apple') {
        console.log('애플 로그인 정보:');
        console.log('유저:', {
          id: user.id,
          email: user.email,
          name: user.name,
        });
        // 애플 최초 로그인시 이름 정보 확인
        if (profile) {
          console.log('애플 프로필:', profile);
        }
      }

      // 필수 정보 검증
      if (!user.id || !user.email) {
        console.log('필수 정보 누락');
        return false;
      }

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

export { handler as GET, handler as POST };

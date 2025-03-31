import type { NextAuthOptions } from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import AppleProvider from 'next-auth/providers/apple';
import { createPrivateKey } from 'crypto';
import { SignJWT } from 'jose';
import { refreshAccessToken } from '@/lib/auth/refreshToken';
import type { AppleRequest, AppleUserInfo } from '@/lib/types/next-auth';

let appleFirstInfo: AppleUserInfo | null = null;

const getAppleToken = async (req?: AppleRequest) => {
  if (
    req?.url?.includes('callback/apple') &&
    req?.method === 'POST' &&
    req.body?.user
  ) {
    appleFirstInfo = JSON.parse(req.body.user);
    console.log('애플 최초 가입 정보:', appleFirstInfo);
  }

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
  return token;
};

const appleClientSecret = await getAppleToken();

export const authOptions: NextAuthOptions = {
  debug: true,
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
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
    updateAge: 10 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const platformType = account?.provider.toUpperCase();
        let requestData;

        if (platformType === 'KAKAO') {
          requestData = {
            nickname: user.name || '',
            email: user.email || '',
            platformType: platformType,
            platformId: user.id || '',
          };
        } else if (platformType === 'APPLE') {
          const emailId = profile?.email?.split('@')[0];
          requestData = {
            nickname: appleFirstInfo?.name
              ? `${appleFirstInfo.name.firstName}${appleFirstInfo.name.lastName || ''}`
              : emailId,
            email: profile?.email || '',
            platformType: platformType,
            platformId: profile?.sub || '',
          };
        }

        const response = await fetch(
          `${process.env.API_URL}/api/user-service/users/save`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
          }
        );

        if (!response.ok) {
          console.error('DB 저장 실패:', await response.text());
          return false;
        }

        const data = await response.json();
        user.userId = data.userId;
        user.nickname = data.nickname;
        return true;
      } catch (error) {
        console.error('로그인 처리 중 에러:', error);
        return false;
      }
    },
    async redirect() {
      return '/home';
    },
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = Date.now() + account.expires_in * 1000;
        token.provider = account.provider;
      }

      if (user) {
        token.userId = user.userId;
        token.nickname = user.nickname;
        token.email = user.email;
      }

      const tokenExpires = token.accessTokenExpires as number;
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
      return {
        ...session,
        user: {
          ...session.user,
          accessToken: token.accessToken,
          userId: token.userId,
          nickname: token.nickname,
          email: token.email,
        },
      };
    },
  },
};

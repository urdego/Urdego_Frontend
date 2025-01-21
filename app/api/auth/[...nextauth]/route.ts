import NextAuth, { NextAuthOptions } from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import AppleProvider from 'next-auth/providers/apple';
import { createPrivateKey } from 'crypto';
import { SignJWT } from 'jose';
import { refreshAccessToken } from '@/lib/auth/refreshToken';
import type {
  AppleRequest,
  AppleUserInfo,
  KakaoProfile,
} from '@/lib/types/next-auth';

// 전역 변수로 이동
let appleFirstInfo: AppleUserInfo | null = null;

// 애플 토큰 생성 함수
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
    async signIn({ user, account, profile }) {
      try {
        const platformType = account?.provider.toUpperCase();

        // 제공자별 닉네임 처리
        let nickname;
        if (platformType === 'KAKAO') {
          // 카카오는 항상 nickname을 제공
          nickname = (profile as KakaoProfile)?.nickname;
        } else if (platformType === 'APPLE') {
          if (appleFirstInfo?.name) {
            // 애플 최초 로그인시에만 이름 정보 사용
            nickname = `${appleFirstInfo.name.firstName}${appleFirstInfo.name.lastName || ''}`;
          }
          // 이름 정보가 없는 경우 nickname은 undefined로 전송
        }

        const response = await fetch(`${process.env.API_URL}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nickname, // 카카오: nickname 전달, 애플: 최초에만 이름 전달, 이후엔 undefined
            email: user.email,
            platformType,
            platformId: user.id,
            profileImageUrl: user.image || '',
            accessToken: account?.access_token,
            refreshToken: account?.refresh_token,
          }),
        });

        if (!response.ok) {
          console.error('DB 저장 실패:', await response.text());
          return false;
        }

        const data = await response.json();
        console.log('DB 저장 성공:', data);
        return true;
      } catch (error) {
        console.error('로그인 처리 중 에러:', error);
        return false;
      }
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

import NextAuth, { NextAuthOptions } from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';

const authOptions: NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
  ],
};

const handler = NextAuth(authOptions);

export { authOptions, handler as GET, handler as POST };

'use client';

import { useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { LoginWrapper } from './Login.styles';
import Image from 'next/image';
import { LogoContainer, SocialButton } from './Login.styles';
import KakaoLogin from '@/styles/Icon/Login/KakaoLogin.svg';
import AppleLogin from '@/styles/Icon/Login/AppleLogin.svg';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const { data: session } = useSession();
  const userId = session?.user?.userId;
  const nickname = session?.user?.nickname;
  const email = session?.user?.email;
  const router = useRouter();

  // store 값 변화 감지
  useEffect(() => {
    // 로그인된 경우 /home으로 리다이렉션
    if (session) {
      router.push('/home');
    }
  }, [userId, nickname, email, session, router]);

  return (
    <LoginWrapper>
      {session ? (
        <>
          <p>{session.user?.email}님 환영합니다</p>
          <button onClick={() => signOut()}>logout</button>
        </>
      ) : (
        <>
          <LogoContainer>
            <SocialButton
              onClick={() =>
                signIn('kakao', { callbackUrl: '/home', redirect: true })
              }
            >
              <Image src={KakaoLogin} alt="kakao-login" />
            </SocialButton>
            <SocialButton
              onClick={() =>
                signIn('apple', { callbackUrl: '/home', redirect: true })
              }
            >
              <Image src={AppleLogin} alt="apple-login" />
            </SocialButton>
          </LogoContainer>
        </>
      )}
    </LoginWrapper>
  );
};

export default LoginPage;

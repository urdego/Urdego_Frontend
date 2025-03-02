'use client';

import { useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { LoginWrapper } from './Login.styles';
import Image from 'next/image';
import { LogoContainer, SocialButton } from './Login.styles';
import KakaoLogin from '@/styles/Icon/Login/KakaoLogin.svg';
import AppleLogin from '@/styles/Icon/Login/AppleLogin.svg';
import useUserStore from '@/stores/useUserStore';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const { data: session } = useSession();
  const userId = useUserStore((state) => state.userId);
  const nickname = useUserStore((state) => state.nickname);
  const email = useUserStore((state) => state.email);
  const { setEmail } = useUserStore();
  const router = useRouter();

  // store 값 변화 감지
  useEffect(() => {
    console.log('로그인 페이지 - 유저 스토어 정보:', {
      userId,
      nickname,
      email,
    });

    // 이메일 저장
    if (session?.user?.email) {
      setEmail(session.user.email);
    }
    // 로그인된 경우 /home으로 리다이렉션
    if (session) {
      router.push('/home');
    }
  }, [userId, nickname, session, router, email, setEmail]);

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

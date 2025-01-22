'use client';

import { useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { LoginWrapper } from './Login.styles';
import LoginThumbnail from '@/styles/Icon/Login/LoginThumbnail.svg';
import Image from 'next/image';
import { LogoContainer, LoginTitle, SocialButton } from './Login.styles';
import KakaoLogin from '@/styles/Icon/Login/KakaoLogin.svg';
import AppleLogin from '@/styles/Icon/Login/AppleLogin.svg';
import useUserStore from '@/stores/useUserStore';

const LoginPage = () => {
  const { data: session } = useSession();
  const { setUserId, setNickname } = useUserStore();
  const userId = useUserStore((state) => state.userId);
  const nickname = useUserStore((state) => state.nickname);

  // 세션 데이터로 store 업데이트
  useEffect(() => {
    if (session?.user?.userId) {
      setUserId(session.user.userId);
      setNickname(session.user.nickname ?? '');
    }
  }, [session, setUserId, setNickname]);

  // store 값 변화 감지
  useEffect(() => {
    console.log('로그인 페이지 - 유저 스토어 정보:', { userId, nickname });
  }, [userId, nickname]);

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
            <Image
              src={LoginThumbnail}
              alt="login-thumbnail"
              width={272}
              height={268}
              priority
            />
            <LoginTitle>어데고?!</LoginTitle>
            <SocialButton
              onClick={() => signIn('kakao', { callbackUrl: '/home' })}
            >
              <Image src={KakaoLogin} alt="kakao-login" />
            </SocialButton>
            <SocialButton
              onClick={() => signIn('apple', { callbackUrl: '/home' })}
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

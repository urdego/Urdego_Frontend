'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { LoginWrapper } from './Login.styles';
import LoginThumbnail from '@/styles/Icon/Login/LoginThumbnail.svg';
import Image from 'next/image';
import { LogoContainer, LoginTitle, SocialButton } from './Login.styles';
import KakaoLogin from '@/styles/Icon/Login/KakaoLogin.svg';
import AppleLogin from '@/styles/Icon/Login/AppleLogin.svg';

const LoginPage = () => {
  const { data: session } = useSession();
  console.log(session?.accessToken); // accessToken

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

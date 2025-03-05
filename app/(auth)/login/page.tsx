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
  const setNickname = useUserStore((state) => state.setNickname);
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      // 세션에서 userId와 email을 사용
      const userId = session.user.userId;
      const email = session.user.email;

      // 스토어에 nickname 저장
      if (session.user.nickname) {
        setNickname(session.user.nickname);
      }

      console.log('로그인 시 세션 정보:', { userId, email });
      console.log('로그인 시 스토어 닉네임:', session.user.nickname);

      // 로그인된 경우 /home으로 리다이렉션
      router.push('/home');
    }
  }, [session, setNickname, router]);

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

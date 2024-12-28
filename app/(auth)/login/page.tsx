'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { LoginWrapper } from './Login.styles';

const LoginPage = () => {
  const { data: session } = useSession();
  console.log(session?.accessToken);

  const handleToken = async () => {
    const response = await fetch('/api/auth/token', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session?.accessToken}`, // 카카오 토큰
      },
    });
    const { token } = await response.json(); // 백엔드 JWT 받기
    return token;
  };

  return (
    <LoginWrapper>
      {session ? (
        <>
          <p>{session.user?.email}님 환영합니다</p>
          <button onClick={() => signOut()}>logout</button>
        </>
      ) : (
        <button onClick={() => signIn('kakao', { callbackUrl: '/home' })}>
          login
        </button>
      )}
    </LoginWrapper>
  );
};

export default LoginPage;

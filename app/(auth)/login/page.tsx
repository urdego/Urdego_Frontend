'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { LoginWrapper } from './Login.styles';

const LoginPage = () => {
  const { data: session } = useSession();
  console.log(session?.accessToken);

  return (
    <LoginWrapper>
      {session ? (
        <>
          <p>{session.user?.email}님 환영합니다</p>
          <button onClick={() => signOut()}>logout</button>
        </>
      ) : (
        <button onClick={() => signIn('kakao')}>login</button>
      )}
    </LoginWrapper>
  );
};

export default LoginPage;

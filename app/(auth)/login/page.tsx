'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { LoginWrapper } from './Login.styles';

const LoginPage = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <LoginWrapper>
        <p>{session.user?.email}님 환영합니다</p>
        <button onClick={() => signOut()}>logout</button>
      </LoginWrapper>
    );
  }

  return (
    <LoginWrapper>
      <button onClick={() => signIn()}>login</button>
    </LoginWrapper>
  );
};

export default LoginPage;

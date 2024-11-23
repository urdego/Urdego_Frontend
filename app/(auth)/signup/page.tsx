'use client';

import NickNameInput from '@/components/Layout/Signup/NickNameInput';
import Input from '@/components/Common/Input/Input';
import { PageWrapper } from '@/app/commonPage.styles';
import { SignupWrapper, Title } from './Signup.styles';
import { useState } from 'react';
import TopBar from '@/components/Common/TopBar/TopBar';

const Signup = () => {
  const [isHiddenPassword, setIsHiddenPassword] = useState({
    origin: true,
    copy: true,
  });

  const handleClick = (type: 'origin' | 'copy') => {
    setIsHiddenPassword((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <>
    <TopBar NavType="default" label="회원가입" />
    <PageWrapper>
      <SignupWrapper>
        <Title>
          어데고?!에서 사용할
          <br />
          닉네임, 아이디, 비밀번호를 입력해주세요.
        </Title>
        <NickNameInput />
        <Input title="아이디" placeholder="아이디를 입력해주세요" />
        <Input
          title="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          isButton={true}
          isHiddenPassword={isHiddenPassword.origin}
          handleClick={() => handleClick('origin')}
        />
        <Input
          title="비밀번호 확인"
          placeholder="비밀번호를 재입력해주세요"
          isButton={true}
          isHiddenPassword={isHiddenPassword.copy}
          handleClick={() => handleClick('copy')}
        />
      </SignupWrapper>
    </PageWrapper>
    </>
  );
};

export default Signup;

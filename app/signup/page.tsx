"use client";

import Input from "@/components/Input/Input";
import { SignupWrapper, Title } from "./Signup.styles";
import NickNameInput from "./components/NickNameInput";
import { useState } from "react";

const Signup = () => {
  const [isHiddenPassword, setIsHiddenPassword] = useState(true);
  const handleClick = () => {
    setIsHiddenPassword(!isHiddenPassword);
  };

  return (
    <SignupWrapper>
      <Title>
        어데고?!에서 사용할
        <br />
        닉네임, 아이디, 비밀번호를 입력해주세요.
      </Title>
      <NickNameInput />
      <Input
        title="아이디"
        placeholder="아이디를 입력해주세요"
        isButton={true}
        isHiddenPassword={isHiddenPassword}
        handleClick={handleClick}
      />
    </SignupWrapper>
  );
};

export default Signup;

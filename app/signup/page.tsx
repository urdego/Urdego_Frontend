"use client";

import NickNameInput from "@/components/Layout/Signup/NickNameInput";
import Input from "@/components/Common/Input/Input";
import { SignupWrapper, Title } from "./Signup.styles";
import { useState } from "react";

const Signup = () => {
  const [isHiddenPassword, setIsHiddenPassword] = useState({
    origin: true,
    copy: true,
  });

  const handleClick = (type: "origin" | "copy") => {
    setIsHiddenPassword((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
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
        handleClick={() => handleClick("origin")}
      />
      <Input
        title="비밀번호 확인"
        placeholder="비밀번호를 재입력해주세요"
        isButton={true}
        isHiddenPassword={isHiddenPassword.copy}
        handleClick={() => handleClick("copy")}
      />
    </SignupWrapper>
  );
};

export default Signup;

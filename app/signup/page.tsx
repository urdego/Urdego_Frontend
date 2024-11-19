"use client";

import Input from "@/components/Input/Input";
import { SignupWrapper } from "./Signup.styles";
import NickNameInput from "./components/NickNameInput";

const Signup = () => {
  return (
    <SignupWrapper>
      <NickNameInput />
      <Input
        title="아이디"
        placeholder="아이디를 입력해주세요"
        isButton={true}
      />
    </SignupWrapper>
  );
};

export default Signup;

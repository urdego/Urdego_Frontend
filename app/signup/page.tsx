"use client";

import Input from "@/components/Input/Input";
import { NickNameWrapper, SignupWrapper } from "./Signup.styles";
import DuplicateCheckButton from "./components/DuplicateCheckButton";

const Signup = () => {
  return (
    <SignupWrapper>
      <NickNameWrapper>
        <Input title="닉네임" placeholder="5~10자의 영문 혹은 영문+숫자 조합" />
        <DuplicateCheckButton />
      </NickNameWrapper>
      <Input
        title="아이디"
        placeholder="아이디를 입력해주세요"
        isButton={true}
      />
    </SignupWrapper>
  );
};

export default Signup;

'use client';

import {
  LoginWrapper,
  LoginTitle,
  ButtonSignupWrapper,
} from '@/app/login/Login.styles';
import LoginLogo from '@layout/Login/LoginLogo';
import Input from '@common/Input/Input';
import AutoLoginCheckbox from '@layout/Login/AutoLogin';
import Button from '@common/Button/Button';
import SignupTabs from '@layout/Login/SignUpTabs';
import SocialLogin from '@/components/Layout/Login/SNSLogos';

const Login = () => {
  return (
    <LoginWrapper>
      <LoginLogo src="" />
      <LoginTitle>Where am I?</LoginTitle>
      <Input title="이메일" placeholder="이메일을 입력해주세요" />
      <Input
        title="비밀번호"
        placeholder="비밀번호를 입력해주세요"
        isButton
        isHiddenPassword
      />
      <AutoLoginCheckbox />
      <ButtonSignupWrapper>
        <Button
          buttonType="gray"
          buttonSize="large"
          buttonHeight="default"
          styleType="coloredBackground"
          label="로그인"
        />
        <SignupTabs />
      </ButtonSignupWrapper>
      <SocialLogin />
    </LoginWrapper>
  );
};

export default Login;

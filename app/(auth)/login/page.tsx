'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  LoginWrapper,
  LoginTitle,
  ButtonSignupWrapper,
} from '@/app/(auth)/login/Login.styles';
import LoginLogo from '@layout/Login/LoginLogo';
import Input from '@common/Input/Input';
import AutoLoginCheckbox from '@layout/Login/AutoLogin';
import Button from '@common/Button/Button';
import SignupTabs from '@layout/Login/SignUpTabs';
import SocialLogin from '@/components/Layout/Login/SNSLogos';
import useUserStore from '@/store/useUserStore';
import ValidationMessage from '@common/ValidationMessage/ValidationMessage';

interface LoginError {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const setNickname = useUserStore((state) => state.setNickname);

  const [isHiddenPassword, setIsHiddenPassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginError>({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordVisibility = () => {
    setIsHiddenPassword((prev) => !prev);
  };

  const validateForm = (): boolean => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    if (!email) {
      newErrors.email = '이메일을 입력해주세요.';
      isValid = false;
    }

    if (!password) {
      newErrors.password = '비밀번호를 입력해주세요.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user-service/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error('로그인에 실패했습니다.');
      }

      const nickname = await response.text();

      // 닉네임을 zustand store에 저장
      setNickname(nickname);

      // 홈 페이지로 이동
      router.push('/home');
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        email: '',
        password: '이메일 또는 비밀번호가 올바르지 않습니다.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginWrapper>
      <LoginLogo src="" />
      <LoginTitle>Where am I?</LoginTitle>
      <Input
        title="이메일"
        placeholder="이메일을 입력해주세요"
        onChange={(value) => setEmail(value)}
        validation={
          errors.email && <ValidationMessage message={errors.email} />
        }
      />
      <Input
        title="비밀번호"
        placeholder="비밀번호를 입력해주세요"
        isButton={true}
        isHiddenPassword={isHiddenPassword}
        handleClick={handlePasswordVisibility}
        onChange={(value) => setPassword(value)}
        type={isHiddenPassword ? 'password' : 'text'}
        validation={
          errors.password && <ValidationMessage message={errors.password} />
        }
      />
      <AutoLoginCheckbox />
      <ButtonSignupWrapper>
        <Button
          buttonType="gray"
          buttonSize="large"
          buttonHeight="default"
          styleType="coloredBackground"
          label="로그인"
          onClick={handleLogin}
          disabled={isLoading}
        />
        <SignupTabs />
      </ButtonSignupWrapper>
      <SocialLogin />
    </LoginWrapper>
  );
};

export default Login;

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  LoginWrapper,
  LoginTitle,
  ButtonSignupWrapper,
  LogoContainer,
} from '@/app/(auth)/login/Login.styles';
import LoginLogo from '@layout/Login/LoginLogo';
import Input from '@common/Input/Input';
import AutoLoginCheckbox from '@layout/Login/AutoLogin';
import Button from '@common/Button/Button';
import SignupTabs from '@layout/Login/SignUpTabs';
import useUserStore from '@/stores/useUserStore';
import ValidationMessage from '@/components/Common/ValidationMessage/ValidationMessage';

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
  const [isFormValid, setIsFormValid] = useState(false);

  const handlePasswordVisibility = () => {
    setIsHiddenPassword((prev) => !prev);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    // 이메일 검증
    if (email) {
      if (!validateEmail(email)) {
        newErrors.email = '이메일 형식이 올바르지 않습니다 (예: xxx@xxx.com)';
        isValid = false;
      }
    }

    // 기존 빈 값 검증
    if (!email || !password) {
      isValid = false;
    }

    setErrors(newErrors);
    setIsFormValid(isValid);
    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

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
      setNickname(nickname);
      toast(`안녕하세요 ${nickname}님 환영합니다!`);
      router.push('/home');
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        email: '',
        password: '이메일 또는 비밀번호가 올바르지 않습니다.',
      });
      setIsFormValid(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (errors.email) {
      setErrors({ ...errors, email: '' });
    }

    if (value && !validateEmail(value)) {
      setErrors((prev) => ({
        ...prev,
        email: '이메일 형식이 올바르지 않습니다 (예: xxx@xxx.com)',
      }));
      setIsFormValid(false);
    } else {
      // 이메일이 유효하고 비밀번호가 있으면 폼 유효
      setIsFormValid(!!value && !!password);
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setErrors({ ...errors, password: '' });

    // 비밀번호가 있고 이메일이 유효하면 폼 유효
    setIsFormValid(!!value && !!email && validateEmail(email));
  };

  return (
    <LoginWrapper>
      <LogoContainer>
        <LoginLogo src="" />
        <LoginTitle>Where am I?</LoginTitle>
      </LogoContainer>
      <form onSubmit={handleLogin} autoComplete="off">
        <Input
          title="이메일"
          placeholder="이메일을 입력해주세요"
          onChange={handleEmailChange}
          autoComplete="new-email"
          validation={
            errors.email ? (
              <ValidationMessage message={errors.email} type="error" />
            ) : null
          }
        />
        <Input
          title="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          isButton={true}
          isHiddenPassword={isHiddenPassword}
          handleClick={handlePasswordVisibility}
          onChange={handlePasswordChange}
          type={isHiddenPassword ? 'password' : 'text'}
          autoComplete="new-password"
          validation={
            errors.password ? (
              <ValidationMessage message={errors.password} type="error" />
            ) : null
          }
        />
        <AutoLoginCheckbox />
        <ButtonSignupWrapper>
          <Button
            buttonType={isFormValid ? 'purple' : 'gray'}
            buttonSize="large"
            buttonHeight="default"
            styleType="coloredBackground"
            label="로그인"
            disabled={isLoading}
          />
          <SignupTabs />
        </ButtonSignupWrapper>
      </form>
    </LoginWrapper>
  );
};

export default Login;

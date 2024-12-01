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
import useUserStore from '@/stores/useUserStore';
import useSSEStore from '@/stores/useSSEStore';
import ValidationMessage from '@/components/Common/ValidationMessage/ValidationMessage';
import { toast } from 'react-hot-toast';

interface LoginError {
  email: string;
  password: string;
}

const connectSSE = (userId: string) => {
  const { setEventSource } = useSSEStore.getState();
  let retryCount = 0;
  const MAX_RETRIES = 3;

  const connect = () => {
    try {
      const url = new URL(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notification-service/sse/${userId}`
      );

      const eventSource = new EventSource(url.toString(), {
        withCredentials: true,
      });

      eventSource.onopen = () => {
        console.log('SSE connection established');
        retryCount = 0;
      };

      eventSource.onerror = (error: Event) => {
        console.error('SSE connection error:', error);
        if (eventSource.readyState === EventSource.CLOSED) {
          eventSource.close();
          setEventSource(null);

          if (retryCount < MAX_RETRIES) {
            retryCount++;
            const delay = Math.min(1000 * Math.pow(2, retryCount), 10000);
            console.log(
              `Attempting reconnection in ${delay / 1000} seconds...`
            );
            setTimeout(connect, delay);
          } else {
            console.error('Max retry attempts reached for SSE connection');
          }
        }
      };

      setEventSource(eventSource);
      return eventSource;
    } catch (error) {
      console.error('Failed to initialize SSE:', error);
      return null;
    }
  };

  return connect();
};

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

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

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

      // 닉네임 받아오기
      const nickname = await response.text();

      localStorage.setItem('userId', email);
      setNickname(nickname);

      // SSE 연결 시도
      try {
        const eventSource = connectSSE(email);
        if (!eventSource) {
          toast(
            '실시간 알림 연결에 실패했습니다. 일부 기능이 제한될 수 있습니다.',
            {
              duration: 3000,
              style: {
                background: '#ffffff',
                color: '#000000',
                fontSize: '14px',
                padding: '12px 20px',
                borderRadius: '4px',
                maxWidth: '280px',
              },
            }
          );
        }
      } catch (sseError) {
        console.error('SSE connection failed:', sseError);
        toast(
          '실시간 알림 연결에 실패했습니다. 일부 기능이 제한될 수 있습니다.'
        );
      }

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
      <form onSubmit={handleLogin} autoComplete="off">
        <Input
          title="이메일"
          placeholder="이메일을 입력해주세요"
          onChange={(value) => setEmail(value)}
          autoComplete="new-email"
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
          autoComplete="new-password"
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
            disabled={isLoading}
          />
          <SignupTabs />
        </ButtonSignupWrapper>
      </form>
      <SocialLogin />
    </LoginWrapper>
  );
};

export default Login;

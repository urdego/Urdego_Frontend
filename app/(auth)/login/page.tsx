'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axiosInstance from '@/lib/axios';
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
import useSSEStore from '@/stores/useSSEStore';
import ValidationMessage from '@/components/Common/ValidationMessage/ValidationMessage';

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
      const url = `/api/notification-service/connect/${encodeURIComponent(userId)}`;
      console.log('Connecting to SSE:', url);

      const eventSource = new EventSource(url, {
        withCredentials: true,
      });

      eventSource.onopen = () => {
        console.log('SSE connection established');
        console.log('Connection details:', {
          readyState: eventSource.readyState,
          url: eventSource.url,
        });
        retryCount = 0;
      };

      eventSource.onmessage = (event) => {
        console.log('Received SSE message:', event.data);
        try {
          const data = JSON.parse(event.data);
          // 메시지 처리 로직
          console.log('Parsed message data:', data);
        } catch (error) {
          console.error('Error parsing SSE message:', error);
        }
      };

      eventSource.onerror = (error) => {
        console.error('SSE Connection Error:', error);
        console.error('Error details:', {
          type: error.type,
          eventPhase: error.eventPhase,
          target: error.target,
          readyState: eventSource?.readyState,
        });

        if (eventSource.readyState === EventSource.CLOSED) {
          eventSource.close();
          setEventSource(null);

          if (retryCount < MAX_RETRIES) {
            retryCount++;
            const delay = Math.min(1000 * Math.pow(2, retryCount), 10000);
            console.log(
              `Attempting reconnection in ${delay / 1000} seconds... (Attempt ${retryCount} of ${MAX_RETRIES})`
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
      const response = await axiosInstance.post('/api/login', {
        email,
        password,
      });

      const nickname = response.data;

      localStorage.setItem('userId', email);
      setNickname(nickname);
      toast(`안녕하세요 ${nickname}님 환영합니다!`);

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

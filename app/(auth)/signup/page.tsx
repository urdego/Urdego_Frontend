'use client';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import NickNameInput from '@/components/Layout/Signup/NickNameInput';
import Input from '@/components/Common/Input/Input';
import { SignupButton, SignupWrapper, Title } from './Signup.styles';
import TopBar from '@/components/Common/TopBar/TopBar';
import ValidationMessage from '@/components/Common/ValidationMessage/ValidationMessage';
import Button from '@/components/Common/Button/Button';

interface SignUpFormData {
  email: string;
  password: string;
  nickname: string;
}

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<SignUpFormData>({
    email: '',
    password: '',
    nickname: '',
  });

  const [isHiddenPassword, setIsHiddenPassword] = useState({
    origin: true,
    copy: true,
  });

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState({
    length: false,
    pattern: false,
    mismatch: false,
  });
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePassword = useCallback((value: string) => {
    const lengthValid = value.length >= 8;
    const patternValid =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/.test(value);

    setErrors((prev) => ({
      ...prev,
      length: !lengthValid && value.length > 0,
      pattern: !patternValid && value.length > 0,
    }));

    return lengthValid && patternValid;
  }, []);

  const validatePasswordMatch = useCallback(
    (confirmValue: string) => {
      const isMatch = password === confirmValue;
      setErrors((prev) => ({
        ...prev,
        mismatch: !isMatch && confirmValue.length > 0,
      }));
      return isMatch;
    },
    [password]
  );

  const handleClick = (type: 'origin' | 'copy') => {
    setIsHiddenPassword((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleSignup = async () => {
    if (!formData.email || !formData.password || !formData.nickname) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    if (!isNicknameValid) {
      alert('닉네임 중복 확인이 필요합니다.');
      return;
    }

    if (!validatePassword(password)) {
      alert('비밀번호 형식을 확인해주세요.');
      return;
    }

    if (!validatePasswordMatch(passwordConfirm)) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user-service/users`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert('회원가입이 완료되었습니다.');
        router.push('/login');
      } else {
        const errorData = await response.text();
        alert(`회원가입 실패: ${errorData}`);
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('회원가입 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <TopBar NavType="default" label="회원가입" />
      <SignupWrapper>
        <Title>
          어데고?!에서 사용할 <br /> 닉네임, 아이디, 비밀번호를 입력해주세요.
        </Title>
        <NickNameInput
          onNicknameValidated={(nickname: string, isValid: boolean) => {
            setFormData((prev) => ({ ...prev, nickname }));
            setIsNicknameValid(isValid);
          }}
        />
        <Input
          title="이메일"
          placeholder="이메일을 입력해주세요"
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, email: value }))
          }
          autoComplete="off" // 자동완성 방지
        />
        <Input
          title="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          isButton={true}
          isHiddenPassword={isHiddenPassword.origin}
          handleClick={() => handleClick('origin')}
          onChange={(value) => {
            setPassword(value);
            setFormData((prev) => ({ ...prev, password: value }));
            validatePassword(value);
            if (passwordConfirm) {
              validatePasswordMatch(passwordConfirm);
            }
          }}
          type={isHiddenPassword.origin ? 'password' : 'text'}
          autoComplete="new-password" // 자동완성 방지
          validation={
            <>
              {errors.length && (
                <ValidationMessage message="비밀번호는 8자리 이상이어야 합니다." />
              )}
              {errors.pattern && (
                <ValidationMessage message="비밀번호는 숫자, 영문, 특수문자를 포함해야 합니다." />
              )}
            </>
          }
        />
        <Input
          title="비밀번호 확인"
          placeholder="비밀번호를 재입력해주세요"
          isButton={true}
          isHiddenPassword={isHiddenPassword.copy}
          handleClick={() => handleClick('copy')}
          onChange={(value) => {
            setPasswordConfirm(value);
            validatePasswordMatch(value);
          }}
          type={isHiddenPassword.copy ? 'password' : 'text'}
          autoComplete="new-password" // 자동완성 방지
          validation={
            errors.mismatch && (
              <ValidationMessage message="비밀번호가 일치하지 않습니다." />
            )
          }
        />
        <SignupButton>
          <Button
            buttonType="gray"
            buttonSize="large"
            buttonHeight="default"
            styleType="coloredBackground"
            label="회원가입"
            onClick={handleSignup}
            disabled={isSubmitting}
          />
        </SignupButton>
      </SignupWrapper>
    </>
  );
};

export default Signup;

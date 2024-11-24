'use client';
import { useState, useCallback } from 'react';
import NickNameInput from '@/components/Layout/Signup/NickNameInput';
import Input from '@/components/Common/Input/Input';
import { PageWrapper } from '@/app/commonPage.styles';
import { SignupWrapper, Title } from './Signup.styles';
import TopBar from '@/components/Common/TopBar/TopBar';
import ValidationMessage from '@/components/Common/ValidationMessage/ValidationMessage';

const Signup = () => {
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
    },
    [password]
  );

  const handleClick = (type: 'origin' | 'copy') => {
    setIsHiddenPassword((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <>
      <TopBar NavType="default" label="회원가입" />
      <PageWrapper>
        <SignupWrapper>
          <Title>
            어데고?!에서 사용할 <br /> 닉네임, 아이디, 비밀번호를 입력해주세요.
          </Title>
          <NickNameInput />
          <Input title="아이디" placeholder="아이디를 입력해주세요" />
          <Input
            title="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            isButton={true}
            isHiddenPassword={isHiddenPassword.origin}
            handleClick={() => handleClick('origin')}
            onChange={(value) => {
              setPassword(value);
              validatePassword(value);
              // 비밀번호가 변경될 때 비밀번호 확인란도 다시 검증
              if (passwordConfirm) {
                validatePasswordMatch(passwordConfirm);
              }
            }}
            type={isHiddenPassword.origin ? 'password' : 'text'}
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
            validation={
              errors.mismatch && (
                <ValidationMessage message="비밀번호가 일치하지 않습니다." />
              )
            }
          />
        </SignupWrapper>
      </PageWrapper>
    </>
  );
};

export default Signup;

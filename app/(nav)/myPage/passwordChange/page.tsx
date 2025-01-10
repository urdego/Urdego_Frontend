'use client';

import { useState } from 'react';
import TopBar from '@/components/Common/TopBar/TopBar';
import RoomTitleInput from '@layout/MakeRoom/RoomTitleInput';
import Button from '@common/Button/Button';
import {
  PasswordChangeWapper,
  PasswordInputWrapper,
} from '@/app/(nav)/myPage/passwordChange/passwordChange.styles';

const PasswordChangePage = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const isButtonEnabled =
    password.trim().length > 0 &&
    newPassword.trim().length > 0 &&
    confirmPassword.trim().length > 0;

  return (
    <>
      <TopBar NavType="default" label="비밀번호 변경" />
      <PasswordChangeWapper>
        <PasswordInputWrapper>
          <RoomTitleInput
            label="현재 비밀번호"
            placeholder="현재 비밀번호 입력"
            onChange={handlePasswordChange}
          />
          <RoomTitleInput
            label="새 비밀번호"
            placeholder="8자 이상의 문자 입력 (숫자, 영어, 특수문자 포함)"
            onChange={handleNewPasswordChange}
          />
          <RoomTitleInput
            label="새 비밀번호 재 입력"
            placeholder="영문, 숫자, 특수문자 포함 0자 이상"
            onChange={handleConfirmPasswordChange}
          />
        </PasswordInputWrapper>
        <Button
          buttonType={isButtonEnabled ? 'purple' : 'gray'}
          buttonSize="large"
          buttonHeight="default"
          styleType="coloredBackground"
          label="변경하기"
          disabled={!isButtonEnabled}
        />
      </PasswordChangeWapper>
    </>
  );
};

export default PasswordChangePage;

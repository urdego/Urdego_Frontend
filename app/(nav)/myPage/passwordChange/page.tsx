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
            placeholder="비밀번호를 입력해주세요"
            onChange={handlePasswordChange}
          />
          <RoomTitleInput
            label="새 비밀번호"
            placeholder="비밀번호를 입력해주세요"
            onChange={handleNewPasswordChange}
          />
          <RoomTitleInput
            label="비밀번호 확인"
            placeholder="비밀번호를 입력해주세요"
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

'use client';

import { useState } from 'react';
import TopBar from '@/components/Common/TopBar/TopBar';
import RoomTitleInput from '@layout/MakeRoom/RoomTitleInput';
import Button from '@common/Button/Button';
import { NicknameChangeWapper } from '@/app/(nav)/myPage/nicknameChange/nicknameChange.styles';

const NicknameChangePage = () => {
  const [nickname, setNickname] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const isButtonEnabled = nickname.trim().length > 0;

  return (
    <>
      <TopBar NavType="default" label="닉네임 변경" />
      <NicknameChangeWapper>
        <RoomTitleInput
          label="새 닉네임"
          placeholder="닉네임을 입력해주세요"
          onChange={handleInputChange}
        />
        <Button
          buttonType={isButtonEnabled ? 'purple' : 'gray'}
          buttonSize="large"
          buttonHeight="default"
          styleType="coloredBackground"
          label="변경하기"
          disabled={!isButtonEnabled}
        />
      </NicknameChangeWapper>
    </>
  );
};

export default NicknameChangePage;

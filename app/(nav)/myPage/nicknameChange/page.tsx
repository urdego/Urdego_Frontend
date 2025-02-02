'use client';

import { useState } from 'react';
import useUserStore from '@/stores/useUserStore';
import TopBar from '@/components/Common/TopBar/TopBar';
import RoomTitleInput from '@layout/MakeRoom/RoomTitleInput';
import Button from '@common/Button/Button';
import { NicknameChangeWapper } from '@/app/(nav)/myPage/nicknameChange/nicknameChange.styles';

const NicknameChangePage = () => {
  const { userId } = useUserStore(); // Zustand에서 userId 가져오기
  const [nickname, setNickname] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleChangeNickname = async () => {
    if (!userId) {
      alert('사용자 정보가 없습니다.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/nickname', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Id': userId.toString(), // ✅ 변경: userId를 헤더에 포함
        },
        body: JSON.stringify({ newNickname: nickname }), // ✅ userId는 헤더로 보내므로 body에서 제거
      });

      if (!response.ok) {
        throw new Error('Failed to change nickname');
      }

      const data = await response.json();
      console.log('Nickname change response:', data);
      alert('닉네임이 성공적으로 변경되었습니다!');
    } catch (error) {
      console.error('Error changing nickname:', error);
      alert('닉네임 변경에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonEnabled = nickname.trim().length > 0 && !isLoading;

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
          label={isLoading ? '변경 중...' : '변경하기'}
          disabled={!isButtonEnabled}
          onClick={handleChangeNickname}
        />
      </NicknameChangeWapper>
    </>
  );
};

export default NicknameChangePage;

'use client';

import { useState } from 'react';
import TopBar from '@/components/Common/TopBar/TopBar';
import RoomTitleInput from '@layout/MakeRoom/RoomTitleInput';
import Button from '@common/Button/Button';
import { NicknameChangeWapper } from '@/app/(nav)/myPage/nicknameChange/nicknameChange.styles';

const NicknameChangePage = () => {
  const [nickname, setNickname] = useState('');
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleChangeNickname = async () => {
    setIsLoading(true); // 로딩 시작
    try {
      const response = await fetch('/api/nickname', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newNickname: nickname }),
      });

      if (!response.ok) {
        throw new Error('Failed to change nickname');
      }

      const data = await response.json();
      console.log('Nickname change response:', data); // 응답 확인
      alert('닉네임이 성공적으로 변경되었습니다!');
    } catch (error) {
      console.error('Error changing nickname:', error);
      alert('닉네임 변경에 실패했습니다.');
    } finally {
      setIsLoading(false); // 로딩 종료
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
          onClick={handleChangeNickname} // 버튼 클릭 시 닉네임 변경 함수 호출
        />
      </NicknameChangeWapper>
    </>
  );
};

export default NicknameChangePage;

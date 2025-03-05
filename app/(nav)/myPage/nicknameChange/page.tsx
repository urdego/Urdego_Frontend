'use client';

import { useState, useEffect, useRef } from 'react';
import useUserStore from '@/stores/useUserStore';
import TopBar from '@/components/Common/TopBar/TopBar';
import RoomTitleInput from '@layout/MakeRoom/RoomTitleInput';
import Button from '@common/Button/Button';
import { NicknameChangeWapper } from '@/app/(nav)/myPage/nicknameChange/nicknameChange.styles';
import { useRouter } from 'next/navigation';
import AlertToast from '@/components/Common/Toast/AlertToast';

const NicknameChangePage = () => {
  const { userId } = useUserStore();
  const setNicknameStore = useUserStore((state) => state.setNickname);
  const [nickname, setNickname] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // 컴포넌트 마운트 시 RoomTitleInput에 포커스 지정
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleChangeNickname = async () => {
    if (!userId) {
      AlertToast({ message: '사용자 정보가 없습니다.' });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/nickname', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Id': userId.toString(),
        },
        body: JSON.stringify({ newNickname: nickname }),
      });

      if (!response.ok) {
        throw new Error('Failed to change nickname');
      }

      const data = await response.json();
      console.log('Nickname change response:', data);
      setNicknameStore(nickname);
      // 성공 시 MyPage로 이동 후 토스트 메시지 표시
      router.push('/myPage');
      AlertToast({ message: '닉네임 변경 처리가 완료되었습니다.' });
    } catch (error) {
      console.error('Error changing nickname:', error);
      // 실패 시 페이지 이동 없이 토스트 메시지 표시
      AlertToast({ message: '사용할 수 없거나 중복된 닉네임입니다.' });
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
          ref={inputRef}
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

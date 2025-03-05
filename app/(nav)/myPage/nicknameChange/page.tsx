'use client';

import { useState, useEffect, useRef } from 'react';
import useUserStore from '@/stores/useUserStore';
import TopBar from '@/components/Common/TopBar/TopBar';
import RoomTitleInput from '@layout/MakeRoom/RoomTitleInput';
import Button from '@common/Button/Button';
import { NicknameChangeWapper } from '@/app/(nav)/myPage/nicknameChange/nicknameChange.styles';
import { useRouter } from 'next/navigation';
import AlertModal from '@components/Common/AlertModal/AlertModal';

const NicknameChangePage = () => {
  const { userId } = useUserStore();
  const setNicknameStore = useUserStore((state) => state.setNickname);
  const [nickname, setNickname] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  // 컴포넌트 마운트 시 RoomTitleInput에 포커스 지정
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
      setIsAlertModalOpen(true);
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
      <AlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        onConfirm={() => {
          setIsAlertModalOpen(false);
          // 마이페이지로 이동
          router.push('/myPage');
        }}
        title="회원 탈퇴 처리가 완료되었습니다."
        confirmOnly
      />
    </>
  );
};

export default NicknameChangePage;

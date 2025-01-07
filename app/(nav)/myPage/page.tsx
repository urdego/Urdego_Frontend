'use client';
import { useState } from 'react';
import TopBar from '@/components/Common/TopBar/TopBar';
import { useRouter } from 'next/navigation';
import {
  MyPageWrapper,
  ProfileWrapper,
  SmallButtonWrapper,
  Separator,
} from '@/app/(nav)/myPage/myPage.styles';
import ProfileInfo from '@/components/Layout/MyPage/ProfileInfo';
import SettingButton from '@/components/Layout/MyPage/SettingButton';
import SmallButton from '@/components/Layout/MyPage/SmallButton';
import AlertModal from '@/components/Common/AlertModal/AlertModal';

const MyPage = () => {
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    // 로그아웃 로직
    setIsLogoutModalOpen(false);
  };

  return (
    <>
      <TopBar NavType="default" label="마이페이지" />
      <MyPageWrapper>
        <ProfileWrapper>
          <ProfileInfo />
          <SmallButtonWrapper>
            <SmallButton onClick={() => {}}>캐릭터 수정</SmallButton>
            <SmallButton onClick={() => router.push('/myPage/nicknameChange')}>
              닉네임 변경
            </SmallButton>
          </SmallButtonWrapper>
        </ProfileWrapper>
        <Separator />
        <SettingButton
          label="사운드 설정"
          onClick={() => router.push('/myPage/soundSetting')}
        />
        <SettingButton
          label="로그아웃"
          onClick={() => setIsLogoutModalOpen(true)}
        />
        <SettingButton
          label="회원탈퇴"
          onClick={() => router.push('/myPage/accountCencellation')}
        />
      </MyPageWrapper>

      <AlertModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        title="로그아웃 하시겠습니까?"
      />
    </>
  );
};

export default MyPage;

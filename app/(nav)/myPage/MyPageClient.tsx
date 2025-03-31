'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import TopBar from '@/components/Common/TopBar/TopBar';
import {
  MyPageWrapper,
  ProfileWrapper,
  SmallButtonWrapper,
  Separator,
} from '@/app/(nav)/myPage/myPage.styles';
import ProfileInfo from '@/components/Layout/MyPage/ProfileInfo';
import SettingButton from '@/components/Layout/MyPage/SettingButton';
import ProfileButton from '@/components/Layout/MyPage/ProfileButton';
import AlertModal from '@/components/Common/AlertModal/AlertModal';

interface UserData {
  email: string;
  nickname: string;
  activeCharacter: string;
  level?: number;
  exp?: number;
}

interface MyPageProps {
  userData: UserData | null;
}

export default function MyPageClient({ userData }: MyPageProps) {
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = async () => {
    setIsLogoutModalOpen(false);
    await signOut({ callbackUrl: '/' });
  };

  if (!userData) {
    return <div>유저 정보를 불러오지 못했습니다.</div>;
  }

  return (
    <>
      <TopBar NavType="default" label="마이페이지" />
      <MyPageWrapper>
        <ProfileWrapper>
          <ProfileInfo
            email={userData.email}
            nickname={userData.nickname}
            activeCharacter={userData.activeCharacter}
          />
          <SmallButtonWrapper>
            <ProfileButton
              onClick={() => router.push('/myPage/nicknameChange')}
            >
              닉네임 변경
            </ProfileButton>
          </SmallButtonWrapper>
        </ProfileWrapper>

        <Separator />

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
}

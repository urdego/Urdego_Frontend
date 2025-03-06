'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
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

const MyPage = () => {
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // NextAuth 세션 훅
  const { data: session } = useSession();
  // 세션에서 userId 추출
  const userId = session?.user?.userId;

  const [userData, setUserData] = useState({
    email: '',
    nickname: '',
    activeCharacter: '',
    level: 0,
    exp: 0,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        return;
      }

      try {
        const response = await fetch(`/api/userInfo`, {
          headers: {
            'User-Id': String(userId), // 문자열 변환
          },
        });

        if (!response.ok) {
          throw new Error('유저 데이터를 불러오는데 실패했습니다.');
        }

        const data = await response.json();
        setUserData({
          email: data.email,
          nickname: data.nickname,
          activeCharacter: data.activeCharacter,
          level: data.level,
          exp: data.exp,
        });
      } catch (error) {
        console.error('유저 데이터 fetch 에러:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleLogout = async () => {
    setIsLogoutModalOpen(false);
    await signOut({ callbackUrl: '/' });
  };

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
};

export default MyPage;

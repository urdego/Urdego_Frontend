'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import useUserStore from '@/stores/useUserStore';
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
  const [userInfo, setUserInfo] = useState({
    email: '',
    nickname: '',
    activeCharacter: '',
  });

  const userId = useUserStore((state) => state.userId);
  const email = useUserStore((state) => state.email);
  const characterType = useUserStore((state) => state.characterType);

  console.log('email 마이페이지에서 확인:', email);
  console.log('characterType 마이페이지에서 확인:', characterType);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`/api/userInfo`, {
          headers: {
            'User-Id': userId.toString(), // ✅ 변경: userId를 헤더에 포함
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserInfo(data); // 유저 데이터 설정
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  const handleLogout = async () => {
    setIsLogoutModalOpen(false);
    await signOut({ callbackUrl: '/' }); // 로그아웃 후 홈으로 리디렉션
  };

  return (
    <>
      <TopBar NavType="default" label="마이페이지" />
      <MyPageWrapper>
        <ProfileWrapper>
          <ProfileInfo
            email={userInfo.email || email}
            nickname={userInfo.nickname}
            activeCharacter={userInfo.activeCharacter || characterType}
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

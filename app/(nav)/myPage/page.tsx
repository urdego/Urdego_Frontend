'use client';

import { useState, useEffect } from 'react';
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
import ProfileButton from '@/components/Layout/MyPage/ProfileButton';
import AlertModal from '@/components/Common/AlertModal/AlertModal';

const MyPage = () => {
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: '',
    nickname: '',
    characterType: '',
  });

  console.log('userInfo:', userInfo);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('/api/userInfo'); // API 호출
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
  }, []);

  const handleLogout = () => {
    // 로그아웃 로직
    setIsLogoutModalOpen(false);
  };

  return (
    <>
      <TopBar NavType="default" label="마이페이지" />
      <MyPageWrapper>
        <ProfileWrapper>
          {/* 유저 정보 컴포넌트에 추가 될 API 데이터: 프로필 사진, 유저 LV  */}
          <ProfileInfo
            email={userInfo.email}
            nickname={userInfo.nickname}
            characterType={userInfo.characterType}
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

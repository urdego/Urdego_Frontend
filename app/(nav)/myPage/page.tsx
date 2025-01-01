'use client';
import TopBar from '@/components/Common/TopBar/TopBar';
import {
  MyPageWrapper,
  ProfileWrapper,
  SmallButtonWrapper,
  Separator,
} from '@/app/(nav)/myPage/myPage.styles';
import ProfileInfo from '@/components/Layout/MyPage/ProfileInfo';
import SettingButton from '@/components/Layout/MyPage/SettingButton';
import SmallButton from '@/components/Layout/MyPage/SmallButton';

const MyPage = () => {
  return (
    <>
      <TopBar NavType="default" label="마이페이지" />
      <MyPageWrapper>
        <ProfileWrapper>
          <ProfileInfo />
          <SmallButtonWrapper>
            <SmallButton onClick={() => {}}>캐릭터 수정</SmallButton>
            <SmallButton onClick={() => {}}>닉네임 변경</SmallButton>
          </SmallButtonWrapper>
        </ProfileWrapper>
        <Separator />
        <SettingButton label="비밀번호 변경" onClick={() => {}} />
        <SettingButton label="간편 로그인 설정" onClick={() => {}} />
        <SettingButton label="사운드 설정" onClick={() => {}} />
        <SettingButton label="로그아웃" onClick={() => {}} />
        <SettingButton label="회원탈퇴" onClick={() => {}} />
      </MyPageWrapper>
    </>
  );
};
export default MyPage;

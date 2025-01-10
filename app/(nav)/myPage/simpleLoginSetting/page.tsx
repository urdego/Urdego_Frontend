'use client';

import Image from 'next/image';
import TopBar from '@/components/Common/TopBar/TopBar';
import OptionToggle from '@/components/Common/OptionToggle/OptionToggle';
import kakaoIcon from '@/styles/Icon/sns-kakao-login.svg';
import appleIcon from '@/styles/Icon/sns-apple-login.svg';
import { SimpleLoginSettingWrapper } from '@/app/(nav)/myPage/simpleLoginSetting/simpleLoginSetting.styles';

const SimpleLoginSettingPage = () => {
  return (
    <>
      <TopBar NavType="default" label="간편 로그인 설정" />
      <SimpleLoginSettingWrapper>
        <OptionToggle
          label="카카오 로그인 연결"
          icon={
            <Image src={kakaoIcon} width={32} height={32} alt="Kakao Icon" />
          }
        />
        <OptionToggle
          label="애플 로그인 연결"
          icon={
            <Image src={appleIcon} width={32} height={32} alt="Apple Icon" />
          }
        />
      </SimpleLoginSettingWrapper>
    </>
  );
};

export default SimpleLoginSettingPage;

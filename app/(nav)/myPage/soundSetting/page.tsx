'use client';

import TopBar from '@/components/Common/TopBar/TopBar';
import OptionToggle from '@/components/Common/OptionToggle/OptionToggle';
import { SoundSettingWrapper } from '@/app/(nav)/myPage/soundSetting/soundSetting.styles';

const SimpleLoginSettingPage = () => {
  return (
    <>
      <TopBar NavType="default" label="사운드 설정" />
      <SoundSettingWrapper>
        <OptionToggle label="배경음" />
        <OptionToggle label="효과음" />
      </SoundSettingWrapper>
    </>
  );
};

export default SimpleLoginSettingPage;

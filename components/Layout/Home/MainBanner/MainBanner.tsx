import { Level } from './Level';
import { BannerWrapper, ButtonWrapper } from './MainBanner.styles';
import { UserCharacter } from './UserCharacter';
import LocationButton from './../LocationButton/LocationButton';
import { useState } from 'react';
import LocationListBottomSheet from '@/components/Common/BottomSheet/LocationListBottomSheet';

export const MainBanner = () => {
  const [isLocationListVisible, setLocationListVisible] = useState(false);
  return (
    <BannerWrapper>
      <Level level={1} userName={'어데고'} />
      <UserCharacter />
      <ButtonWrapper onClick={() => setLocationListVisible(true)}>
        <LocationButton title="올린 장소" count={999} />
        <LocationListBottomSheet isVisible={isLocationListVisible} />
        {/* <LocationButton title="저장한 장소" count={999} /> */}
      </ButtonWrapper>
    </BannerWrapper>
  );
};

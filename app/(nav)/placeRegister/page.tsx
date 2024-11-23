'use client';

import TopBar from '@/components/Common/TopBar/TopBar';
import PlaceRegister from '@/components/Layout/PlaceRegister/PlaceRegister';
import { PlaceRegisterWrapper } from './PlaceRegister.styles';

const PlaceRegisterPage = () => {
  return (
    <PlaceRegisterWrapper>
      <TopBar NavType="default" label="장소 등록하기" />
      <PlaceRegister title="장소1" currCount={0} totalCount={3} />
      <PlaceRegister title="장소2" currCount={0} totalCount={3} />
      <PlaceRegister title="장소3" currCount={0} totalCount={3} />
    </PlaceRegisterWrapper>
  );
};
export default PlaceRegisterPage;

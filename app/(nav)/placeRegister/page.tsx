'use client';

import TopBar from '@/components/Common/TopBar/TopBar';
import PlaceRegister from '@/components/Layout/PlaceRegister/PlaceRegister';
import { PlaceRegisterWrapper } from './PlaceRegister.styles';

const PlaceRegisterPage = () => {
  return (
    <PlaceRegisterWrapper>
      <TopBar NavType="default" label="장소 등록하기" />
      <PlaceRegister />
    </PlaceRegisterWrapper>
  );
};
export default PlaceRegisterPage;

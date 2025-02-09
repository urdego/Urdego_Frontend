'use client';

import { PageWrapper } from '@/app/commonPage.styles';
import TopBar from '@/components/Common/TopBar/TopBar';
import PlaceRegister from '@/components/Layout/PlaceRegister/PlaceRegister';
import usePlaceRegisterStore from '@/stores/placeRegisterStore';
import { useEffect } from 'react';

const LocationUpdatepage = () => {
  const { placeList } = usePlaceRegisterStore();
  useEffect(() => {
    console.log(placeList);
  }, [placeList]);
  return (
    <>
      <TopBar label="장소" NavType="locationUpdate" />
      <PageWrapper>
        <PlaceRegister index={0} title={''} place={placeList[0]} />
      </PageWrapper>
    </>
  );
};

export default LocationUpdatepage;

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
  }, []);
  return (
    <>
      <TopBar />
      <PageWrapper>
        {/* <PlaceRegister index={1} title={'aa'} place={placeList[1]} /> */}
      </PageWrapper>
    </>
  );
};

export default LocationUpdatepage;

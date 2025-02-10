'use client';

import { PageWrapper } from '@/app/commonPage.styles';
import TopBar from '@/components/Common/TopBar/TopBar';
import PlaceRegister from '@/components/Layout/PlaceRegister/PlaceRegister';
import usePlaceRegisterStore from '@/stores/placeRegisterStore';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const LocationUpdatepage = () => {
  const searchParams = useSearchParams();
  const locationData = searchParams.get('location') as string;

  const { placeList } = usePlaceRegisterStore();
  useEffect(() => {
    console.log(JSON.parse(locationData));
  }, [locationData]);
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

'use client';

import { PageWrapper } from '@/app/commonPage.styles';
import TopBar from '@/components/Common/TopBar/TopBar';
import PlaceRegister from '@/components/Layout/PlaceRegister/PlaceRegister';
import usePlaceRegisterStore, { Place } from '@/stores/placeRegisterStore';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const LocationUpdatepage = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('location') as string;
  const location = JSON.parse(searchQuery);

  const { placeList, setPlaceInput } = usePlaceRegisterStore();
  useEffect(() => {
    setPlaceInput(0, 'title', location.contentName);
  }, []);
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

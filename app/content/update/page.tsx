'use client';

import { PageWrapper } from '@/app/commonPage.styles';
import TopBar from '@/components/Common/TopBar/TopBar';
import PlaceRegister from '@/components/Layout/ContentRegister/ContentRegisterItem';
import useContentRegisterStore from '@/stores/contentRegisterStore';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const ContentUpdatePage = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('location') as string;
  const location = JSON.parse(searchQuery);

  const { placeList, setPlaceInput } = useContentRegisterStore();
  useEffect(() => {
    if (location) {
      setPlaceInput(0, 'title', location.contentName);
      setPlaceInput(0, 'title', location.contentName);
    }
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

export default ContentUpdatePage;

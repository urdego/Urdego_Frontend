'use client';

import { PageWrapper } from '@/app/commonPage.styles';
import TopBar from '@/components/Common/TopBar/TopBar';
import PlaceRegister from '@/components/Layout/PlaceRegister/PlaceRegister';

const LocationUpdatepage = () => {
  const place = {};
  return (
    <>
      <TopBar />
      <PageWrapper>
        <PlaceRegister index={1} title={'aa'} />
      </PageWrapper>
    </>
  );
};

export default LocationUpdatepage;

'use client';

import TopBar from '@/components/Common/TopBar/TopBar';
import PlaceRegister from '@/components/Layout/PlaceRegister/PlaceRegister';
import { PlaceRegisterWrapper } from './PlaceRegister.styles';
import { PageWrapper } from '@/app/commonPage.styles';

const PlaceRegisterPage = () => {
  return (
  <>
    <TopBar NavType="default" label="장소 등록하기" />
      <PageWrapper>
        <PlaceRegisterWrapper>
          <PlaceRegister title="장소1" currCount={0} totalCount={3} />
          <PlaceRegister title="장소2" currCount={0} totalCount={3} />
          <PlaceRegister title="장소3" currCount={0} totalCount={3} />
        </PlaceRegisterWrapper>
      </PageWrapper>
    </>
  );
};
export default PlaceRegisterPage;

'use client';

import TopBar from '@/components/Common/TopBar/TopBar';
import { PageWrapper } from '@/app/commonPage.styles';

const Rank = () => {
  return (
    <>
      <TopBar NavType="other" label="랭킹" />
      <PageWrapper></PageWrapper>
    </>
  );
};
export default Rank;

'use client';

import TopBar from '@/components/Common/TopBar/TopBar';
import ImageUpload from '@/components/Layout/PlaceRegister/ImageUpload';

const PlaceRegister = () => {
  return (
    <>
      <TopBar NavType="default" label="장소 등록하기" />
      <h1>Place Register</h1>
      <ImageUpload currCount={0} totalCount={3} />
    </>
  );
};
export default PlaceRegister;

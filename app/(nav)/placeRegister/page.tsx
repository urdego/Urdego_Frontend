'use client';

import TopBar from '@/components/Common/TopBar/TopBar';
import PlaceRegister from '@/components/Layout/PlaceRegister/PlaceRegister';
import { PlaceRegisterWrapper } from './PlaceRegister.styles';
import { PageWrapper } from '@/app/commonPage.styles';
import { useState } from 'react';

const PlaceRegisterPage = () => {
  const [postFiles, setPostFiles] = useState([]);
  const [previewFiles, setPreviewFiles] = useState([]);

  const uploadFiles = (e) => {
    const fileList = e.target.files;
    setPostFiles(Array.from(fileList)); //name, size, type(image/png)

    // const fileURLs = [];
    // const fileReader = new FileReader();
    // fileReader.onload = function () {
    //   setPreviewFiles(fileReader.result);
    // };
  };
  return (
    <>
      <TopBar NavType="default" label="장소 등록하기" />
      <PageWrapper>
        <input type="file" multiple onChange={uploadFiles} />
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

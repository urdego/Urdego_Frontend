'use client';

import TopBar from '@/components/Common/TopBar/TopBar';
import PlaceRegister from '@/components/Layout/PlaceRegister/PlaceRegister';
import {
  ButtonLayout,
  PlaceLayout,
  PlaceRegisterWrapper,
} from './PlaceRegister.styles';
import { PageWrapper } from '@/app/commonPage.styles';
import { useState } from 'react';
import Button from '@/components/Common/Button/Button';

const PlaceRegisterPage = () => {
  const [postFiles, setPostFiles] = useState<File[]>([]);

  const uploadFile = () => {
    console.log(postFiles);

    const formData = new FormData();

    // 이미지 등록
    postFiles.map((file) => {
      formData.append('files', file);
    });

    // 장소명, 힌트 등록
    const locationInfo = {
      title: '국립현대 박물관 서울',
      hint: '힌트입니다',
    };
    const locationInfoBlob = new Blob([JSON.stringify(locationInfo)], {
      type: 'application/json',
    });
    formData.append('locationInfo', locationInfoBlob);

    console.log(Array.from(formData));

    //axios post
    // axios.post('http://localhost:3079/file/uploads', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // })
    // .then((res) => {
    //     console.log(res.data);
    // }).catch((err) => {
    //     console.error(err);
    // });
  };

  return (
    <>
      <TopBar NavType="default" label="장소 등록하기" />
      <PageWrapper>
        <PlaceRegisterWrapper>
          <PlaceLayout>
            <PlaceRegister title="장소1" setPostFiles={setPostFiles} />
            <PlaceRegister title="장소2" setPostFiles={setPostFiles} />
            <PlaceRegister title="장소3" setPostFiles={setPostFiles} />
          </PlaceLayout>
          <ButtonLayout>
            <Button buttonType="gray" label="작성 완료" onClick={uploadFile} />
          </ButtonLayout>
        </PlaceRegisterWrapper>
      </PageWrapper>
    </>
  );
};
export default PlaceRegisterPage;

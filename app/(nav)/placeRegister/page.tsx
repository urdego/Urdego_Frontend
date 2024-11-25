'use client';

import TopBar from '@/components/Common/TopBar/TopBar';
import PlaceRegister from '@/components/Layout/PlaceRegister/PlaceRegister';
import Button from '@/components/Common/Button/Button';

import {
  ButtonLayout,
  PlaceLayout,
  PlaceRegisterWrapper,
} from './PlaceRegister.styles';
import { PageWrapper } from '@/app/commonPage.styles';

import useUploadFiles from '@/hooks/placeRegister/useUploadFiles';
import usePlaceRegisterModeStore from '@/stores/placeRegisterModeStore';

const PlaceRegisterPage = () => {
  const { setPostFiles, setPostInfo, uploadFile } = useUploadFiles();
  const { isSubmitReady } = usePlaceRegisterModeStore((state) => state);

  return (
    <>
      <TopBar NavType="default" label="장소 등록하기" />
      <PageWrapper>
        <PlaceRegisterWrapper>
          <PlaceLayout>
            <PlaceRegister
              title="장소1"
              setPostFiles={setPostFiles}
              setPostInfo={setPostInfo}
            />
            {/* <PlaceRegister
              title="장소2"
              setPostFiles={setPostFiles}
              setPostInfo={setPostInfo}
            />
            <PlaceRegister
              title="장소3"
              setPostFiles={setPostFiles}
              setPostInfo={setPostInfo}
            /> */}
          </PlaceLayout>
          <ButtonLayout>
            <Button
              buttonType={isSubmitReady ? 'purple' : 'gray'}
              label="작성 완료"
              onClick={isSubmitReady ? uploadFile : undefined}
            />
          </ButtonLayout>
        </PlaceRegisterWrapper>
      </PageWrapper>
    </>
  );
};
export default PlaceRegisterPage;

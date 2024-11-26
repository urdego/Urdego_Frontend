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
import usePlaceRegisterCountStore from '@/stores/placeRegisterCountStore';

const PlaceRegisterPage = () => {
  const { setPostFiles, setPostInfo, uploadFile } = useUploadFiles();
  const { isInputComplete } = usePlaceRegisterModeStore((state) => state);
  const { placeCount } = usePlaceRegisterCountStore((state) => state);

  return (
    <>
      <TopBar NavType="default" label="장소 등록하기" />
      <PageWrapper>
        <PlaceRegisterWrapper>
          <PlaceLayout>
            {[...Array(placeCount)].map((_elem, index) => (
              <PlaceRegister
                key={index}
                title={'장소' + (index + 1)}
                setPostFiles={setPostFiles}
                setPostInfo={setPostInfo}
              />
            ))}
          </PlaceLayout>
          <ButtonLayout>
            <Button
              buttonType={isInputComplete ? 'purple' : 'gray'}
              label="작성 완료"
              onClick={isInputComplete ? uploadFile : undefined}
            />
          </ButtonLayout>
        </PlaceRegisterWrapper>
      </PageWrapper>
    </>
  );
};
export default PlaceRegisterPage;

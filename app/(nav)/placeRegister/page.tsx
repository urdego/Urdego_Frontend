'use client';

import TopBar from '@/components/Common/TopBar/TopBar';
import PlaceRegister from '@/components/Layout/PlaceRegister/PlaceRegister';
import Button from '@/components/Common/Button/Button';
import PulsIconSrc from '@styles/Icon/Plus.svg';

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
  // client state 불러오는 custom hook
  const { setPostFiles, setPostInfo, uploadFile } = useUploadFiles();

  // store state 불러오는 로직
  const { isInputComplete } = usePlaceRegisterModeStore((state) => state);
  const { setIsInputComplete } = usePlaceRegisterModeStore(
    (state) => state.actions
  );
  const { placeCount } = usePlaceRegisterCountStore((state) => state);
  const { increasePlaceCount } = usePlaceRegisterCountStore(
    (state) => state.actions
  );

  const handleClick = () => {
    increasePlaceCount();
    setIsInputComplete(false);
  };

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
            <Button
              buttonType={
                isInputComplete && placeCount < 3 ? 'purple' : 'lightGray'
              }
              buttonHeight="short"
              label="장소추가"
              icon={PulsIconSrc}
              onClick={
                isInputComplete && placeCount < 3 ? handleClick : undefined
              }
            />
          </PlaceLayout>
          <ButtonLayout>
            <Button
              buttonType={isInputComplete ? 'purple' : 'lightGray'}
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

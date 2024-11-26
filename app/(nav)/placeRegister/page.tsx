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
import usePlaceRegisterStore from '@/stores/placeRegisterStore';

const PlaceRegisterPage = () => {
  // client state 불러오는 custom hook
  const { setPostFiles, uploadFile } = useUploadFiles();

  // store state 불러오는 로직
  const { isInputComplete, isSubmitReady } = usePlaceRegisterModeStore(
    (state) => state
  );
  const { placeList } = usePlaceRegisterStore((state) => state);

  const handleClick = () => {
    // 추가 placeRegister 등록
    // 기존 코드
    // increasePlaceCount();
    // addPlaceCountList();
    // setIsInputComplete(false);
  };

  return (
    <>
      <TopBar NavType="default" label="장소 등록하기" />
      <PageWrapper>
        <PlaceRegisterWrapper>
          <PlaceLayout>
            <button onClick={() => console.log(placeList)}>a</button>
            {placeList.map((_, index) => (
              <PlaceRegister
                key={index}
                index={index}
                title={'장소 ' + (index + 1)}
                setPostFiles={setPostFiles}
              />
            ))}
            <Button
              buttonType={
                isInputComplete && placeList.length < 3 ? 'purple' : 'lightGray'
              }
              buttonHeight="short"
              label="장소추가"
              icon={PulsIconSrc}
              onClick={
                isInputComplete && placeList.length < 3
                  ? handleClick
                  : undefined
              }
            />
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

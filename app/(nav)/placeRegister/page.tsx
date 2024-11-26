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
  const { placeCount, placeCountList } = usePlaceRegisterCountStore(
    (state) => state
  );
  const { increasePlaceCount, addPlaceCountList } = usePlaceRegisterCountStore(
    (state) => state.actions
  );

  const handleClick = () => {
    increasePlaceCount();
    addPlaceCountList();
    setIsInputComplete(false);
  };

  return (
    <>
      <TopBar NavType="default" label="장소 등록하기" />
      <PageWrapper>
        <PlaceRegisterWrapper>
          <PlaceLayout>
            {placeCountList.map((count, index) => (
              <PlaceRegister
                key={count}
                id={count}
                title={'장소 ' + count + '/' + (index + 1)}
                setPostFiles={setPostFiles}
                setPostInfo={setPostInfo}
              />
            ))}
            <Button
              buttonType={
                isInputComplete && placeCountList.length < 3
                  ? 'purple'
                  : 'lightGray'
              }
              buttonHeight="short"
              label="장소추가"
              icon={PulsIconSrc}
              onClick={
                isInputComplete && placeCountList.length < 3
                  ? handleClick
                  : undefined
              }
            />
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

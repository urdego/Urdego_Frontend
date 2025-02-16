'use client';

import TopBar from '@/components/Common/TopBar/TopBar';
import PlaceRegister from '@/components/Layout/ContentRegister/ContentRegisterItem';
import Button from '@/components/Common/Button/Button';
import PlusIconSrc from '@styles/Icon/Plus.svg';
import {
  BottomLayout,
  ButtonLayout,
  LottieLayout,
  ModalLayout,
  PlaceLayout,
  PlaceRegisterWrapper,
} from './ContentRegister.styles';
import { PageWrapper } from '@/app/commonPage.styles';

import useUploadFiles from '@/hooks/contentRegister/useUploadFiles';
import useControlButtons from '@/hooks/contentRegister/useControlButtons';

import usePlaceRegisterModeStore from '@/stores/contentRegisterModeStore';
import usePlaceRegisterStore from '@/stores/contentRegisterStore';
import PlayerTip from '@/components/Common/Lottie/PlayerTip';
import TipModal from '@/components/Layout/TipModal/TipModal';
import { useState } from 'react';

const ContentRegisterPage = () => {
  // client state 불러오는 custom hook
  const { handleUploadFiles } = useUploadFiles();
  const { handleAddPlaceList } = useControlButtons();

  // store state 불러오는 로직
  const { isInputComplete, isSubmitReady } = usePlaceRegisterModeStore();
  const { placeList } = usePlaceRegisterStore();
  const [isTipOpen, setIsTipOpen] = useState(false);

  return (
    <>
      <TopBar NavType="default" label="장소 등록하기" />
      <PageWrapper>
        <PlaceRegisterWrapper>
          <PlaceLayout>
            {placeList.map((item, index) => (
              <PlaceRegister
                key={index}
                index={index}
                title={'장소 ' + (index + 1)}
                place={item}
              />
            ))}
            <Button
              buttonType={isInputComplete ? 'purple' : 'lightGray'}
              buttonHeight="short"
              label="장소추가"
              icon={PlusIconSrc}
              onClick={isInputComplete ? handleAddPlaceList : undefined}
            />
          </PlaceLayout>
          <BottomLayout>
            {isTipOpen ? (
              <ModalLayout>
                <TipModal setIsTipOpen={setIsTipOpen} />
              </ModalLayout>
            ) : (
              <LottieLayout onClick={() => setIsTipOpen(true)}>
                <PlayerTip />
              </LottieLayout>
            )}
            <ButtonLayout>
              <Button
                buttonType={isSubmitReady ? 'purple' : 'gray'}
                label="작성 완료"
                onClick={isSubmitReady ? handleUploadFiles : undefined}
              />
            </ButtonLayout>
          </BottomLayout>
        </PlaceRegisterWrapper>
      </PageWrapper>
    </>
  );
};

export default ContentRegisterPage;

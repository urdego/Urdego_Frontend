'use client';

import { lazy, Suspense, useState } from 'react';
import TopBar from '@/components/Common/TopBar/TopBar';
import PlaceRegister from '@/components/Layout/ContentRegister/ContentRegisterItem';
import Button from '@/components/Common/Button/Button';
import PlusIconSrc from '@styles/Icon/Plus.svg';
import TipCharacter from '@styles/Icon/Character/basicMin.webp';
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
import TipModal from '@/components/Layout/TipModal/TipModal';
import Image from 'next/image';
const PlayerTip = lazy(() => import('@/components/Common/Lottie/PlayerTip'));

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
                <Suspense
                  fallback={
                    <Image
                      src={TipCharacter}
                      width={74} // LottieLayout의 max-width와 동일하게 설정
                      height={74} // 적절한 높이 (이미지 비율에 맞게 조정)
                      style={{ width: '100%', height: 'auto' }}
                      alt="tip-character"
                    />
                  }
                >
                  <PlayerTip />
                </Suspense>
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

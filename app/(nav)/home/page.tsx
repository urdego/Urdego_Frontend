'use client';
import { TopWrapper, BottomWrapper } from './Home.styles';
import HomeBox from '@/components/Layout/Home/HomeBox/HomeBox';
import { HomePageWrapper } from '@/app/commonPage.styles';
import Button from '@/components/Common/Button/Button';
import EnterArrowIcon from '@/styles/Icon/Home/EnterArrowIcon.svg';
import UserCharacter from '@/components/Layout/Home/Character/UserCharacter';
import { useState } from 'react';

const Home = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  // 디폴트 값 'BASIC'
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
    'WOOL'
  );

  return (
    <>
      <HomePageWrapper>
        <TopWrapper>
          <UserCharacter
            selectedCharacter={selectedCharacter}
            isOpen={isBottomSheetOpen}
          />
        </TopWrapper>
        <BottomWrapper>
          <HomeBox
            setSelectedCharacter={setSelectedCharacter}
            setIsBottomSheetOpen={setIsBottomSheetOpen}
            isBottomSheetOpen={isBottomSheetOpen}
          />
          <Button
            label="방 입장하기"
            icon={EnterArrowIcon}
            buttonHeight="long"
            $iconPosition="right"
          />
        </BottomWrapper>
      </HomePageWrapper>
    </>
  );
};

export default Home;

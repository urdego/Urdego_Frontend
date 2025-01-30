import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import {
  HomeBoxWrapper,
  TopWrapper,
  PlaceRegister,
  CharacterSelect,
  BottomWrapper,
  GridContainer,
  GridItem,
} from './HomeBox.styles';
import Level from '@/components/Layout/Home/HomeBox/Level';
import LocationListBottomSheet from '@/components/Common/BottomSheet/LocationListBottomSheet';
import PlaceRegisterIcon from '@/styles/Icon/Home/PlaceRegister.svg';
import CharacterSelectIcon from '@/styles/Icon/Home/CharacterSelect.svg';
import CharacterBottomSheet from '@/components/Layout/Home/Character/CharacterBottomSheet';

const HomeBox = () => {
  const [isLocationListVisible, setLocationListVisible] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleCharacterSelect = () => {
    setIsBottomSheetOpen(true);
  };

  const toggleLocationList = () => {
    setLocationListVisible((prev) => !prev);
  };

  return (
    <HomeBoxWrapper>
      <TopWrapper>
        <Level />
      </TopWrapper>
      <BottomWrapper>
        <PlaceRegister onClick={toggleLocationList}>
          <Image
            src={PlaceRegisterIcon}
            alt="Place Register Icon"
            width={24}
            height={24}
          />
          등록한 장소
        </PlaceRegister>
        <CharacterSelect onClick={handleCharacterSelect}>
          <Image
            src={CharacterSelectIcon}
            alt="CharacterSelectIcon Icon"
            width={24}
            height={24}
          />
          캐릭터
        </CharacterSelect>
        <CharacterBottomSheet
          isOpen={isBottomSheetOpen}
          onClose={() => setIsBottomSheetOpen(false)}
          title="캐릭터(4/9)"
        >
          {' '}
          <GridContainer>
            {Array.from({ length: 9 }).map((_, index) => (
              <GridItem key={index}>{index + 1}</GridItem>
            ))}
          </GridContainer>
        </CharacterBottomSheet>
      </BottomWrapper>

      {/* 바텀시트가 visible일 때만 표시! */}
      {isLocationListVisible && (
        <LocationListBottomSheet
          setLocationListVisible={setLocationListVisible}
        />
      )}
    </HomeBoxWrapper>
  );
};

export default HomeBox;

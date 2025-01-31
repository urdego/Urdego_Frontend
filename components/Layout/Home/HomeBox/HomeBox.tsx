import React, { useState } from 'react';
import axiosInstance from '@/lib/axios';
import Image from 'next/image';
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
import Button from '@/components/Common/Button/Button';
import useCharacterData from '@/hooks/character/useCharacterData';
import useUserStore from '@/stores/useUserStore';

interface HomeBoxProps {
  setSelectedCharacter: React.Dispatch<React.SetStateAction<string | null>>;
  setIsBottomSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isBottomSheetOpen: boolean;
}

const HomeBox = ({
  setSelectedCharacter,
  setIsBottomSheetOpen,
  isBottomSheetOpen,
}: HomeBoxProps) => {
  const initialCharacter = 'WOOL';
  const ownCharacters = ['BASIC', 'DOT', 'ANGULAR', 'BUMPY', 'WOOL'];
  const [isLocationListVisible, setLocationListVisible] = useState(false);
  const [selectedCharacter, setSelectedCharacterLocal] = useState<
    string | null
  >(initialCharacter);
  const [isButtonVisible, setButtonVisible] = useState(false);

  const characters = useCharacterData({ ownCharacters });
  const userId = useUserStore((state) => state.userId);

  // 캐릭터 클릭 처리
  const handleCharacterClick = (key: string) => {
    if (ownCharacters.includes(key)) {
      setSelectedCharacterLocal(key);
      setSelectedCharacter(key);
      setButtonVisible(true); // 캐릭터 선택 후 버튼 보이기
    } else {
      console.error('보유하지 않은 캐릭터 선택 불가! ', key);
    }
  };

  // 캐릭터 선택 버튼 클릭 처리
  const handleCharacterSelect = () => {
    setIsBottomSheetOpen(true);
    setButtonVisible(false);
  };

  const toggleLocationList = () => {
    setLocationListVisible((prev) => !prev);
  };

  // 저장하기 버튼 클릭 처리
  const handleSaveClick = async () => {
    if (!selectedCharacter) {
      console.error('선택된 캐릭터가 없습니다.');
      return;
    }

    if (!userId) {
      console.error('유저 ID를 찾을 수 없습니다.');
      return;
    }

    try {
      const response = await axiosInstance.post(`/api/character`, {
        characterName: selectedCharacter,
      });

      if (response.status === 200) {
        console.log('캐릭터 저장 성공:', response.data);
      } else {
        console.error('캐릭터 저장 실패:', response.data);
      }
    } catch (error) {
      console.error('캐릭터 저장 중 에러:', error);
    }
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
          title={`캐릭터 (${ownCharacters.length}/9)`}
          selectedCharacter={selectedCharacter}
          footerContent={
            <Button
              label="저장하기"
              buttonHeight="default"
              buttonType={isButtonVisible ? 'purple' : 'lightGray'}
              onClick={handleSaveClick}
            />
          }
        >
          <GridContainer>
            {characters.map((character) => (
              <GridItem
                key={character.key}
                onClick={() => handleCharacterClick(character.key)}
                $isSelected={selectedCharacter === character.key}
              >
                <Image src={character.displayImage} alt={character.key} />
              </GridItem>
            ))}
          </GridContainer>
        </CharacterBottomSheet>
      </BottomWrapper>

      {isLocationListVisible && (
        <LocationListBottomSheet
          setLocationListVisible={setLocationListVisible}
        />
      )}
    </HomeBoxWrapper>
  );
};

export default HomeBox;

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
import { SuccessToast } from '../Character/SuccessToast';
import { useCharacterState } from '@/hooks/character/useCharacterState';

interface HomeBoxProps {
  selectedCharacter: string | null;
  setSelectedCharacter: React.Dispatch<React.SetStateAction<string | null>>;
  setIsBottomSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isBottomSheetOpen: boolean;
}

const HomeBox = ({
  selectedCharacter,
  setSelectedCharacter,
  setIsBottomSheetOpen,
  isBottomSheetOpen,
}: HomeBoxProps) => {
  const {
    character: activeCharacter,
    ownCharacters,
    level,
    exp,
  } = useCharacterState();
  const [isLocationListVisible, setLocationListVisible] = useState(false);
  const [localSelectedCharacter, setLocalSelectedCharacter] = useState<
    string | null
  >(activeCharacter || 'BASIC'); // activeCharacter로 초기화
  const [isButtonVisible, setButtonVisible] = useState(false);

  const characters = useCharacterData({ ownCharacters }); // ownCharacters 사용
  const userId = useUserStore((state) => state.userId);

  // 캐릭터 클릭 처리
  const handleCharacterClick = (key: string) => {
    if (ownCharacters.includes(key)) {
      setLocalSelectedCharacter(key);
      setSelectedCharacter(key);
      setButtonVisible(true);
    } else {
      console.error('보유하지 않은 캐릭터 선택 불가! ', key);
    }
  };

  // 캐릭터 선택 버튼 클릭 처리
  const handleCharacterSelect = () => {
    setIsBottomSheetOpen(true);
    setButtonVisible(false);
  };

  // 위치 목록 토글
  const toggleLocationList = () => {
    setLocationListVisible((prev) => !prev);
  };

  // 캐릭터 저장 처리
  const handleSaveClick = async () => {
    if (!localSelectedCharacter || !userId) {
      console.error('필수 정보가 없습니다.');
      return;
    }

    try {
      const response = await axiosInstance.post('/api/character', {
        characterName: localSelectedCharacter,
      });

      if (response.status === 200) {
        SuccessToast({ message: '변신 성공!' });
        console.log('캐릭터 저장 성공:', response.data);
        setIsBottomSheetOpen(false);
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
        <Level level={level} exp={exp} />
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
            alt="Character Select Icon"
            width={24}
            height={24}
          />
          캐릭터 도감
        </CharacterSelect>
        <CharacterBottomSheet
          isOpen={isBottomSheetOpen}
          onClose={() => setIsBottomSheetOpen(false)}
          title={`캐릭터 (${ownCharacters.length}/9)`}
          selectedCharacter={localSelectedCharacter}
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

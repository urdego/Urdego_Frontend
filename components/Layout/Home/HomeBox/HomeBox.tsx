import React, { useState } from 'react';
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

interface HomeBoxProps {
  setSelectedCharacter: React.Dispatch<React.SetStateAction<string | null>>;
}

const HomeBox = ({ setSelectedCharacter }: HomeBoxProps) => {
  const initialCharacter = 'WOOL';
  const ownCharacters = [
    'BASIC',
    'DOT',
    'ANGULAR',
    'BUMPY',
    // 'PLANET',
    // 'SHARP',
    // 'STAR',
    // 'SQUARE',
    'WOOL',
  ];
  const [isLocationListVisible, setLocationListVisible] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacterLocal] = useState<
    string | null
  >(initialCharacter);

  const characters = useCharacterData({ ownCharacters });

  const handleCharacterClick = (key: string) => {
    if (!ownCharacters.includes(key)) {
      console.error('보유하지 않은 캐릭터 선택 불가!', key);
      return;
    }
    // 동일한 캐릭터를 선택해도 렌더링 되도록 `null` 설정 후 다시 업데이트
    setSelectedCharacterLocal(null);
    setTimeout(() => setSelectedCharacterLocal(key), 0);

    setSelectedCharacter(null);
    setTimeout(() => setSelectedCharacter(key), 0);
  };

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
          title={`캐릭터 (${ownCharacters.length}/9)`}
          footerContent={<Button label="저장하기" buttonHeight="default" />}
        >
          <GridContainer>
            {characters.map((character) => (
              <GridItem
                key={character.key}
                onClick={() => handleCharacterClick(character.key)}
                isSelected={selectedCharacter === character.key}
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

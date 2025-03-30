import { useMemo } from 'react';
import LockIcon from '@/styles/Icon/Home/Lock.svg';

// 원본 이미지
import BasicCharacter from '@/styles/Icon/Character/basic.png';
import AngularCharacter from '@/styles/Icon/Character/angular.png';
import BumphyCharacter from '@/styles/Icon/Character/bumphy.png';
import DotCharacter from '@/styles/Icon/Character/dot.png';
import PlanetCharacter from '@/styles/Icon/Character/planet.png';
import SharpCharacter from '@/styles/Icon/Character/sharp.png';
import SquareCharacter from '@/styles/Icon/Character/square.png';
import StarCharacter from '@/styles/Icon/Character/star.png';
import WoolCharacter from '@/styles/Icon/Character/wool.png';

// 압축 이미지 (Min 버전)
import BasicCharacterMin from '@/styles/Icon/Character/basicMin.png';
import AngularCharacterMin from '@/styles/Icon/Character/angularMin.png';
import BumphyCharacterMin from '@/styles/Icon/Character/bumphyMin.png';
import DotCharacterMin from '@/styles/Icon/Character/dotMin.png';
import PlanetCharacterMin from '@/styles/Icon/Character/planetMin.png';
import SharpCharacterMin from '@/styles/Icon/Character/sharpMin.png';
import SquareCharacterMin from '@/styles/Icon/Character/squareMin.png';
import StarCharacterMin from '@/styles/Icon/Character/starMin.png';
import WoolCharacterMin from '@/styles/Icon/Character/woolMin.png';

// 타입 정의
type UseCharacterDataProps = {
  ownCharacters: string[]; // 보유 캐릭터 키 리스트 (예: ["BASIC", "WOOL"])
  useMinImage?: boolean; // true 시 압축 이미지 사용
};

// CHARACTER_LIST를 함수로 반환 (useMinImage에 따라 선택)
const getCharacterList = (useMinImage: boolean) => [
  { key: 'BASIC', image: useMinImage ? BasicCharacterMin : BasicCharacter },
  {
    key: 'ANGULAR',
    image: useMinImage ? AngularCharacterMin : AngularCharacter,
  },
  { key: 'BUMPHY', image: useMinImage ? BumphyCharacterMin : BumphyCharacter },
  { key: 'DOT', image: useMinImage ? DotCharacterMin : DotCharacter },
  { key: 'PLANET', image: useMinImage ? PlanetCharacterMin : PlanetCharacter },
  { key: 'SHARP', image: useMinImage ? SharpCharacterMin : SharpCharacter },
  { key: 'SQUARE', image: useMinImage ? SquareCharacterMin : SquareCharacter },
  { key: 'STAR', image: useMinImage ? StarCharacterMin : StarCharacter },
  { key: 'WOOL', image: useMinImage ? WoolCharacterMin : WoolCharacter },
];

const useCharacterData = ({
  ownCharacters,
  useMinImage = false,
}: UseCharacterDataProps) => {
  const characters = useMemo(() => {
    const list = getCharacterList(useMinImage);

    return list.map((character) => ({
      ...character,
      isOwned: ownCharacters.includes(character.key),
      displayImage: ownCharacters.includes(character.key)
        ? {
            src: character.image.src,
            width: 80,
            height: 80,
          }
        : {
            src: LockIcon.src,
            width: 32,
            height: 42,
          },
    }));
  }, [ownCharacters, useMinImage]);

  return characters;
};

export default useCharacterData;

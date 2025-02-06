import { useMemo } from 'react';
import LockIcon from '@/styles/Icon/Home/Lock.svg';
import BasicCharacter from '@/styles/Icon/Character/basic.png';
import AngularCharacter from '@/styles/Icon/Character/angular.png';
import BumphyCharacter from '@/styles/Icon/Character/bumphy.png';
import DotCharacter from '@/styles/Icon/Character/dot.png';
import PlanetCharacter from '@/styles/Icon/Character/planet.png';
import SharpCharacter from '@/styles/Icon/Character/sharp.png';
import SquareCharacter from '@/styles/Icon/Character/square.png';
import StarCharacter from '@/styles/Icon/Character/star.png';
import WoolCharacter from '@/styles/Icon/Character/wool.png';

const CHARACTER_LIST = [
  { key: 'BASIC', image: BasicCharacter },
  { key: 'ANGULAR', image: AngularCharacter },
  { key: 'BUMPHY', image: BumphyCharacter },
  { key: 'DOT', image: DotCharacter },
  { key: 'PLANET', image: PlanetCharacter },
  { key: 'SHARP', image: SharpCharacter },
  { key: 'SQUARE', image: SquareCharacter },
  { key: 'STAR', image: StarCharacter },
  { key: 'WOOL', image: WoolCharacter },
];

type UseCharacterDataProps = {
  ownCharacters: string[]; // 보유 캐릭터 리스트 (예: ["BASIC", "WOOL"])
};

const useCharacterData = ({ ownCharacters }: UseCharacterDataProps) => {
  const characters = useMemo(() => {
    return CHARACTER_LIST.map((character) => ({
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
  }, [ownCharacters]);

  return characters;
};

export default useCharacterData;

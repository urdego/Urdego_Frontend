import Image from 'next/image';

import RefreshIconSrc from '@styles/Icon/waitingRoomList/Refresh.svg';
import PersonIconSrc from '@styles/Icon/waitingRoomList/Person.svg';
import BasicIcon from '@styles/Icon/Character/basic.png';
import AngularIcon from '@styles/Icon/Character/angular.png';
import BumpyIcon from '@styles/Icon/Character/bumphy.png';
import DotIcon from '@styles/Icon/Character/dot.png';
import PlanetIcon from '@styles/Icon/Character/planet.png';
import SharpIcon from '@styles/Icon/Character/sharp.png';
import SquareIcon from '@styles/Icon/Character/square.png';
import StarIcon from '@styles/Icon/Character/star.png';
import WoolIcon from '@styles/Icon/Character/wool.png';
import { Character } from '@/lib/types/character';

type RefreshIconProps = { onClick: () => void };

const CHARACTER_LIST = {
  BASIC: BasicIcon,
  ANGULAR: AngularIcon,
  BUMPHY: BumpyIcon,
  DOT: DotIcon,
  PLANET: PlanetIcon,
  SHARP: SharpIcon,
  SQUARE: SquareIcon,
  STAR: StarIcon,
  WOOL: WoolIcon,
};

export const RefreshIcon = ({ onClick }: RefreshIconProps) => (
  <div onClick={onClick}>
    <Image src={RefreshIconSrc} alt="Refresh Icon" />
  </div>
);

export const CharacterIcon = ({ hostType }: { hostType: Character }) => {
  const imageSrc = CHARACTER_LIST[hostType] || BasicIcon;
  return <Image src={imageSrc} width={40} height={40} alt="Basic Icon" />;
};

export const PersonIcon = () => <Image src={PersonIconSrc} alt="Person Icon" />;

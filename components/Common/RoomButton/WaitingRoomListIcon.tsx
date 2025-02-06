import RefreshIconSrc from '@styles/Icon/waitingRoomList/Refresh.svg';
import PersonIconSrc from '@styles/Icon/waitingRoomList/Person.svg';
import BasicIconSrc from '@styles/Icon/Character/basic.png';
import Image from 'next/image';

type RefreshIconProps = { onClick: () => void };
export const RefreshIcon = ({ onClick }: RefreshIconProps) => (
  <div onClick={onClick}>
    <Image src={RefreshIconSrc} alt="Refresh Icon" />
  </div>
);

export const CharacterIcon = () => (
  <Image src={BasicIconSrc} width={40} height={40} alt="Basic Icon" />
);

export const PersonIcon = () => <Image src={PersonIconSrc} alt="Person Icon" />;

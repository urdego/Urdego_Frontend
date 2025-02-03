import RefreshIconSrc from '@styles/Icon/waitingRoomList/Refresh.svg';
import PersonIconSrc from '@styles/Icon/waitingRoomList/Person.svg';
import Image from 'next/image';

type RefreshIconProps = { onClick: () => void };
export const RefreshIcon = ({ onClick }: RefreshIconProps) => (
  <div onClick={onClick}>
    <Image src={RefreshIconSrc} alt="Refresh Icon" />
  </div>
);

export const PersonIcon = () => <Image src={PersonIconSrc} alt="Person Icon" />;

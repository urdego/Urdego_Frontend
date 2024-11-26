import Image from 'next/image';
import BackIconSrc from '@/styles/Icon/Back.svg';
import AlarmIconSrc from '@/styles/Icon/Alarm.svg';
import FriendIconSrc from '@/styles/Icon/Friends.svg';
import ExitIconSrc from '@/styles/Icon/Exit.svg';

export const BackIcon = () => <Image src={BackIconSrc} alt="Back Icon" />;
export const AlarmIcon = () => <Image src={AlarmIconSrc} alt="Alarm Icon" />;
export const FriendIcon = () => <Image src={FriendIconSrc} alt="Friend Icon" />;
export const ExitIcon = () => <Image src={ExitIconSrc} alt="Exit Icon" />;

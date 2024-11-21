import Image from 'next/image';
import LockIconSrc from '@/styles/Icon/Lock.svg';
import EntranceIconSrc from '@/styles/Icon/Entrance.svg';

export const LockIcon = () => <Image src={LockIconSrc} alt="Lock Icon" />;
export const EntranceIcon = () => (
  <Image src={EntranceIconSrc} alt="Entrance Icon" />
);

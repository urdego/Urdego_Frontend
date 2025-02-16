import Image from 'next/image';
import DeleteIconSrc from '@styles/Icon/Trash.svg';

export const DeleteIcon = () => {
  return <Image src={DeleteIconSrc} width={16} height={18} alt="Delete Icon" />;
};

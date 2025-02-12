import Image from 'next/image';
import DeleteIconSrc from '@styles/Icon/Trash.svg';

export const DeleteIcon = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '60px',
        height: '60px',
        background: '#DE3730',
        padding: '3px 4px',
      }}
    >
      <Image src={DeleteIconSrc} width={16} height={18} alt="Delete Icon" />
    </div>
  );
};

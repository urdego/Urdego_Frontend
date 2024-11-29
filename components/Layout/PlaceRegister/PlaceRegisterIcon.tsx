import Image from 'next/image';

import TrashIconSrc from '@styles/Icon/Trash.svg';
import ClearIconSrc from '@styles/Icon/Clear.svg';
import BlackClearIconSrc from '@styles/Icon/BlackClear.svg';
import GalleryIconSrc from '@styles/Icon/Gallery.svg';

export const TrashIcon = () => <Image src={TrashIconSrc} alt="Trash Icon" />;

export const ClearIcon = () => <Image src={ClearIconSrc} alt="Clear Icon" />;

export const BlackClearIcon = () => (
  <Image src={BlackClearIconSrc} alt="Black Clear Icon" />
);

export const GalleryIcon = () => (
  <Image src={GalleryIconSrc} alt="Gallery Icon" />
);

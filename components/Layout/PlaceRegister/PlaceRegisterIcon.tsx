import Image from 'next/image';

import DeleteIconSrc from '@styles/Icon/Delete.svg';
import ClearIconSrc from '@styles/Icon/Clear.svg';
import BlackClearIconSrc from '@styles/Icon/BlackClear.svg';
import GalleryIconSrc from '@styles/Icon/Gallery.svg';
import SearchIconSrc from '@styles/Icon/Search.svg';

interface DeleteIconProps {
  width?: number;
}

export const DeleteIcon = ({ width = 14 }: DeleteIconProps) => (
  <Image src={DeleteIconSrc} width={width} height={width} alt="Trash Icon" />
);

export const ClearIcon = () => <Image src={ClearIconSrc} alt="Clear Icon" />;

export const BlackClearIcon = () => (
  <Image src={BlackClearIconSrc} alt="Black Clear Icon" />
);

export const GalleryIcon = () => (
  <Image src={GalleryIconSrc} alt="Gallery Icon" />
);

export const SearchIcon = () => <Image src={SearchIconSrc} alt="Search Icon" />;

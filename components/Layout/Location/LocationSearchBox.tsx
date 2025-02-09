import Image from 'next/image';
import SearchIconSrc from '@styles/Icon/search-btn.svg';
import ClearIconSrc from '@styles/Icon/Clear.svg';
import { Input, LocationSearchButtonWrapper } from './LocationSearchBox.styles';

const LocationSearchButton = () => {
  return (
    <LocationSearchButtonWrapper>
      <Image src={SearchIconSrc} alt="Search Icon" />
      <Input type="text" placeholder="검색" />
      <Image src={ClearIconSrc} alt="Remove Button" />
    </LocationSearchButtonWrapper>
  );
};

export default LocationSearchButton;

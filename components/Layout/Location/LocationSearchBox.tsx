import Image from 'next/image';
import SearchIconSrc from '@styles/Icon/search-btn.svg';
import ClearIconSrc from '@styles/Icon/Clear.svg';
import { Input, LocationSearchButtonWrapper } from './LocationSearchBox.styles';
import { useState } from 'react';

interface LocationSearchBoxProps {
  isInputMode?: boolean;
}
const LocationSearchBox = ({ isInputMode = false }: LocationSearchBoxProps) => {
  const [locationName, setLocationName] = useState('');
  return (
    <LocationSearchButtonWrapper>
      <Image src={SearchIconSrc} alt="Search Icon" />
      <Input
        type="text"
        placeholder="검색"
        value={locationName}
        onChange={(e) => setLocationName(e.target.value)}
        disabled={!isInputMode}
      />
      {locationName && <Image src={ClearIconSrc} alt="Remove Button" />}
    </LocationSearchButtonWrapper>
  );
};

export default LocationSearchBox;

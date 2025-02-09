import Image from 'next/image';
import SearchIconSrc from '@styles/Icon/search-btn.svg';
import ClearIconSrc from '@styles/Icon/Clear.svg';
import { Input, LocationSearchButtonWrapper } from './LocationSearchBox.styles';
import { useState } from 'react';

interface LocationSearchBoxProps {
  isInputMode?: boolean;
  onClick?: () => void;
}
const LocationSearchBox = ({
  isInputMode = false,
  onClick,
}: LocationSearchBoxProps) => {
  const [locationName, setLocationName] = useState('');
  return (
    <LocationSearchButtonWrapper onClick={onClick}>
      <Image src={SearchIconSrc} alt="Search Icon" />
      <Input
        type="text"
        placeholder="검색"
        value={locationName}
        onChange={(e) => setLocationName(e.target.value)}
        disabled={!isInputMode}
      />
      {locationName && (
        <Image
          src={ClearIconSrc}
          alt="Remove Button"
          onClick={() => setLocationName('')}
        />
      )}
    </LocationSearchButtonWrapper>
  );
};

export default LocationSearchBox;

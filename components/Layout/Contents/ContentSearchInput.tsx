import Image from 'next/image';
import SearchIconSrc from '@styles/Icon/search-btn.svg';
import ClearIconSrc from '@styles/Icon/Clear.svg';
import {
  Input,
  LocationSearchButtonWrapper,
} from './ContentSearchInput.styles';

interface LocationSearchBoxProps {
  isInputMode?: boolean;
  searchKeyword?: string;
  setSearchKeyword?: React.Dispatch<React.SetStateAction<string>>;
  onClick?: () => void;
}
const LocationSearchBox = ({
  isInputMode = false,
  searchKeyword,
  setSearchKeyword = () => {},
  onClick,
}: LocationSearchBoxProps) => {
  return (
    <LocationSearchButtonWrapper onClick={onClick}>
      <Image src={SearchIconSrc} alt="Search Icon" />
      <Input
        type="text"
        placeholder="검색"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        disabled={!isInputMode}
      />
      {searchKeyword && (
        <Image
          src={ClearIconSrc}
          alt="Remove Button"
          onClick={() => setSearchKeyword('')}
        />
      )}
    </LocationSearchButtonWrapper>
  );
};

export default LocationSearchBox;

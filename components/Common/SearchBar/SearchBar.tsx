import { useState } from 'react';
import Image from 'next/image';
import {
  SearchBarWrapper,
  SearchInput,
  IconWrapper,
} from '@/components/Common/SearchBar/SearchBar.styles';
import SearchIcon from '@styles/Icon/search-btn.svg';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

const SearchBar = ({ onSearch, initialQuery = '' }: SearchBarProps) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <SearchBarWrapper>
      <IconWrapper>
        <Image src={SearchIcon} alt="search-icon" width={24} height={24} />
      </IconWrapper>
      <SearchInput
        type="text"
        placeholder="검색"
        value={query}
        onChange={handleSearch}
      />
    </SearchBarWrapper>
  );
};

export default SearchBar;

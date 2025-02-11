import { useEffect, useState } from 'react';
import { Location } from './useGetInfiniteLocationList';

interface SearchLocationListResponse {
  userId: number;
  contents: [
    {
      contentId: number;
      url: string;
      contentName: string;
      address: string;
      latitude: number;
      longitude: number;
      hint: string;
    },
  ];
}

const useSearchLocationList = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [locationList, setLocationList] = useState<Location[]>([]);

  const fetchSearchResult = async () => {
    const params = new URLSearchParams();
    params.append('search', searchKeyword);

    const response = await fetch(`/api/content/search?${params}`);
    if (!response.ok) {
      return;
    }

    const data: SearchLocationListResponse = await response.json();
    if (data) {
      setLocationList(data.contents);
    }
  };

  useEffect(() => {
    if (searchKeyword) {
      fetchSearchResult();
    }
  }, [searchKeyword]);

  return {
    locationList,
    searchKeyword,
    setSearchKeyword,
  };
};

export default useSearchLocationList;

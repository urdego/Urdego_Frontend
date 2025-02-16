import { useEffect, useState } from 'react';
import { Location } from './useGetInfiniteContents';
import { API_URL_CONFIG } from '@/config/apiEndPointConfig';
import useUserStore from '@/stores/useUserStore';

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

const useSearchContents = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [locationList, setLocationList] = useState<Location[]>([]);
  const { userId } = useUserStore();

  const fetchSearchResult = async () => {
    const params = new URLSearchParams();
    params.append('search', searchKeyword);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${API_URL_CONFIG.CONTENT.DEFAULT}/${userId}/contents/search?${params}`
    );
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
    } else {
      setLocationList([]);
    }
  }, [searchKeyword]);

  return {
    locationList,
    setLocationList,
    searchKeyword,
    setSearchKeyword,
  };
};

export default useSearchContents;

import { useState } from 'react';

export interface Location {
  contentId: number;
  contentName: string;
  address: string;
  url: string;
}

interface GetLocationListResponse {
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
  cursorIdx: number;
  totalContent: number;
}

type SortType = 'oldest' | 'recent';
const useGetInfiniteContents = (sortType: SortType = 'oldest') => {
  // 서버로부터 받아오는 정보
  const [locationList, setLocationList] = useState<Location[]>([]);
  const [cursorIdx, setCursorIdx] = useState<number | null>(null);

  // 무한 스크롤 관련 정보
  const [isLoadMore, setIsLoadMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLocationList = async () => {
    setIsLoading(true);
    const params = new URLSearchParams();
    params.append('limit', (16).toString());
    if (cursorIdx) {
      params.append('cursorIdx', cursorIdx.toString());
    }
    if (sortType === 'recent') {
      params.append('sortBy', sortType);
    }

    try {
      const response = await fetch(`/api/content?${params}`);
      if (!response.ok) {
        throw new Error('데이터를 가져오는 것에 실패했습니다!');
      }

      const data: GetLocationListResponse = await response.json();
      if (data) {
        setLocationList((prev) => [...prev, ...data.contents]);
        setCursorIdx(data.cursorIdx);
        if (!data.cursorIdx) {
          setIsLoadMore(false);
        }
      }
    } catch (error) {
      console.error(`올린 장소 불러오기에서 실패한 에러: ${error}`);
      setIsLoadMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  const initLocationList = () => {
    setLocationList([]);
    setCursorIdx(null);
  };

  return {
    locationList,
    setLocationList,
    isLoading,
    isLoadMore,
    fetchLocationList,
    initLocationList,
  };
};

export default useGetInfiniteContents;

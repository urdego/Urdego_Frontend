import useUserStore from '@/stores/useUserStore';
import { useState } from 'react';

interface Location {
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

const useGetInfiniteLocationList = () => {
  // 서버로부터 받아오는 정보
  const [locationList, setLocationList] = useState<Location[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [cursorIdx, setCursorIdx] = useState<number | null>(null);

  // 무한 스크롤 관련 정보
  const [isLoadMore, setIsLoadMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // const { userId } = useUserStore(); //TODO: 사용하도록 변경

  const fetchLocationList = async () => {
    const userId = 2; //! test를 위한 용도

    setIsLoading(true);

    const params = new URLSearchParams();
    params.append('limit', (16).toString());
    if (cursorIdx) {
      params.append('cursorIdx', cursorIdx.toString());
    }

    try {
      const response = await fetch(`/api/content/${userId}?${params}`);
      if (!response.ok) {
        throw new Error('데이터를 가져오는 것에 실패했습니다!');
      }

      const data: GetLocationListResponse = await response.json();
      console.log(data);
      if (data) {
        setLocationList((prev) => [...prev, ...data.contents]);
        if (data.totalContent) {
          setTotalCount(data.totalContent);
        }
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

  return {
    locationList,
    totalCount,
    isLoading,
    isLoadMore,
    fetchLocationList,
  };
};

export default useGetInfiniteLocationList;

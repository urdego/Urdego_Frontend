// import useUserStore from '@/stores/useUserStore';
import { useEffect, useState } from 'react';

interface Location {
  contentName: string;
  address: string;
  url: string;
}

interface GetLocationListResponse {
  userId: number;
  userContents: [
    {
      userId: number;
      contentId: number;
      url: string;
      contentName: string;
      address: string;
      latitude: number;
      longitude: number;
      hint: string;
      contentInfo: {
        contentType: string;
        metaLatitude: number;
        metaLongitude: number;
        size: number;
      };
    },
  ];
  cursorIdx: number;
  totalContent: number;
}

const useGetInfiniteLocationList = () => {
  const [locationList, setLocationList] = useState<Location[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [cursorIdx, setCursorIdx] = useState<number | null>(null);
  const [isLoadMore, setIsLoadMore] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initialFetchLocationList = async () => {
      await fetchLocationList();
      setIsInitialLoad(false);
    };

    console.log('initial');
    initialFetchLocationList();
  }, []);

  const fetchLocationList = async () => {
    //   const { nickname } = useUserStore(); //TODO: 사용하도록 변경
    const nickname = 'min'; //! test를 위한 용도

    setIsLoading(true);

    const params = new URLSearchParams();
    params.append('limit', (10).toString());
    if (cursorIdx) {
      params.append('cursorIdx', cursorIdx.toString());
    }

    try {
      const response = await fetch(`/api/content/${nickname}?${params}`);
      if (!response.ok) {
        throw new Error('데이터를 가져오는 것에 실패했습니다!');
      }
      const data: GetLocationListResponse = await response.json();
      if (data) {
        setLocationList((prev) => [...prev, ...data.userContents]);
        if (data.totalContent) {
          setTotalCount(data.totalContent);
        }
        setCursorIdx(data.cursorIdx);
        if (!data.cursorIdx) {
          setIsLoadMore(false);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async () => {
    if (!isLoadMore) return;

    console.log('second');
    await fetchLocationList();
  };

  return {
    locationList,
    totalCount,
    isInitialLoad,
    isLoading,
    loadMore,
  };
};

export default useGetInfiniteLocationList;

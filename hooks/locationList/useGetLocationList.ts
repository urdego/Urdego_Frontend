// import useUserStore from '@/stores/useUserStore';
import { useState } from 'react';

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

const useGetLocationlist = () => {
  const [locationList, setLocationList] = useState<Location[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [cursorIdx, setCursorIdx] = useState<number | null>(null);
  const [isLoadMore, setIsLoadMore] = useState(true);

  const loadMore = async () => {
    if (!isLoadMore) return;

    const params = new URLSearchParams();
    params.append('limit', (10).toString());
    console.log('cursor: ' + cursorIdx);
    if (cursorIdx) {
      params.append('cursorIdx', cursorIdx.toString());
    }

    //   const { nickname } = useUserStore(); //TODO: 사용하도록 변경
    const nickname = 'min'; //! test를 위한 용도

    const response = await fetch(`/api/content/${nickname}?${params}`);
    const data: GetLocationListResponse = await response.json();
    if (!data) {
      console.log('데이터를 가져오는 것에 실패했습니다!');
      return;
    }
    // console.log(data);
    setLocationList((prev) => [...prev, ...data.userContents]);
    if (data.totalContent) {
      setTotalCount(data.totalContent);
    }
    console.log(data.cursorIdx);
    setCursorIdx(data.cursorIdx);
    if (!data.cursorIdx) {
      setIsLoadMore(false);
    }
  };

  return {
    locationList,
    totalCount,
    loadMore,
  };
};

export default useGetLocationlist;

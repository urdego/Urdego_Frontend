import useUserStore from '@/stores/useUserStore';
import { useEffect, useState } from 'react';

interface LocationType {
  contentName: string;
  address: string;
  url: string;
}

interface LocationListType {
  totalContents: number;

  userContents: LocationType[];
}

const useGetLocationlist = (isVisible: boolean) => {
  const [locationList, setLocationList] = useState<LocationListType>({
    totalContents: 0,
    userContents: [],
  });
  const { nickname } = useUserStore();

  useEffect(() => {
    const getLocationList = async () => {
      const params = new URLSearchParams();
      params.append('limit', (10).toString());
      // params.append('cursorIdx', (100).toString());

      const response = await fetch(`/api/content/${nickname}?${params}`);
      const data = await response.json();
      if (!data) {
        console.log('데이터를 가져오는 것에 실패했습니다!');
        return;
      }
      console.log(data);
      setLocationList({
        totalContents: data.totalContent,
        userContents: data.userContents,
      });
    };

    if (isVisible) {
      getLocationList();
    }
  }, [isVisible]);

  return {
    locationList,
  };
};

export default useGetLocationlist;

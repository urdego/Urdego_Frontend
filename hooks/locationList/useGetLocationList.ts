import useUserStore from '@/stores/useUserStore';
import { useEffect, useState } from 'react';

interface LocationType {
  contentName: string;
  address: string;
  url: string;
}

interface LocationListType {
  totalContentsCount: number;
  userContents: LocationType[];
}

interface useGetLocationListProps {
  isVisible: boolean;
  intersectionObserverTarget: React.RefObject<HTMLElement>;
}

const useGetLocationlist = ({
  isVisible,
  intersectionObserverTarget,
}: useGetLocationListProps) => {
  const [locationList, setLocationList] = useState<LocationListType>({
    totalContentsCount: 0,
    userContents: [],
  });
  //   const { nickname } = useUserStore(); //TODO: 사용하도록 변경
  const nickname = 'min'; //! test를 위한 용도

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
        totalContentsCount: data.totalContent,
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

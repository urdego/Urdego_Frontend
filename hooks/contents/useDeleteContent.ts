import React from 'react';
import { Location } from './useGetInfiniteContents';

interface UseDeleteLocationProps {
  contentId: number;
  setLocationList: React.Dispatch<React.SetStateAction<Location[]>>;
  setIsSwipe: React.Dispatch<React.SetStateAction<number>>;
}
const useDeleteContent = ({
  contentId,
  setLocationList,
  setIsSwipe,
}: UseDeleteLocationProps) => {
  const handleDeleteLocation = async () => {
    const params = new URLSearchParams();
    params.append('contentId', contentId.toString());

    const response = await fetch(`/api/content?${params}`, {
      method: 'DELETE',
    });

    if (!response.ok) return;
    setIsSwipe(0);
    setLocationList((prevList) =>
      prevList.filter((location) => location.contentId !== contentId)
    );
  };

  return {
    handleDeleteLocation,
  };
};

export default useDeleteContent;

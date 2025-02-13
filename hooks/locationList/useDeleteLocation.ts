import React from 'react';
import { Location } from './useGetInfiniteLocationList';

interface UseDeleteLocationProps {
  contentId: number;
  setLocationList: React.Dispatch<React.SetStateAction<Location[]>>;
}
const useDeleteLocation = ({
  contentId,
  setLocationList,
}: UseDeleteLocationProps) => {
  const handleDeleteLocation = async () => {
    const params = new URLSearchParams();
    params.append('contentId', contentId.toString());

    const response = await fetch(`/api/content?${params}`, {
      method: 'DELETE',
    });

    if (!response.ok) return;
    setLocationList((prevList) =>
      prevList.filter((location) => location.contentId !== contentId)
    );
  };

  return {
    handleDeleteLocation,
  };
};

export default useDeleteLocation;

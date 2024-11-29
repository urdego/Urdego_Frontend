import usePlaceRegisterModeStore from '@/stores/placeRegisterModeStore';
import usePlaceRegisterStore from '@/stores/placeRegisterStore';
import { useEffect } from 'react';

const useControlButton = () => {
  const { placeList, addPlaceList } = usePlaceRegisterStore();
  const { setIsInputComplete, setIsSubmitReady } = usePlaceRegisterModeStore();

  useEffect(() => {
    if (
      placeList.every((place) => place.title !== '' && place.file.length !== 0)
    ) {
      if (placeList.length < 3) {
        setIsInputComplete(true);
      } else {
        setIsInputComplete(false);
      }
      setIsSubmitReady(true);
    } else {
      setIsInputComplete(false);
      setIsSubmitReady(false);
    }
  }, [placeList, setIsInputComplete, setIsSubmitReady]);

  const handleAddPlaceList = () => {
    addPlaceList();
  };

  return {
    handleAddPlaceList,
  };
};

export default useControlButton;

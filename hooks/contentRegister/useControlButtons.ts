import usePlaceRegisterModeStore from '@/stores/contentRegisterModeStore';
import usePlaceRegisterStore from '@/stores/contentRegisterStore';
import { useEffect } from 'react';

const useControlButtons = () => {
  const { placeList, addPlaceList } = usePlaceRegisterStore();
  const { setIsInputComplete, setIsSubmitReady } = usePlaceRegisterModeStore();

  useEffect(() => {
    if (
      placeList.every(
        (place) =>
          place.title !== '' && place.file.length !== 0 && place.address
      )
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

export default useControlButtons;

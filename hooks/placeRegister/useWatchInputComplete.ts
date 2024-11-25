import usePlaceRegisterModeStore from '@/stores/placeRegisterModeStore';
import { useEffect } from 'react';

interface useWatchInputCompleteProps {
  locationTitle: string;
  locationHint: string;
}

const useWatchInputComplete = ({
  locationTitle,
  locationHint,
}: useWatchInputCompleteProps) => {
  const { isInputComplete } = usePlaceRegisterModeStore((state) => state);
  const { setIsInputComplete } = usePlaceRegisterModeStore(
    (state) => state.actions
  );

  useEffect(() => {
    if (locationTitle && locationHint) {
      setIsInputComplete(true);
    } else {
      setIsInputComplete(false);
    }
  }, [locationTitle, locationHint]);

  return {
    isInputComplete,
    setIsInputComplete,
  };
};

export default useWatchInputComplete;

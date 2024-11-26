import usePlaceRegisterModeStore from '@/stores/placeRegisterModeStore';
import { useEffect } from 'react';

interface useWatchInputCompleteProps {
  previewFile: string[];
  locationTitle: string;
  locationHint: string;
}

const useWatchInputComplete = ({
  previewFile,
  locationTitle,
  locationHint,
}: useWatchInputCompleteProps) => {
  const { isInputComplete } = usePlaceRegisterModeStore((state) => state);
  const { setIsInputComplete } = usePlaceRegisterModeStore(
    (state) => state.actions
  );

  useEffect(() => {
    if (previewFile.length !== 0 && locationTitle && locationHint) {
      setIsInputComplete(true);
    } else {
      setIsInputComplete(false);
    }
  }, [previewFile, locationTitle, locationHint, setIsInputComplete]);

  return {
    isInputComplete,
    setIsInputComplete,
  };
};

export default useWatchInputComplete;

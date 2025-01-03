import usePlaceRegisterStore from '@/stores/placeRegisterStore';

interface useControlInputProps {
  index: number;
}

const useControlInput = ({ index }: useControlInputProps) => {
  const {
    placeList,
    initPlaceList,
    setPlaceInput,
    removePartPlaceFile,
    removePlaceList,
  } = usePlaceRegisterStore();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceInput(index, 'title', e.target.value);
  };

  const handleHintChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceInput(index, 'hint', e.target.value);
  };

  const handlePartFileRemove = (previewIndex: number) => {
    if (placeList[index].file.length === 1) {
      initPlaceList(index);
      return;
    }
    removePartPlaceFile(index, previewIndex);
  };

  const handlePlaceRemove = () => {
    removePlaceList(index);
  };

  return {
    handleTitleChange,
    handleHintChange,
    handlePartFileRemove,
    handlePlaceRemove,
  };
};

export default useControlInput;

import Image from 'next/image';

import ImageUpload from './ImageUpload';
import PlaceInput from './PlaceInput';
import PlaceSearchButton from './PlaceSearchButton';
import { BlackClearIcon, TrashIcon } from './PlaceRegisterIcon';
import {
  PlaceContentResetButton,
  PlacePreview,
  PlaceRegistertext,
  PlaceRegisterWrapper,
  PreviewImage,
  PreviewImageRemoveButton,
} from './PlaceRegister.styles';

import useRegisterFiles from '@/hooks/placeRegister/useRegisterFiles';
import usePlaceRegisterStore from '@/stores/placeRegisterStore';

interface PlaceRegisterProps {
  index: number;
  title: string;
}

const PlaceRegister = ({ index, title }: PlaceRegisterProps) => {
  // client state 불러오는 custom hook
  const { handleFilesUpload, handlePartFileRemove } = useRegisterFiles({
    index,
  });

  // store state 불러오는 로직
  const { placeList, setPlaceInput, removePlaceList } = usePlaceRegisterStore();

  // event handler
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceInput(index, 'title', e.target.value);
  };
  const handleHintChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceInput(index, 'hint', e.target.value);
  };

  const resetPlace = () => {
    removePlaceList(index);
  };

  return (
    <PlaceRegisterWrapper>
      <PlaceRegistertext>
        <div>{title}</div>
        {index !== 0 && (
          <PlaceContentResetButton onClick={resetPlace}>
            <TrashIcon />
          </PlaceContentResetButton>
        )}
      </PlaceRegistertext>
      <PlacePreview>
        <ImageUpload
          handleFilesUpload={handleFilesUpload}
          currCount={placeList[index].previewFile.length}
          totalCount={3}
        />
        {placeList[index].previewFile.map((file, previewIndex) => (
          <PreviewImage key={previewIndex}>
            <PreviewImageRemoveButton
              onClick={() => handlePartFileRemove(index, previewIndex)}
            >
              <BlackClearIcon />
            </PreviewImageRemoveButton>
            <Image
              src={file}
              alt="Preview Image"
              fill
              style={{ objectFit: 'cover' }}
            />
          </PreviewImage>
        ))}
      </PlacePreview>
      <PlaceInput
        placeholder="장소명"
        value={placeList[index].title}
        onChange={handleTitleChange}
      />
      <PlaceSearchButton index={index} value={placeList[index].address} />
      <PlaceInput
        placeholder="(선택) 힌트를 작성해주세요"
        value={placeList[index].hint}
        onChange={handleHintChange}
      />
    </PlaceRegisterWrapper>
  );
};

export default PlaceRegister;

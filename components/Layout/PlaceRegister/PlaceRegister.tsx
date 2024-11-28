import Image from 'next/image';

import ImageUpload from './ImageUpload';
import PlaceInput from './PlaceInput';
import PlaceSearchButton from './PlaceSearchButton';
import { TrashIcon } from './PlaceRegisterIcon';
import {
  PlaceContentResetButton,
  PlacePreview,
  PlaceRegistertext,
  PlaceRegisterWrapper,
  PreviewImage,
} from './PlaceRegister.styles';

import useRegisterFiles from '@/hooks/placeRegister/useRegisterFiles';
import usePlaceRegisterStore from '@/stores/placeRegisterStore';
interface PlaceRegisterProps {
  index: number;
  title: string;
}

const PlaceRegister = ({ index, title }: PlaceRegisterProps) => {
  // client state 불러오는 custom hook
  const { previewFile, handleFilesChange } = useRegisterFiles({
    index,
  });

  // store
  const { placeList, setPlaceInput } = usePlaceRegisterStore();

  // event handler
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceInput(index, 'title', e.target.value);
  };

  const handleHintChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceInput(index, 'hint', e.target.value);
  };

  const resetPlace = () => {};

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
          handleFilesChange={handleFilesChange}
          currCount={previewFile.length}
          totalCount={3}
        />
        {previewFile.map((file, index) => (
          <PreviewImage key={index}>
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
      <PlaceSearchButton />
      <PlaceInput
        placeholder="(선택) 힌트를 작성해주세요"
        value={placeList[index].hint}
        onChange={handleHintChange}
      />
    </PlaceRegisterWrapper>
  );
};

export default PlaceRegister;

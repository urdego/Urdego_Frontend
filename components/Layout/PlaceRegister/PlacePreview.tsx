import Image from 'next/image';

import usePlaceRegisterStore from '@/stores/placeRegisterStore';
import ImageUpload from './ImageUpload';
import {
  PlacePreviewWrapper,
  PreviewImage,
  PreviewImageRemoveButton,
} from './PlacePreview.styles';
import { BlackClearIcon } from './PlaceRegisterIcon';
import useRegisterFiles from '@/hooks/placeRegister/useRegisterFiles';
import useControlInput from '@/hooks/placeRegister/useControlInput';

interface PlacePreviewProps {
  index: number;
}

const PlacePreview = ({ index }: PlacePreviewProps) => {
  // client state 불러오는 custom hook
  const { handleFilesUpload } = useRegisterFiles({
    index,
  });
  const { handlePartFileRemove } = useControlInput({ index });

  // store state 불러오는 로직
  const { placeList } = usePlaceRegisterStore();

  return (
    <PlacePreviewWrapper>
      <ImageUpload
        handleFilesUpload={handleFilesUpload}
        currCount={placeList[index].previewFile.length}
        totalCount={3}
      />
      {placeList[index].previewFile.map((file, previewIndex) => (
        <PreviewImage key={previewIndex}>
          <PreviewImageRemoveButton
            onClick={() => handlePartFileRemove(previewIndex)}
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
    </PlacePreviewWrapper>
  );
};

export default PlacePreview;

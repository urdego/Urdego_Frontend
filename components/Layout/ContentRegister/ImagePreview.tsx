import Image from 'next/image';

import { Place } from '@/stores/contentRegisterStore';
import ImageUpload from './ImageUpload';
import {
  PlacePreviewWrapper,
  PreviewImage,
  PreviewImageRemoveButton,
} from './ImagePreview.styles';
import { BlackClearIcon } from './ContentRegisterIcon';
import useRegisterFiles from '@/hooks/contentRegister/useRegisterFiles';
import useControlInput from '@/hooks/contentRegister/useControlInput';
import useLoadingStore from '@/stores/loadingStore';
import Skeleton from '@/components/Common/Skeleton/Skeleton';

interface PlacePreviewProps {
  index: number;
  place: Place;
}

const ImagePreview = ({ index, place }: PlacePreviewProps) => {
  // client state 불러오는 custom hook
  const { handleFilesUpload } = useRegisterFiles({
    index,
  });
  const { handlePartFileRemove } = useControlInput({ index });

  // store state 불러오는 로직
  const { isPreviewLoading } = useLoadingStore();

  return (
    <PlacePreviewWrapper>
      <ImageUpload
        handleFilesUpload={handleFilesUpload}
        currCount={place.previewFile.length}
        totalCount={3}
      />
      {isPreviewLoading[index]?.every(
        (partPreviewLoading) => partPreviewLoading === true
      )
        ? isPreviewLoading[index].map((_, index) => (
            <PreviewImage key={`item${index}`}>
              <Skeleton width={60} height={60} />
            </PreviewImage>
          ))
        : place.previewFile.map((file, previewIndex) => (
            <PreviewImage key={`item${previewIndex}`}>
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

export default ImagePreview;

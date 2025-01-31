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
import useLoadingStore from '@/stores/loadingStore';
import Skeleton from '@/components/Common/Skeleton/Skeleton';

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
  const { isPreviewLoading } = useLoadingStore();

  return (
    <PlacePreviewWrapper>
      <ImageUpload
        handleFilesUpload={handleFilesUpload}
        currCount={placeList[index].previewFile.length}
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
        : placeList[index].previewFile.map((file, previewIndex) => (
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

export default PlacePreview;

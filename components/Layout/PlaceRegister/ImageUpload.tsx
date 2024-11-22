import {
  ImageUploadContainer,
  ImageUploadCount,
  ImageUploadWrapper,
} from './ImageUpload.styles';
import { GalleryIcon } from './ImageUploadIcon';

interface ImageUploadProps {
  currCount: number;
  totalCount: number;
}

const ImageUpload = ({ currCount, totalCount }: ImageUploadProps) => {
  return (
    <ImageUploadWrapper>
      <ImageUploadContainer>
        <GalleryIcon />
        <ImageUploadCount>
          {currCount}/{totalCount}
        </ImageUploadCount>
      </ImageUploadContainer>
    </ImageUploadWrapper>
  );
};

export default ImageUpload;

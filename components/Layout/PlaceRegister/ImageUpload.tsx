import {
  ImageUploadContainer,
  ImageUploadCount,
  ImageUploadInput,
  ImageUploadWrapper,
} from './ImageUpload.styles';
import { GalleryIcon } from './PlaceRegisterIcon';

interface ImageUploadProps {
  currCount: number;
  totalCount: number;
  handleFilesUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUpload = ({
  currCount,
  totalCount,
  handleFilesUpload,
}: ImageUploadProps) => {
  return (
    <ImageUploadWrapper>
      <ImageUploadContainer>
        <ImageUploadInput
          type="file"
          accept="image/*"
          multiple
          onChange={handleFilesUpload}
        />
        <GalleryIcon />
        <ImageUploadCount>
          {currCount}/{totalCount}
        </ImageUploadCount>
      </ImageUploadContainer>
    </ImageUploadWrapper>
  );
};

export default ImageUpload;

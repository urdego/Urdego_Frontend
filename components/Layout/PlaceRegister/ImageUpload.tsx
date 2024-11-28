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
  handleFilesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUpload = ({
  currCount,
  totalCount,
  handleFilesChange,
}: ImageUploadProps) => {
  return (
    <ImageUploadWrapper>
      <ImageUploadContainer>
        <ImageUploadInput
          type="file"
          accept="image/*"
          multiple
          onChange={handleFilesChange}
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

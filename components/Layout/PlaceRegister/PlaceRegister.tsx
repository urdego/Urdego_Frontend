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
import useWatchInputComplete from '@/hooks/placeRegister/useWatchInputComplete';

interface PlaceRegisterProps {
  title: string;
  setPostFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setPostInfo: React.Dispatch<React.SetStateAction<object>>;
}

const PlaceRegister = ({
  title,
  setPostFiles,
  setPostInfo,
}: PlaceRegisterProps) => {
  // client state 불러오는 custom hook
  const {
    previewFile,
    setPreviewFile,
    locationTitle,
    setLocationTitle,
    locationHint,
    setLocationHint,
    handleFilesChange,
  } = useRegisterFiles({ setPostFiles, setPostInfo });

  useWatchInputComplete({
    previewFile,
    locationTitle,
    locationHint,
  });

  // client state 조작하는 로직
  const resetPlaceInfo = () => {
    setLocationTitle('');
    setLocationHint('');
    setPreviewFile([]);
    // TODO: 서버 전송 state 초기화 필요
  };

  return (
    <PlaceRegisterWrapper>
      <PlaceRegistertext>
        <div>{title}</div>
        <PlaceContentResetButton onClick={resetPlaceInfo}>
          <TrashIcon />
        </PlaceContentResetButton>
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
        state={locationTitle}
        setState={setLocationTitle}
      />
      <PlaceSearchButton />
      <PlaceInput
        placeholder="(선택) 힌트를 작성해주세요"
        state={locationHint}
        setState={setLocationHint}
      />
    </PlaceRegisterWrapper>
  );
};

export default PlaceRegister;

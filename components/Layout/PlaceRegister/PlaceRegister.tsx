import Button from '@/components/Common/Button/Button';
import ImageUpload from './ImageUpload';
import PlaceInput from './PlaceInput';
import {
  PlacePreview,
  PlaceRegistertext,
  PlaceRegisterWrapper,
  PreviewImage,
} from './PlaceRegister.styles';
import { TrashIcon } from './PlaceRegisterIcon';
import PlaceSearchButton from './PlaceSearchButton';
import PulsIconSrc from '@styles/Icon/Plus.svg';
import { useState } from 'react';
import Image from 'next/image';

interface PlaceRegisterProps {
  title: string;
  currCount: number;
  totalCount: number;
}

const PlaceRegister = ({
  title,
  currCount,
  totalCount,
}: PlaceRegisterProps) => {
  const [postFile, setPostFile] = useState([]);
  const [previewFile, setPreviewFile] = useState([]);

  const handleFilesChange = (e) => {
    const fileList = e.target.files;
    setPostFile(Array.from(fileList));

    const fileURLs = [];
    const fileReadPromises = [];

    for (let i = 0; i < fileList.length; i++) {
      const fileReader = new FileReader();
      const promise = new Promise((resolve) => {
        fileReader.onload = () => {
          fileURLs[i] = fileReader.result;
          resolve();
        };
        fileReader.readAsDataURL(fileList[i]);
      });
      fileReadPromises.push(promise);
    }

    Promise.all(fileReadPromises).then(() => {
      setPreviewFile([...fileURLs]);
    });
  };

  return (
    <PlaceRegisterWrapper>
      <PlaceRegistertext>
        <div>{title}</div>
        <TrashIcon />
      </PlaceRegistertext>
      <PlacePreview>
        <ImageUpload
          handleFilesChange={handleFilesChange}
          currCount={previewFile.length}
          totalCount={totalCount}
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
      <PlaceInput placeholder="장소명" />
      <PlaceSearchButton />
      <PlaceInput placeholder="(선택) 힌트를 작성해주세요" />
      <Button buttonType="gray" label="장소추가" icon={PulsIconSrc} />
    </PlaceRegisterWrapper>
  );
};

export default PlaceRegister;

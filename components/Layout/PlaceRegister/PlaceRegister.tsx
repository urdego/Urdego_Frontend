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
  setPostFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const PlaceRegister = ({ title, setPostFiles }: PlaceRegisterProps) => {
  const [previewFile, setPreviewFile] = useState<string[]>([]);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    setPostFiles(Array.from(fileList));

    const fileURLs: string[] = [];
    const fileReadPromises: Promise<string>[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const fileReader = new FileReader();
      const promise = new Promise<string>((resolve) => {
        fileReader.onload = () => {
          const result = fileReader.result;
          if (typeof result === 'string') {
            fileURLs.push(result);
            resolve(result);
          }
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
      <PlaceInput placeholder="장소명" />
      <PlaceSearchButton />
      <PlaceInput placeholder="(선택) 힌트를 작성해주세요" />
      <Button
        buttonType="gray"
        buttonHeight="short"
        label="장소추가"
        icon={PulsIconSrc}
      />
    </PlaceRegisterWrapper>
  );
};

export default PlaceRegister;

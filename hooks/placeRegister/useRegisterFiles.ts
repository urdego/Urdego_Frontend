import usePlaceRegisterStore from '@/stores/placeRegisterStore';
import { useState } from 'react';

interface useUploadFilesProps {
  index: number;
}

const useRegisterFiles = ({ index }: useUploadFilesProps) => {
  const [previewFile, setPreviewFile] = useState<string[]>([]);
  const { setPlaceInput } = usePlaceRegisterStore();

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    setPlaceInput(index, 'file', Array.from(fileList));

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

  return {
    previewFile,
    setPreviewFile,
    handleFilesChange,
  };
};

export default useRegisterFiles;

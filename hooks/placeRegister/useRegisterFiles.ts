import usePlaceRegisterStore from '@/stores/placeRegisterStore';
import { useState } from 'react';

interface useUploadFilesProps {
  index: number;
}

const useRegisterFiles = ({ index }: useUploadFilesProps) => {
  const [previewFile, setPreviewFile] = useState<string[]>([]);
  const { setPlaceInput } = usePlaceRegisterStore();
  const MAX_CONTENT_COUNT = 3;
  const MAX_MEMORY = 30 * 1024 * 1024; // 30MB

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    const selectedFileList = Array.from(fileList).slice(0, MAX_CONTENT_COUNT);
    const totalMemory = selectedFileList.reduce(
      (acc, file) => acc + file.size,
      0
    );

    if (totalMemory >= MAX_MEMORY) {
      setPlaceInput(index, 'file', []);
      setPreviewFile([]);
      alert('30MB를 초과하실 수 없습니다!');
      return;
    }

    setPlaceInput(index, 'file', selectedFileList);

    const fileURLs: string[] = [];
    const fileReadPromises: Promise<string>[] = [];

    for (let i = 0; i < selectedFileList.length; i++) {
      const fileReader = new FileReader();
      const promise = new Promise<string>((resolve) => {
        fileReader.onload = () => {
          const result = fileReader.result;
          if (typeof result === 'string') {
            fileURLs.push(result);
            resolve(result);
          }
        };
        fileReader.readAsDataURL(selectedFileList[i]);
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

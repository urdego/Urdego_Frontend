import { useState } from 'react';

interface useUploadFilesProps {
  setPostFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setPostInfo: React.Dispatch<React.SetStateAction<object>>;
}

const useRegisterFiles = ({ setPostFiles }: useUploadFilesProps) => {
  const [previewFile, setPreviewFile] = useState<string[]>([]);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    console.log(fileList);
    setPostFiles((prevFiles) => [...prevFiles, ...Array.from(fileList)]);

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

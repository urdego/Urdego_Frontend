import { useEffect, useState } from 'react';

interface useUploadFilesProps {
  setPostFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setPostInfo: React.Dispatch<React.SetStateAction<object>>;
}

const useRegisterFiles = ({
  setPostFiles,
  setPostInfo,
}: useUploadFilesProps) => {
  const [previewFile, setPreviewFile] = useState<string[]>([]);
  const [locationTitle, setLocationTitle] = useState('');
  const [locationHint, setLocationHint] = useState('');

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
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

  useEffect(() => {
    setPostInfo({
      title: locationTitle,
      hint: locationHint,
    });
  }, [locationTitle, locationHint, setPostInfo]);

  return {
    previewFile,
    setPreviewFile,
    locationTitle,
    setLocationTitle,
    locationHint,
    setLocationHint,
    handleFilesChange,
  };
};

export default useRegisterFiles;

import usePlaceRegisterStore from '@/stores/placeRegisterStore';

interface useUploadFilesProps {
  index: number;
}

const useRegisterFiles = ({ index }: useUploadFilesProps) => {
  const { setPlaceInput, removePartPlaceFile } = usePlaceRegisterStore();
  const MAX_CONTENT_COUNT = 3;
  const MAX_MEMORY = 30 * 1024 * 1024; // 30MB

  const handleFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList?.length === 0) return;

    const selectedFileList = Array.from(fileList).slice(0, MAX_CONTENT_COUNT);
    const totalMemory = selectedFileList.reduce(
      (acc, file) => acc + file.size,
      0
    );

    if (totalMemory >= MAX_MEMORY) {
      setPlaceInput(index, 'file', []);
      setPlaceInput(index, 'previewFile', []);
      alert('30MB를 초과하실 수 없습니다!');
      return;
    }

    setPlaceInput(index, 'file', selectedFileList);

    const previewPromises = selectedFileList.map((file) => {
      return new Promise<string>((resolve) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          const result = fileReader.result;
          resolve(typeof result === 'string' ? result : '');
        };
        fileReader.readAsDataURL(file);
      });
    });

    Promise.all(previewPromises).then((previewURLs) => {
      setPlaceInput(index, 'previewFile', previewURLs);
    });
  };

  const handlePartFileRemove = (index: number, previewIndex: number) => {
    removePartPlaceFile(index, previewIndex);
  };

  return {
    handleFilesUpload,
    handlePartFileRemove,
  };
};

export default useRegisterFiles;

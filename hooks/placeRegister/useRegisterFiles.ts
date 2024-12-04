import usePlaceRegisterStore from '@/stores/placeRegisterStore';
import exifr from 'exifr';
import useConvertLocationToAddress from './useConvertLocationToAddress';
import toast from 'react-hot-toast';

interface useUploadFilesProps {
  index: number;
}

const useRegisterFiles = ({ index }: useUploadFilesProps) => {
  const {
    placeList,
    initPlaceList,
    setPlaceInput,
    removePartPlaceFile,
    removePlaceList,
  } = usePlaceRegisterStore();
  const { handleReverseGeocoding } = useConvertLocationToAddress();

  const MAX_CONTENT_COUNT = 3;
  const MAX_MEMORY = 30 * 1024 * 1024; // 30MB

  const handleFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 파일 불러오는 로직
    const fileList = e.target.files;

    if (!fileList || fileList?.length === 0) {
      toast('선택된 사진이 없어요', {
        icon: '😮',
      });
      return;
    }

    if (fileList.length > MAX_CONTENT_COUNT) {
      toast('최대 3개의 사진만 업로드가 가능해요', {
        icon: '😱',
      });
    }
    const selectedFileList = Array.from(fileList).slice(0, MAX_CONTENT_COUNT);

    if (isOverMemory(selectedFileList)) {
      return;
    }

    exportMetadata(selectedFileList);

    storeFile(selectedFileList);
    storePreviewFile(selectedFileList);

    toast('사진 등록이 완료되었어요!', {
      icon: '👍',
    });
  };

  // 용량 제한 로직
  const isOverMemory = (selectedFileList: File[]) => {
    const totalMemory = selectedFileList.reduce(
      (acc, file) => acc + file.size,
      0
    );

    if (totalMemory >= MAX_MEMORY) {
      setPlaceInput(index, 'file', []);
      setPlaceInput(index, 'previewFile', []);
      alert('30MB를 초과하실 수 없습니다!');
      return true;
    }
    return false;
  };

  // meta data로부터 위경도 추출 및 도로명 주소 추출 로직
  const exportMetadata = async (fileList: File[]) => {
    const gps = await exifr.gps(fileList[0]);
    if (gps) {
      // 위경도 저장
      setPlaceInput(index, 'lat', gps.latitude);
      setPlaceInput(index, 'lng', gps.longitude);

      // 도로명 주소 저장
      // 역지오코딩으로 도로명 주소 반환
      handleReverseGeocoding({
        index,
        latLng: { lat: gps.latitude, lng: gps.longitude },
      });
    }
  };

  // 서버에 전송할 파일 저장 로직
  const storeFile = (selectedFileList: File[]) => {
    setPlaceInput(index, 'file', selectedFileList);
  };

  // 미리보기 파일 저장 로직
  const storePreviewFile = (selectedFileList: File[]) => {
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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceInput(index, 'title', e.target.value);
  };

  const handleHintChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceInput(index, 'hint', e.target.value);
  };

  const handlePartFileRemove = (previewIndex: number) => {
    if (placeList[index].file.length === 1) {
      initPlaceList(index);
      return;
    }
    removePartPlaceFile(index, previewIndex);
  };

  const handlePlaceRemove = () => {
    removePlaceList(index);
  };

  return {
    handleFilesUpload,
    handleTitleChange,
    handleHintChange,
    handlePartFileRemove,
    handlePlaceRemove,
  };
};

export default useRegisterFiles;

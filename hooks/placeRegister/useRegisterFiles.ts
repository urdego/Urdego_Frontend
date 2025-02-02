import usePlaceRegisterStore from '@/stores/placeRegisterStore';
import exifr from 'exifr';
import useConvertLocationToAddress from './useConvertLocationToAddress';
import toast from 'react-hot-toast';
import useLoadingStore from '@/stores/loadingStore';

interface useUploadFilesProps {
  index: number;
}

const useRegisterFiles = ({ index }: useUploadFilesProps) => {
  const { setPlaceInput } = usePlaceRegisterStore();
  const { setPreviewLoading } = useLoadingStore();
  const { handleReverseGeocoding } = useConvertLocationToAddress();

  const MAX_CONTENT_COUNT = 3;
  const MAX_MEMORY = 30 * 1024 * 1024; // 30MB

  const handleFilesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const fileList = validateUserUploadFile(e.target.files);
      if (!fileList) return;

      setPreviewLoading({
        locationIndex: index,
        newPreviewLoading: new Array(fileList.length).fill(true),
      });
      setPlaceInput(index, 'previewFile', new Array(fileList.length).fill([]));

      await exportMetadata(fileList);
      const compressedFileList = await compressFile(fileList);
      const previewURLs = await Promise.all(
        compressedFileList.map(readFileAsDataURL)
      );

      setPlaceInput(index, 'file', compressedFileList);
      setPlaceInput(index, 'previewFile', previewURLs);
      setPreviewLoading({
        locationIndex: index,
        newPreviewLoading: new Array(compressedFileList.length).fill(false),
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setPlaceInput(index, 'previewFile', []);
      setPreviewLoading({
        locationIndex: index,
        newPreviewLoading: [],
      });
    }
  };

  // 업로드된 파일 예외 확인 및 정제
  const validateUserUploadFile = (userUploadFileList: FileList | null) => {
    const fileList = userUploadFileList;

    if (!fileList || fileList?.length === 0) {
      return;
    }
    if (fileList.length > MAX_CONTENT_COUNT) {
      toast('최대 3개의 사진만 업로드가 가능해요', {
        icon: '😱',
      });
    }

    // 파일 등록: 최대 개수 제한 설정
    const selectedFileList = Array.from(fileList).slice(0, MAX_CONTENT_COUNT);

    if (isOverMemory(selectedFileList)) {
      toast.error('업로드 가능한 용량을 초과했어요');
      throw new Error('업로드 가능한 용량을 초과했어요');
    }
    if (!selectedFileList.every(isImageFile)) {
      toast.error('이미지만 업로드가 가능해요');
      throw new Error('이미지만 업로드가 가능해요');
    }

    return selectedFileList;
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
      return true;
    }
    return false;
  };

  // 확장자 제한 로직
  const isImageFile = (file: File) => {
    const filePath = file.name.split('.');
    const fileExtension = filePath[filePath.length - 1].toLocaleLowerCase();
    const validExtensions = ['jpg', 'jpeg', 'png', 'webp'];
    return validExtensions.includes(fileExtension);
  };

  // meta data로부터 위경도 추출 및 도로명 주소 추출 로직
  const exportMetadata = async (fileList: File[]) => {
    const gpsList = (
      await Promise.all(fileList.map((item) => exifr.gps(item)))
    ).filter((item) => item !== undefined);
    const gps = gpsList[0];

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
      return;
    }
    toast('위치 서비스를 활성화하시면, 자동으로 위치를 추가할 수 있어요!', {
      icon: '👍',
    });
  };

  // 이미지 압축 로직
  const compressFile = async (fileList: File[]) => {
    const compressedFileList: File[] = [];

    for (const file of fileList) {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/content/compress', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('파일 압축 실패');
      }

      const compressedBlob = await response.blob();
      const fileNameToWebp = file.name.split('.')[0] + '.webp';
      const compressedFile = new File([compressedBlob], fileNameToWebp, {
        type: 'image/webp',
      });
      compressedFileList.push(compressedFile);
    }

    return compressedFileList;
  };

  // 기본 파일을 미리보기 파일로 변환하는 로직
  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise<string>((resolve) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const result = fileReader.result;
        resolve(typeof result === 'string' ? result : '');
      };
      fileReader.readAsDataURL(file);
    });
  };

  // 파일 전체 정보 조회 로직
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const previewFile = (fileList: File[]) => {
    fileList.forEach((file) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const img = new Image();
        img.src = fileReader.result as string;
        img.onload = () => {
          console.log(`파일명: ${file.name}`);
          console.log(`가로 크기: ${img.width}px, 세로 크기: ${img.height}px`);
        };
      };
      fileReader.readAsDataURL(file);
    });
  };

  return {
    handleFilesUpload,
  };
};

export default useRegisterFiles;

import axiosInstance from '@/lib/axios';
import usePlaceRegisterStore, { Place } from '@/stores/placeRegisterStore';
import toast from 'react-hot-toast';

const useUploadFiles = () => {
  const { placeList } = usePlaceRegisterStore();

  const handleUploadFiles = async () => {
    try {
      for (const place of placeList) {
        await handleUploadPartFile(place);
      }
      toast('장소 등록이 완료되었어요! 👍');
    } catch (error) {
      console.error(`장소 등록하기에서 발생한 에러: ${error}`);
      toast('일부 장소가 등록되지 않았어요 😱');
    }
  };

  const handleUploadPartFile = async (place: Place) => {
    console.log(place);
    const formData = new FormData();

    // 이미지 등록
    place.file.map((item) => {
      formData.append('files', item);
    });

    // 장소명, 장소 위경도, 힌트 등록
    const params = new URLSearchParams();
    params.append('userId', '1');
    params.append('contentName', place.title);
    params.append('hint', place.hint);
    params.append('address', place.address || '');
    params.append('latitude', String(place.lat));
    params.append('longitude', String(place.lng));

    // 서버에게 정보 전송
    await axiosInstance
      .post('/api/content/', formData, {
        params: params,
      })
      .then((response) => {
        console.log(`장소 등록하기의 서버 통신 상태:${response.status}`);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  return {
    handleUploadFiles,
  };
};

export default useUploadFiles;

import axiosInstance from '@/lib/axios';
import usePlaceRegisterStore, { Place } from '@/stores/placeRegisterStore';

const useUploadFiles = () => {
  const { placeList } = usePlaceRegisterStore();

  const handleUploadFiles = async () => {
    for (const place of placeList) {
      await handleUploadPartFile(place);
    }
  };

  const handleUploadPartFile = async (place: Place) => {
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
    params.append('address', '');
    params.append('latitude', '123.1');
    params.append('longitude', '123.1');

    // 서버에게 정보 전송
    await axiosInstance
      .post('/api/content/', formData, {
        params: params,
      })
      .then((res) => {
        console.log(res.status);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return {
    handleUploadFiles,
  };
};

export default useUploadFiles;

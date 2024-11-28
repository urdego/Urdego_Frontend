import usePlaceRegisterStore from '@/stores/placeRegisterStore';
import axios from 'axios';

const useUploadFiles = () => {
  const { placeList } = usePlaceRegisterStore();

  const handleUploadFiles = () => {
    const formData = new FormData();

    // 이미지 등록
    formData.append('file', placeList[0].file[0]);

    // 장소명, 장소 위경도, 힌트 등록
    const params = new URLSearchParams();
    params.append('userId', '1');
    params.append('contentName', placeList[0].title);
    params.append('hint', placeList[0].hint);
    params.append('latitude', '123.1');
    params.append('longitude', '123.1');

    // 서버에게 정보 전송
    console.log('placeRegister Result', placeList);
    // axios
    //   .post('/api/content', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //     params: params,
    //   })
    //   .then((res) => {
    //     console.log(res.status);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  };

  return {
    handleUploadFiles,
  };
};

export default useUploadFiles;

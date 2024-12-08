import axiosInstance from '@/lib/axios';
import usePlaceRegisterStore, { Place } from '@/stores/placeRegisterStore';
import useUserStore from '@/stores/useUserStore';
import toast from 'react-hot-toast';

const useUploadFiles = () => {
  const { placeList, initEntirePlaceList } = usePlaceRegisterStore();
  const { nickname } = useUserStore();

  const handleUploadFiles = async () => {
    // 장소 등록 진행
    const loadingToast = toast.loading('장소를 등록하는 중입니다...');

    try {
      for (const place of placeList) {
        await handleUploadPartFile(place);
      }

      // 장소 등록 완료
      toast.remove(loadingToast);
      toast('장소 등록이 완료되었어요!', {
        icon: '👍',
      });

      initEntirePlaceList();
    } catch (error) {
      // 장소 등록 실패
      console.error(`장소 등록하기에서 발생한 에러: ${error}`);
      toast.remove(loadingToast);
      toast('장소를 등록하지 못했어요', {
        icon: '😱',
      });
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
    params.append('nickname', nickname || '');
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

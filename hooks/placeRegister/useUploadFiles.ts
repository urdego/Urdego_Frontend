import axiosInstance from '@/lib/axios';
import usePlaceRegisterStore, { Place } from '@/stores/placeRegisterStore';
import useUserStore from '@/stores/useUserStore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const useUploadFiles = () => {
  const { placeList, initEntirePlaceList } = usePlaceRegisterStore();
  const { userId } = useUserStore();
  const router = useRouter();

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
      router.push('/home');
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
    const params = new URLSearchParams();
    params.append('userId', String(userId));

    const formData = new FormData();

    // 이미지 등록
    place.file.map((item) => {
      formData.append('contents', item);
    });

    // 장소명, 장소 위경도, 힌트 등록
    formData.append('contentName', place.title);
    formData.append('hint', place.hint);
    formData.append('address', place.address || '');
    formData.append('latitude', String(place.lat));
    formData.append('longitude', String(place.lng));

    // 서버에게 정보 전송
    await axiosInstance
      .post('/api/content', formData, { params })
      .then((response) => {
        console.log(`장소 등록하기의 서버 통신 상태:${response.status}`);
      })
      .catch((error) => {
        console.error('Upload error:', error.response?.data || error.message);
        throw new Error(error);
      });
  };

  return {
    handleUploadFiles,
  };
};

export default useUploadFiles;

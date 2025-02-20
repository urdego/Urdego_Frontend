import LoadingToast from '@/components/Common/Toast/LoadingToast';
import axiosInstance from '@/lib/axios';
import usePlaceRegisterStore, { Place } from '@/stores/contentRegisterStore';
import { useRouter } from 'next/navigation';

const useUploadFiles = () => {
  const { placeList, initEntirePlaceList } = usePlaceRegisterStore();
  const router = useRouter();

  const handleUploadFiles = async () => {
    LoadingToast(
      Promise.all(placeList.map((place) => handleUploadPartFile(place)))
    )
      .then(() => {
        initEntirePlaceList();
        router.push('/home');
      })
      .catch(() => {});
  };

  const handleUploadPartFile = async (place: Place) => {
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
      .post('/api/content', formData, {
        method: 'POST',
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

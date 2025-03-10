import LoadingToast from '@/components/Common/Toast/LoadingToast';
import { API_URL_CONFIG } from '@/config/apiEndPointConfig';
import usePlaceRegisterStore, { Place } from '@/stores/contentRegisterStore';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const useUploadFiles = () => {
  const { placeList, initEntirePlaceList, removePlaceList } =
    usePlaceRegisterStore();
  const router = useRouter();

  const { data: session } = useSession();
  const userId = session?.user.userId;

  const handleUploadFiles = async () => {
    LoadingToast(
      Promise.allSettled(
        placeList.map((place) => handleUploadPartFile(place))
      ).then((results) => {
        const rejectedPromise: number[] = [];
        results.forEach((value, index) => {
          if (value.status === 'rejected') {
            rejectedPromise.push(index);
          }
        });
        if (rejectedPromise.length === 0) return [];
        else throw new Error(`${rejectedPromise.join(',')}`);
      })
    )
      .then(() => {
        initEntirePlaceList();
        router.push('/home');
      })
      .catch((error) => {
        const rejectedPromiseIndex = error.message.split(',').map(Number);
        placeList.forEach((place, index) => {
          if (!rejectedPromiseIndex.includes(index)) {
            removePlaceList(index);
          }
        });
      });
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

    await fetch(
      `${process.env.API_URL}${API_URL_CONFIG.CONTENT.DEFAULT}/${userId}/multiple`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      }
    );
  };

  return {
    handleUploadFiles,
  };
};

export default useUploadFiles;

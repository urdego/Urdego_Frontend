import usePlaceRegisterStore from '@/stores/placeRegisterStore';
import { useState } from 'react';

const useUploadFiles = () => {
  const [postFiles, setPostFiles] = useState<File[]>([]);
  const { placeList } = usePlaceRegisterStore();

  const uploadFile = () => {
    const formData = new FormData();
    console.log('file', postFiles);
    console.log('placeInformation', placeList[0]);

    // 이미지 등록
    postFiles.map((file) => {
      formData.append('file', file);
    });

    // 장소명, 장소 위경도, 힌트 등록
    const locationInfoBlob = new Blob([JSON.stringify(placeList[0])], {
      type: 'application/json',
    });
    formData.append('placeInformation', locationInfoBlob);

    console.log(Array.from(formData));

    //axios post
    // axios.post('http://localhost:3079/file/uploads', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // })
    // .then((res) => {
    //     console.log(res.data);
    // }).catch((err) => {
    //     console.error(err);
    // });
  };

  return {
    setPostFiles,
    uploadFile,
  };
};

export default useUploadFiles;

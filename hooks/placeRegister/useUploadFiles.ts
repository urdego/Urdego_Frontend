import usePlaceRegisterCountStore from '@/stores/placeRegisterCountStore';
import { useState } from 'react';

const useUploadFiles = () => {
  const [postFiles, setPostFiles] = useState<File[]>([]);
  const [postInfo, setPostInfo] = useState<object>({
    title: '',
    hint: '',
  });
  const { placeCount, placeCountList } = usePlaceRegisterCountStore(
    (state) => state
  );

  const uploadFile = () => {
    const formData = new FormData();
    console.log('files', postFiles);
    console.log('info', postInfo);
    console.log(placeCount, placeCountList);

    // 이미지 등록
    postFiles.map((file) => {
      formData.append('locationFiles', file);
    });

    // 장소명, 힌트 등록
    const locationInfoBlob = new Blob([JSON.stringify(postInfo)], {
      type: 'application/json',
    });
    formData.append('locationInfo', locationInfoBlob);

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
    setPostInfo,
    uploadFile,
  };
};

export default useUploadFiles;

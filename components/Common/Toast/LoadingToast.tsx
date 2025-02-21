import toast from 'react-hot-toast';

const LoadingToast = (callback: Promise<void[]>) => {
  return toast.promise(
    callback,
    {
      loading: '장소를 등록하는 중입니다...',
      success: '장소 등록이 완료되었어요!',
      error: '일부 장소를 등록하지 못했어요',
    },
    {
      style: {
        minWidth: '360px',
        background: '#fffaf2',
        border: '2px solid #ae6b00',
        color: '#663f00',
        borderRadius: '999px',
        padding: '8px 16px',
      },
      duration: 4000,
      position: 'bottom-center',
    }
  );
};

export default LoadingToast;

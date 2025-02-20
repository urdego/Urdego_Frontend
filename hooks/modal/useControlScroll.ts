import { useEffect } from 'react';

const useControlScroll = ({ isModalOpen }: { isModalOpen: boolean }) => {
  const preventScroll = () => {
    const currentScrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.top = `-${currentScrollY}px`;
  };

  const allowSrcoll = () => {
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    if (isModalOpen) {
      preventScroll();
    } else {
      allowSrcoll();
    }

    return () => {
      allowSrcoll();
    };
  }, [isModalOpen]);
};

export default useControlScroll;

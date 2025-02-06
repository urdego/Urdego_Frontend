import { useState } from 'react';

const useToggleBottomSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  // 위치 목록 토글
  const toggleBottomSheet = () => {
    setIsOpen((prev) => !prev);
  };

  return {
    isOpen,
    setIsOpen,
    toggleBottomSheet,
  };
};

export default useToggleBottomSheet;

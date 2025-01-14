import { PanInfo } from 'framer-motion';
import { useState } from 'react';

interface useBottomSheetProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const useBottomSheet = ({ setIsOpen }: useBottomSheetProps) => {
  const [isExpand, setIsExpand] = useState(false);

  /**
   * bottomSheet dragEnd 이벤트
   */
  const onDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const isScrollToBottom = info.delta.y > 5 || info.offset.y > 150;
    if (isScrollToBottom) {
      // 스크롤 아래로 내리는 경우
      setIsExpand(false);
      setIsOpen(false);
    } else {
      // 스크롤 위로 올리는 경우
      setIsExpand(true);
    }
  };
  return { isExpand, onDragEnd };
};

export default useBottomSheet;

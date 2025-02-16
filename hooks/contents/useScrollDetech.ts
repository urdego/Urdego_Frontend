import { useRef, useState } from 'react';

const useScrollDetech = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isSwipe, setIsSwipe] = useState(0);

  const getPageX = (event: React.MouseEvent | React.TouchEvent) => {
    if ('touches' in event) {
      return event.touches[0].pageX;
    }
    return event.pageX;
  };

  const handleScrollStart = (event: React.MouseEvent | React.TouchEvent) => {
    if (!scrollRef.current) return;
    setIsDrag(true);
    setStartX(getPageX(event) + scrollRef.current.scrollLeft);
  };

  const handleScrollMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!scrollRef.current || !isDrag) return;

    const motionType = startX - getPageX(event);
    if (Math.abs(motionType) >= 50) {
      setIsSwipe(motionType > 0 ? 50 : 0);
    }
  };

  const handleScrollEnd = () => {
    setIsDrag(false);
  };

  return {
    scrollRef,
    isSwipe,
    setIsSwipe,
    handleScrollStart,
    handleScrollMove,
    handleScrollEnd,
  };
};

export default useScrollDetech;

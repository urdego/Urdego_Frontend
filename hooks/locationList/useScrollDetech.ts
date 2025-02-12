import { useRef, useState } from 'react';

const useScrollDetech = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isSwipe, setIsSwipe] = useState(0);

  const handleDragStart = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    setIsDrag(true);
    setStartX(event.pageX + scrollRef.current.scrollLeft);
  };

  const handleDragMove = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!scrollRef.current || !isDrag) return;
    const motionType = startX - event.pageX;
    console.log(motionType < 0 ? 'riight' : 'left');
    if (Math.abs(motionType) >= 50) {
      setIsSwipe(motionType > 0 ? 50 : 0);
    }
  };

  const handleDragEnd = () => {
    setIsDrag(false);
  };

  return {
    scrollRef,
    isSwipe,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  };
};

export default useScrollDetech;

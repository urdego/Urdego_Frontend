import { useRef, useState } from 'react';

const useScrollDetech = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleDragStart = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    setIsDrag(true);
    setStartX(event.pageX + scrollRef.current.scrollLeft);
  };

  const handleDragMove = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!scrollRef.current || !isDrag) return;
    const motionType = startX - event.pageX;
    if (Math.abs(motionType) >= 50) {
    }
  };

  const handleDragEnd = () => {
    setIsDrag(false);
  };

  return {
    scrollRef,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  };
};

export default useScrollDetech;

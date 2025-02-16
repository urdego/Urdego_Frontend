import { useEffect, useRef } from 'react';

interface useIntersectionObserverProps {
  handleIntersect: () => void;
}

const useIntersectionObserver = ({
  handleIntersect,
}: useIntersectionObserverProps) => {
  const targetElement = useRef(null);

  useEffect(() => {
    // target ref가 없으면 종료
    if (!targetElement || !targetElement.current) return;

    // target ref 감시 및 동작
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && handleIntersect());
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(targetElement && targetElement.current);

    // target ref 감시 종료
    return () => {
      observer.disconnect();
    };
  }, [handleIntersect]);

  return targetElement;
};

export default useIntersectionObserver;

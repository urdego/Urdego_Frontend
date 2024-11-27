import { useState, useEffect } from 'react';

export const useGameTimer = (initialTime: number, onTimeEnd: () => void) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) return prev - 1;
        clearInterval(timer);
        onTimeEnd();
        return 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeEnd]);

  return { timeLeft };
};

import { useState, useEffect } from 'react';

const useTimer = (initialTime: number, onTimeEnd: () => void) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(timer);
      onTimeEnd();
    }

    return () => clearInterval(timer);
  }, [timeLeft, onTimeEnd]);

  const resetTimer = () => setTimeLeft(initialTime);

  return { timeLeft, resetTimer };
};

export default useTimer;

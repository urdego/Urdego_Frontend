import { useEffect, useState } from 'react';
import Button from '@/components/Common/Button/Button';

interface CountdownButtonProps {
  initialTime: number;
  onTimeEnd: () => void;
}

const CountdownButton = ({ initialTime, onTimeEnd }: CountdownButtonProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeEnd]);

  return (
    <Button
      label={`${timeLeft}초 후 게임 종료`}
      buttonSize="large"
      onClick={onTimeEnd}
      styleType="coloredBackground"
    />
  );
};

export default CountdownButton;

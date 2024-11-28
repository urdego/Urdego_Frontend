import { useEffect, useState, memo } from 'react';
import ProgressBar from '@/components/Layout/Game/ProgressBar';
import { TimerContainer, TimerText } from './Timer.styles';

interface TimerProps {
  initialTime: number;
  onTimeEnd: () => void;
  onTick?: (time: number) => void;
}

const Timer = ({ initialTime, onTimeEnd }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeEnd?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeEnd, initialTime]);

  return (
    <TimerContainer>
      <TimerText>{timeLeft}초</TimerText>
      <ProgressBar progress={(timeLeft / initialTime) * 100} />
    </TimerContainer>
  );
};

export default memo(Timer);

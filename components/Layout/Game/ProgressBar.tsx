import React from 'react';
import { ProgressBarContainer, ProgressBarFill } from './ProgressBar.styles';

interface ProgressBarProps {
  progress: number; // 진행률 (0-100)
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <ProgressBarContainer>
      <ProgressBarFill width={progress} />
    </ProgressBarContainer>
  );
};

export default ProgressBar;
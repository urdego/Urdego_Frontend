import styled from 'styled-components';
import colors from '@/styles/color/palette';

export const InfoRow = styled.div`
  display: flex;
  justify-content: left;
  width: 100%;
`;
export const LevelText = styled.div`
  display: flex;
  height: 21px;
  background-color: ${colors.purple[95]};
  border-radius: 4px;
  padding: 0px 8px;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.14px;
  font-weight: regular;
  color: ${colors.purple[60]};
`;

export const UserName = styled.div`
  padding-left: 8px;
  color: ${colors.etc.black};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.16px;
`;
export const ProgressRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: ${colors.gray[95]};
  border-radius: 999px;
  overflow: hidden;
`;

export const ProgressBar = styled.div<{ $progress: number }>`
  position: relative;
  height: 12px;
  background-color: #947dff;
  border-radius: 4px;
  width: 0;
  animation: fillProgress 3s ease-out forwards;

  @keyframes fillProgress {
    from {
      width: 0;
    }
    to {
      width: ${({ $progress }) => $progress}%;
    }
  }
`;
export const ProgressNum = styled.p`
  color: ${colors.etc.black};
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 24px */
  letter-spacing: -0.16px;
`;

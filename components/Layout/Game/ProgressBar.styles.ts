import styled from 'styled-components';
import colors from '@/styles/color/palette';

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div<{ width: number }>`
  height: 100%;
  border-radius: 4px;
  background-color: ${({ width }) => {
    if (width > 50) return colors.etc.green; // 31~60초 (51~100%)
    if (width > 25) return colors.etc.yellow; // 16~30초 (26~50%)
    return colors.alert[50]; // 0~15초 (0~25%)
  }};
  width: ${({ width }) => width}%;
`;

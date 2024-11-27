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
  background-color: ${colors.purple[60]};
  border-radius: 4px;
  width: ${({ width }) => width}%;
`;

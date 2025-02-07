import styled from 'styled-components';
import colors from '@/styles/color/palette';

export const TimerContainer = styled.div`
  display: flex;
  width: 375px;
  padding: 16px 16px 10px 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;
`;

export const TimerText = styled.div`
  font-size: 14px;
  font-weight: bold;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 21px */
  letter-spacing: -0.14px;
  color: ${colors.etc.black};
`;

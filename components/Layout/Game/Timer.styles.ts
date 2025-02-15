import styled from 'styled-components';
import colors from '@/styles/color/palette';

export const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 32px);
  margin: 8px 16px 10px;
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

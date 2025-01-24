import colors from '@/styles/color/palette';
import styled, { keyframes } from 'styled-components';

const fadeInOut = keyframes`
  0% {
    transform: scale(0);
  }
  50%{
    transform: scale(1.0);
  }
  100% {
    transform: scale(0);
  }
`;

export const DotContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 15%;
  height: 100%;
  margin: auto;
`;

export const Dot = styled.div`
  width: 11px;
  height: 11px;
  background-color: ${colors.gray[90]};
  border-radius: 50%;
  animation: ${fadeInOut} 1.5s infinite ease-in-out;

  &:nth-child(2) {
    animation-delay: 0.16s;
  }
  &:nth-child(3) {
    animation-delay: 0.32s;
  }
`;

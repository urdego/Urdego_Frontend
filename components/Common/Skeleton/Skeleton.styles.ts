import styled from 'styled-components';
import { keyframes } from 'styled-components';

const loading = keyframes`
  0%{
    transform: translateX(-100%);
  }

  100%{
    transform: translateX(200%);
  }
`;

export const SkeletonWrapper = styled.div<{ width: number; height: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border-radius: 8px;
  background: rgba(235, 235, 235, 1);
  overflow: hidden;
`;

export const Shimmer = styled.div`
  width: 50%;
  height: 100%;
  background-color: rgba(245, 245, 245, 0.6);
  box-shadow:
    0 0 50px 30px rgba(245, 245, 245, 0.3),
    0 0 20px 10px rgba(245, 245, 245, 0.2),
    0 0 10px 5px rgba(245, 245, 245, 0.1);
  filter: blur(4px);
  animation: ${loading} 1.5s infinite ease-in-out;
`;

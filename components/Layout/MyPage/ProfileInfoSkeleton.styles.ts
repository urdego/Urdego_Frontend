import styled, { keyframes } from 'styled-components';
import colors from '@styles/color/palette';

const skeletonAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const SkeletonBlock = styled.div`
  background: ${colors.gray[80]};
  border-radius: 4px;
  animation: ${skeletonAnimation} 1.5s ease-in-out infinite;
`;

export const SkeletonImageWrapper = styled(SkeletonBlock)`
  width: 56px;
  height: 56px;
  margin-bottom: 12px;
`;

export const SkeletonInfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;
  width: 100%;
`;

export const SkeletonLevel = styled(SkeletonBlock)`
  width: 50px;
  height: 20px;
`;

export const SkeletonName = styled(SkeletonBlock)`
  flex: 1;
  height: 14px;
`;

export const SkeletonEmail = styled(SkeletonBlock)`
  width: 100px;
  height: 12px;
`;

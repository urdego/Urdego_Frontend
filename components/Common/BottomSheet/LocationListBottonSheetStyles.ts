import colors from '@/styles/color/palette';
import { motion } from 'motion/react';
import styled from 'styled-components';

export const BackgroundOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 50%;

  width: 100%;
  min-width: 340px;
  max-width: 430px;
  height: 100vh;

  margin: 0 auto;

  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
`;

export const BottomSheet = styled(motion.div)`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  bottom: 0;
  left: 50%;

  width: 100%;
  min-width: 340px;
  max-width: 430px;
  margin: 0 auto;

  height: 50vh;
  background: ${colors.etc.white};
  border-radius: 4px 4px 0px 0px;
  padding: 12px 0 21px 0;

  will-change: transform;
  z-index: 999;
`;

export const ContentWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 0 16px 16px 16px;
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderHandler = styled(motion.div)`
  width: 40px;
  height: 4px;
  border-radius: 100px;
  background: ${colors.gray[50]};
  margin: 0 0 8px 0;
`;

export const ContentHeader = styled.div`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;

export const ContentContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 40vh;
  gap: 50px;
  font-size: 14px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

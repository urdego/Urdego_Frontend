import { motion } from 'motion/react';
import styled from 'styled-components';

export const BackgroundOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 50%;
  width: 100%;
  min-width: 340px;
  max-width: 430px;
  margin: 0 auto;
  height: 100vh;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
`;

export const BottomSheet = styled(motion.div)`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  left: 50%;
  /* transform: translateX(-50%); */

  width: 100%;
  min-width: 340px;
  max-width: 430px;
  margin: 0 auto;
  height: 100vh;
  background: white;
  /* box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.5); */
  border-radius: 4px 4px 0px 0px;
  padding: 12px 0 21px 0;
  will-change: transform;
  z-index: 999;
`;

export const ContentWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px 16px 16px;
`;

export const ContentHeader = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0 8px 0;
`;

export const ContentContainer = styled(motion.div)``;

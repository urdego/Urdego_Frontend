import { motion } from 'framer-motion';
import styled from 'styled-components';
import colors from '@/styles/color/palette';

export const BackgroundOverlay = styled(motion.div)<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  z-index: 999;
`;

export const BottomSheetWrapper = styled(motion.div)<{ $isExpand: boolean }>`
  position: fixed;
  bottom: 80px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: min(100%, 430px);
  height: 75vh;
  background: ${colors.etc.white};
  border-radius: 12px 12px 0 0;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
`;

export const HeaderHandler = styled.div`
  width: 40px;
  height: 4px;
  border-radius: 100px;
  background: ${colors.gray[50]};
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 8px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StyledTitle = styled.h2`
  margin: 8px 0;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  width: 100%;
`;

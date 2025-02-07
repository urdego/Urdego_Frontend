import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledMotion = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-height: 60vh;
  z-index: 200;
  touch-action: none;
  margin: 0 auto;
  max-width: 430px;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

export const BottomSheetWrapper = styled.div`
  background-color: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const BottomSheetHeader = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  background-color: white;
  flex-shrink: 0;
`;

export const ContentContainer = styled.div`
  flex: 1; /* 남은 공간을 차지하여 스크롤*/
  overflow-y: auto;
`;

export const DragHandle = styled.div`
  width: 40px;
  height: 4px;
  background-color: #e2e2e2;
  border-radius: 2px;
  margin: 0 auto 12px;
`;

export const BottomSheetFooter = styled.div`
  padding: 16px;
  background-color: white;
  border-top: 1px solid #eee;
`;

export const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  text-align: left;
`;

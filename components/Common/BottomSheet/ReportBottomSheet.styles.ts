import styled from 'styled-components';
import CheckIcon from '@/styles/Icon/BottomSheet/CheckIcon';
import NonCheckIcon from '@/styles/Icon/BottomSheet/NonCheckIcon';
import { motion } from 'framer-motion';

export const StyledMotion = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 42vh;
  z-index: 6;
  touch-action: none;
  margin: 0 auto;
  max-width: 430px;
  will-change: transform;
  transform: translateZ(0);

  & > div {
    height: 100%;
    transform: translateZ(0);
  }
`;

export const BottomSheetWrapper = styled.div`
  height: 100%;
  background-color: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  overflow: hidden;
`;

export const BottomSheetHeader = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  background-color: white;
`;

export const DragHandle = styled.div`
  width: 40px;
  height: 4px;
  background-color: #e2e2e2;
  border-radius: 2px;
  margin: 0 auto 12px;
`;

export const BottomSheetFooter = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 12px;
  gap: 24px;
  background-color: white;
  border-top: 1px solid #eee;
`;

export const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  text-align: center;
`;

export const ReportCheckList = styled.div`
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ReportCheckItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const ReportCheckItemTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.16px;
  padding: 15px 0;
`;

export const StyledCheckIcon = styled(CheckIcon)`
  position: relative;
`;

export const StyledNonCheckIcon = styled(NonCheckIcon)`
  position: relative;
`;

import styled from 'styled-components';
import { motion } from 'framer-motion';
import colors from '@/styles/color/palette';

export const BackgroundOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
`;

export const BottomSheet = styled(motion.div)<{ $isExpand: boolean }>`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 430px;
  height: 50vh;
  background: ${colors.etc.white};
  border-radius: ${({ $isExpand }) => ($isExpand ? '0' : '20px 20px 0 0')};
  padding: 12px 16px;
  z-index: 1000;
  overflow: hidden;
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HeaderHandler = styled.div`
  width: 40px;
  height: 4px;
  background: ${colors.gray[50]};
  border-radius: 100px;
  margin: 8px 0;
`;

export const HeaderTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: ${colors.etc.black};
`;

export const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  margin-bottom: 24px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: calc(100% - 80px);
  overflow-y: auto;
`;

export const AllCancelButton = styled.button`
  padding: 8px 4px;
  border: 1px solid ${colors.gray[70]};
  border-radius: 4px;
  background: transparent;
  align-items: center;
  cursor: pointer;
`;

export const CancelButtonText = styled.span`
  font-size: 14px;
  color: ${colors.gray[70]};
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  padding: 0 4px;
`;

export const GridItem = styled.div`
  position: relative;
  aspect-ratio: 1;
  background: ${colors.gray[90]};
  cursor: pointer;

  &:hover {
    background: ${colors.gray[95]};
  }
`;

export const SelectIndicator = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${colors.purple[50]};
`;

export const SelectNumber = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${colors.purple[50]};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
`;

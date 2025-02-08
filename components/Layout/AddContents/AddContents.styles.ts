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
  z-index: 200;
  display: flex;
  justify-content: center;
`;

export const BottomSheet = styled(motion.div)<{ $isExpand: boolean }>`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 430px;
  height: 80vh;
  background: ${colors.etc.white};
  border-radius: 4px 4px 0 0;
  /* padding: 12px 16px; */
  z-index: 200;
  overflow: hidden;
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 16px;
`;

export const HeaderHandler = styled.div`
  width: 40px;
  height: 4px;
  background: ${colors.gray[50]};
  border-radius: 100px;
  margin: 3px 0;
`;

export const TitleContainer = styled.div`
  position: relative; /* 기준점 설정 */
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  margin: 8px 0;
`;

export const HeaderTitle = styled.h2`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 700;
  color: ${colors.etc.black};
  white-space: nowrap; /* 줄바꿈 방지 */
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 100px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  /* margin: 12px; */
  padding-bottom: 60px;
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
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  width: 100%;
`;

export const GridItem = styled.div`
  position: relative;
  aspect-ratio: 1;
  background: ${colors.gray[90]};
  cursor: pointer;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  &:hover {
    background: ${colors.gray[95]};
  }
`;

export const SelectIndicator = styled.div<{ selected: boolean }>`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${({ selected }) =>
    selected ? colors.purple[50] : colors.gray[70]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SelectNumber = styled.span`
  color: white;
  font-size: 12px;
  font-weight: 600;
`;

export const LocationName = styled.span`
  font-size: 14px;
  color: ${colors.etc.white};
  text-align: center;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  padding: 4px 0;
  position: absolute;
  bottom: 0;
  left: 0;
  text-align: center;
`;

export const CloseButton = styled.span`
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
`;

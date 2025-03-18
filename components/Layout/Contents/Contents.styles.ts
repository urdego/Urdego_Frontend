import colors from '@/styles/color/palette';
import styled from 'styled-components';

export const ScrollWapper = styled.div`
  position: relative;
  width: calc(100%);
  padding: 0 16px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;

export const LocationListWrapper = styled.div<{ $isSwipe: number }>`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 6px 0;
  gap: 12px;
  top: 0;
  left: ${({ $isSwipe }) => ($isSwipe === 0 ? '0px' : '-24px')};
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  cursor: pointer;
  transition: 0.2s ease;
`;

export const LocationImageContainer = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
  img {
    border-radius: 4px;
  }
`;

export const LocationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;

export const SkeletonLocationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

export const LocationTitle = styled.div`
  color: ${colors.etc.black};
  font-size: 14px;
  font-weight: 700;
  line-height: 150%;
`;

export const LocationDetail = styled.div`
  color: ${colors.etc.black};
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
`;

export const IconContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);

  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: #de3730;
  padding: 3px 4px;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;

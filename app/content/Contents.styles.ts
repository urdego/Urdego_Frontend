import colors from '@/styles/color/palette';
import styled from 'styled-components';

export const LocationLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const LocationHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 16px;
`;

export const TextHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 8px;
`;

export const SortHeader = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

export const SearchHeader = styled.div``;

export const LocationContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 12px;
`;

export const NoContentText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40vh;
  font-size: 14px;
`;

export const IntersectionObserverArea = styled.div`
  width: 100%;
  min-height: 100px;
  visibility: hidden;
`;

export const SortText = styled.div<{ $isActive: boolean }>`
  color: ${({ $isActive }) => ($isActive ? colors.etc.black : colors.gray[70])};
`;

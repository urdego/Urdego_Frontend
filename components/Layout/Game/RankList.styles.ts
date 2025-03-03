import styled from 'styled-components';
import colors from '@/styles/color/palette';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 500px;
  padding: 8px 16px;
  background-color: ${colors.purple[95]};
`;

export const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  background-color: ${colors.gray[90]};
  border-radius: 999px;
  overflow: hidden;
`;

export const Button = styled.button<{ $active: boolean; $isLast?: boolean }>`
  flex: 1;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  text-align: center;
  background: ${({ $active, $isLast }) =>
    $isLast ? colors.etc.white : $active ? colors.etc.white : colors.gray[90]};
  border: none;
  position: relative;
  z-index: 1;

  color: ${({ $active }) => ($active ? colors.purple[50] : colors.gray[70])};
  box-shadow: ${({ $active }) =>
    $active ? `inset 0 0 0 2px ${colors.purple[50]}` : 'none'};
  border-radius: 999px;
  transition:
    color 0.3s ease-in-out,
    box-shadow 0.5s ease-in-out;
`;

export const ActiveIndicator = styled.div<{ $activeIndex: number }>`
  position: absolute;
  top: 0;
  left: ${({ $activeIndex }) => ($activeIndex === 0 ? '0%' : '50%')};
  width: 50%;
  height: 100%;
  background-color: ${colors.etc.white};
  border-radius: 999px;
  transition: left 0.3s ease-in-out;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 0;
  overflow-y: auto;
  min-height: 360px;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  scroll-behavior: smooth;
`;

export const UserRow = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  height: 54px;
  gap: 12px;
  padding: 0px 24px 0px 20px;
  background-color: ${colors.etc.white};
  border-radius: 8px;
`;

export const Rank = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${colors.etc.black};
`;

export const Name = styled.span`
  flex: 1;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  color: ${colors.etc.black};
`;

export const Score = styled.span`
  font-size: 16px;
  text-align: right;
  font-weight: 700;
  font-style: normal;
  line-height: 150%;
  color: ${colors.purple[50]};
`;

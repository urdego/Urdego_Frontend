import styled from 'styled-components';
import colors from '@/styles/color/palette';

export const SubTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0 8px 0;
`;

export const ListTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  line-height: 150%;
`;

export const RoomButtonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  max-height: 72vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;

  /* WebKit 기반 브라우저에서만 적용 가능 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
  }
`;

export const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  min-width: 375px;
  max-width: 430px;
  padding: 16px;
  background-color: ${colors.etc.white};
  box-shadow: 0px -4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

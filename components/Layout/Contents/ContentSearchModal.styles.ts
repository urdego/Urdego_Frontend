import colors from '@/styles/color/palette';
import styled from 'styled-components';

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  width: 100vw;
  min-width: 340px;
  max-width: 430px;
  height: 100vh;
  max-height: calc(100vh);

  margin: 0 auto;

  background: ${colors.etc.white};
  padding: 12px 16px 20px 16px;
  z-index: 999;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ModalHeader = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 4px;
  background: ${colors.etc.white};
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 20px;
`;

export const CancelButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  padding: 4px;
`;

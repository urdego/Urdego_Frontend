import colors from '@/styles/color/palette';
import styled from 'styled-components';

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  min-width: 340px;
  max-width: 430px;
  height: 100vh;
  max-height: calc(100vh);

  margin: 0 auto;

  background: ${colors.etc.white};
  padding: 12px 16px 20px 16px;
  z-index: 999;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

export const ModalContainer = styled.div`
  padding-top: 20px;
`;

export const CancelButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  padding: 4px;
`;

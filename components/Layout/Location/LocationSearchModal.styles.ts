import colors from '@/styles/color/palette';
import styled from 'styled-components';

export const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: calc(100vh);
  background: ${colors.etc.white};
  padding: 12px 16px 92px 16px;
  z-index: 999;
`;

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

export const CancelButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  padding: 4px;
`;

export const ModalContainer = styled.div``;

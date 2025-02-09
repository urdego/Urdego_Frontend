import styled from 'styled-components';
import colors from '@/styles/color/palette';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background-color: rgba(179, 179, 179, 1);
  border-radius: 16px;
  width: fit-content;
  min-width: 270px;
  max-width: 300px;
  text-align: center;
`;

export const AlertTitle = styled.h2`
  font-size: 15px;
  font-weight: 400;
  color: ${colors.etc.black};
  margin: 19px 16px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  border-top: 1px solid ${colors.gray[80]};
`;

export const Button = styled.button<{ $confirm?: boolean }>`
  flex: 1;
  padding: 11px 0;
  font-size: 16px;
  font-weight: 400;
  color: ${colors.etc.blue};
  background: transparent;
  border: none;
`;

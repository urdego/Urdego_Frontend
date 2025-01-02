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
  background-color: ${colors.etc.white};
  border-radius: 14px;
  padding: 20px 16px 16px;
  width: 270px;
`;

export const AlertTitle = styled.h2`
  text-align: center;
  font-size: 13px;
  font-weight: 400;
  margin-bottom: 16px;
  color: ${colors.gray[20]};
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

export const Button = styled.button<{ confirm?: boolean }>`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 400;
  color: ${(props) => (props.confirm ? colors.etc.white : colors.gray[20])};
  background-color: ${(props) =>
    props.confirm ? colors.purple[50] : colors.gray[95]};
`;

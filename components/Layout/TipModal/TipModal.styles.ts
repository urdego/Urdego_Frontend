import colors from '@/styles/color/palette';
import styled from 'styled-components';

export const ModalWrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  padding: 8px 12px 12px 12px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  border-radius: 8px;
  background: ${colors.etc.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);

  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

export const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalContainer = styled.div``;

export const IconLayout = styled.div`
  cursor: pointer;
`;

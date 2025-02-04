import colors from '@styles/color/palette';
import styled from 'styled-components';

export const ToastContainer = styled.div`
  background-color: #fffaf2;
  border-radius: 999px;
  padding: 4px 10px;
  gap: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const Message = styled.p`
  color: ${colors.brown[50]};
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
  letter-spacing: -0.14px;
`;

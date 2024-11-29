import styled from 'styled-components';
import colors from '@/styles/color/palette';

export const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  width: 100%;
  min-width: 375px;
  max-width: 430px;
  padding: 12px 16px;
  background-color: ${colors.etc.white};
  box-shadow: 0px -4px 24px rgba(0, 0, 0, 0.1);
`;

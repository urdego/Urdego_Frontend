import styled from 'styled-components';
import colors from '@/styles/color/palette';

export const PageWrapper = styled.div`
  background-color: ${colors.etc.white};
  padding: 84px 16px 0px 16px;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  width: calc(100% - 24px);
  max-width: 400px;
  padding: 12px 16px 33px 16px;
  background-color: ${colors.etc.white};
  box-shadow: 0px -4px 24px rgba(0, 0, 0, 0.1);
`;

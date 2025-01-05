import styled from 'styled-components';
import colors from '@styles/color/palette';

export const SessionWrapper = styled.div`
  margin: 16px;
`;

export const SubTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const DetailText = styled.p`
  font-size: 12px;
  color: ${colors.gray[60]};
  margin-bottom: 12px;
  line-height: 1.5;
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
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BigCheckboxWrapper = styled.div`
  position: fixed;
  bottom: 90px;
  padding: 0 0 0 16px;
`;

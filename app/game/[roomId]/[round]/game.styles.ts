'use client';
import styled from 'styled-components';
import colors from '@/styles/color/palette';

export const PageWrapper = styled.div`
  background-color: ${colors.etc.white};
  width: 100%;
  box-sizing: border-box;
  align-items: center;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`;

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

export const HintText = styled.p`
  border-radius: 8px;
  font-size: 16px;
  color: ${colors.etc.black};
  text-align: center;
`;

export const HintWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  z-index: 10;
  padding-top: 8px;
`;
export const HintIcon = styled.div`
  display: flex;
  width: 36px;
  height: 28px;
  font-size: 16px;
  font-weight: 400;
  color: ${colors.etc.white};
  background-color: ${colors.purple[50]};
  padding: 2px 4px;
  border-radius: 4px;
  text-align: center;
  align-items: center;
`;

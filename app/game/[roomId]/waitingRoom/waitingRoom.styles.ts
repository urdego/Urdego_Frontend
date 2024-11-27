'use client';
import styled from 'styled-components';
import colors from '@/styles/color/palette';

export const WaitingWrapper = styled.div`
  background-color: ${colors.purple[98]};
  padding-top: 44px;
  width: 100%;
  height: calc(100% - 72px);
  align-items: center;
  justify-items: center;
`;

export const UserList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 16px 0;
  width: 100%;
  max-width: 400px;
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

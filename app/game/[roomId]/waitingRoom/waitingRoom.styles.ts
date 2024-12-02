'use client';
import styled from 'styled-components';
import colors from '@/styles/color/palette';

export const WaitingWrapper = styled.div`
  background-color: ${colors.purple[98]};
  height: 100vh;
`;

export const UserList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  height: calc(100vh - 140px);
  padding: 2rem;

  position: relative;
  aspect-ratio: 1;
  margin: 0 auto;

  // Character 컴포넌트 스타일
  > div {
    position: absolute;
    transform-origin: center;
  }
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

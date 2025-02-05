'use client';
import styled from 'styled-components';
import colors from '@/styles/color/palette';
import BackgroundImage from '@/styles/Image/WaitingRoom/BackgroundImageL.png';

export const WaitingWrapper = styled.div`
  background-image: url(${BackgroundImage.src});
  background-size: cover;
  background-position: center;
  min-height: 100dvh;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

export const UserList = styled.div`
  display: grid;
  grid-template-areas:
    'pos1 pos2 pos3'
    'pos4 pos5 pos6';
  gap: 24px;
  justify-content: center;
  align-content: center;
  padding: 20px;
  width: fit-content;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
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
  gap: 16px;
  z-index: 101;
`;

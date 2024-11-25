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

export const UserItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  margin-bottom: 8px;
  background-color: #f4f4f4;
  border-radius: 8px;
`;

export const StartButton = styled.button<{ disabled: boolean }>`
  margin-top: 16px;
  padding: 12px 24px;
  font-size: 16px;
  color: ${({ disabled }) => (disabled ? '#888' : '#fff')};
  background-color: ${({ disabled }) => (disabled ? '#ccc' : '#007bff')};
  border: none;
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#ccc' : '#0056b3')};
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
  width: calc(100% - 24px);
  max-width: 400px;
  padding: 12px 16px 33px 16px;
  background-color: ${colors.etc.white};
  box-shadow: 0px -4px 24px rgba(0, 0, 0, 0.1);
`;

import colors from '@/styles/color/palette';
import styled from 'styled-components';

export const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  display: flex;
  transform: translateX(-50%);
  width: 100%;
  min-width: 340px;
  max-width: 430px;
  height: 80px;
  justify-content: space-evenly;
  align-items: flex-start;
  background-color: ${colors.etc.white};
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.05);
  z-index: 100;
`;

export const IconPlaceholder = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 4px;
  transition: background-color 0.3s ease;
`;

export const NavBarText = styled.div`
  text-align: center;
  font-size: 12px;
  color: #4d4d4d;
`;

export const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0px 14px 0px;
  gap: 4px;
  flex: 1;

  &:hover ${IconPlaceholder} {
    background-color: #e0e0e0;
  }
`;

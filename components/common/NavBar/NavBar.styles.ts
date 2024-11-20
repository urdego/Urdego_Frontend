import styled from "styled-components";

export const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  display: flex;
  transform: translateX(-50%);
  width: 100%;
  min-width: 340px;
  max-width: 430px;
  height: 100px;
  justify-content: space-evenly;
  align-items: flex-start;
  background-color: #f8f9fa;
`;

export const IconPlaceholder = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4d4d4d; /* 아이콘 자리 표시용 */
  border-radius: 8px;
  margin-bottom: 4px;
  transition: background-color 0.3s ease;
`;

export const NavBarText = styled.div`
  text-align: center;
  font-size: 12px;
  color: #4d4d4d;
  transition: color 0.3s ease;
`;

export const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  &:hover ${IconPlaceholder} {
    background-color: #e0e0e0;
  }

  &:hover ${NavBarText} {
    color: #e0e0e0;
  }
`;

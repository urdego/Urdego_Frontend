import styled, { css } from "styled-components";

interface StyledTopBarProps {
  $NavType: "default" | "other" | "main";
}

export const Nav = styled.nav<StyledTopBarProps>`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 375px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  z-index: 100;

  ${({ $NavType }) =>
    $NavType === "default"
      ? css`
          background-color: transparent;
        `
      : $NavType === "other"
      ? css`
          background-color: white;
        `
      : css`
          background-color: transparent;
          justify-content: flex-end;
        `}
`;

export const BackIconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

export const RightIconsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Label = styled.div`
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;

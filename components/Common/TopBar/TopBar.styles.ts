import styled, { css } from "styled-components";

interface StyledTopBarProps {
  $NavType: "default" | "other" | "main";
}

export const Nav = styled.nav<StyledTopBarProps>`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  /* width: 375px; */
  width: calc(100% + 46px);
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
  top: 44px;

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
          background-color: #F4EEFF;
          justify-content: flex-end;
          padding-right: 16px;
        `}
`;

export const BackIconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
`;

export const RightIconsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 16px;
`;

export const Label = styled.div`
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;
import styled, { css } from "styled-components";

interface StyledTopBarProps {
  $NavType: "default" | "other" | "main";
}

export const Nav = styled.nav<StyledTopBarProps>`
  position: fixed; /* 화면 상단 고정 */
  top: 44px;
  left: 50%;
  transform: translateX(-50%);
  right: 0;
  width: 100%;
  max-width: 375px; /* 최대 너비 설정 */
  height: 40px;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ $NavType }) =>
    $NavType === "default"
      ? css`
          background-color: transparent;
          box-shadow: 0px 2px 4px  rgba(0, 0, 0, 0.05);
        `
      : $NavType === "other"
      ? css`
          background-color: white;
          box-shadow: 0px 2px 4px  rgba(0, 0, 0, 0.05);
        `
      : css`
          background-color: #f4eeff;
          justify-content: flex-end;
          padding-right: 16px;
        `}
`;


export const BackIconWrapper = styled.div`
  display: flex;
  align-items: center;
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
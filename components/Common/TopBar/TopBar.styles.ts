import { isMap } from 'util/types';
import styled, { css } from "styled-components";

interface StyledTopBarProps {
  $NavType: "default" | "other" | "main" | "game";
  isMapView?: boolean;
}

export const Nav = styled.nav<StyledTopBarProps>`
  position: fixed; 
  top: 44px;
  left: 50%;
  transform: translateX(-50%);
  right: 0;
  width: 100%;
  max-width: 400px; /* 최대 너비 설정 */
  height: 40px;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ $NavType, isMapView }) =>
    $NavType === "default"
      ? css`
          background-color: transparent;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
        `
      : $NavType === "other"
      ? css`
          background-color: white;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
        `
      : $NavType === "game"
      ? css`
          justify-content: ${isMapView ? "space-between" : "center"}; 
          padding-right: ${isMapView ? "16px" : "0"};
          box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.05);
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
  cursor: pointer;

  &:active {
    opacity: 0.7;
  }
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
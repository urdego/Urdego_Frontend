import styled, { css } from 'styled-components';

interface StyledTopBarProps {
  $NavType: 'default' | 'other' | 'main' | 'game' | 'room';
  isMapView?: boolean;
}

export const Nav = styled.nav<StyledTopBarProps>`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 430px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;

  ${({ $NavType }) =>
    $NavType === 'default'
      ? css`
          background-color: white;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
        `
      : $NavType === 'other'
        ? css`
            background-color: white;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
          `
        : $NavType === 'game'
          ? css`
              box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
            `
          : $NavType === 'room'
            ? css`
                background-color: white;
                box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
                justify-content: end;
              `
            : css`
                background-color: #f4eeff;
              `}
`;

export const BackIconWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-left: 20px;

  &:active {
    opacity: 0.7;
  }
`;

export const RightIconsWrapper = styled.div<StyledTopBarProps>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-right: 20px;

  ${({ $NavType }) =>
    $NavType === 'main' &&
    css`
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      justify-content: flex-end;
    `}
`;

export const Label = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  white-space: nowrap;
`;

export const ExitButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-right: 20px;

  &:active {
    opacity: 0.7;
  }
`;

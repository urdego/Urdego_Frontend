import styled, { css } from 'styled-components';
import colors from '@styles/color/palette';

interface StyledButtonProps {
  $buttonType: 'purple' | 'gray' | 'lightGray' | 'icon' | 'forWaitingRoom';
  $buttonSize: 'small' | 'large';
  $buttonHeight: 'default' | 'short' | 'long';
  $styleType: 'whiteBackground' | 'coloredBackground';
  $iconPosition?: 'left' | 'right';
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  padding: 16px;
  user-select: none;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.16px;
  transition: 0.3s ease;
  white-space: nowrap;

  ${({ $buttonSize }) =>
    $buttonSize === 'small'
      ? css`
          width: 166px;
        `
      : css`
          width: 100%;
        `}

  ${({ $buttonHeight }) =>
    $buttonHeight === 'default'
      ? css`
          height: 48px;
        `
      : $buttonHeight === 'long'
        ? css`
            height: 64px;
          `
        : css`
            height: 40px;
          `}

  ${({ $styleType, $buttonType }) =>
    $styleType === 'whiteBackground'
      ? css`
          background-color: ${colors.etc.white};
          border: 1px solid
            ${$buttonType === 'purple' ? colors.purple[50] : colors.gray[70]};
          color: ${$buttonType === 'purple'
            ? colors.purple[50]
            : colors.gray[70]};
        `
      : css`
          background-color: ${$buttonType === 'purple'
            ? colors.purple[50]
            : $buttonType === 'gray'
              ? colors.gray[70]
              : colors.gray[90]};
          border: none;
          color: ${colors.etc.white};
        `}

  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  ${({ $iconPosition }) =>
    $iconPosition === 'right' &&
    css`
      flex-direction: row-reverse;
    `}

  /* 🔹 "icon" 버튼 스타일 */
  ${({ $buttonType }) =>
    $buttonType === 'icon' &&
    css`
      width: 48px;
      height: 48px;
      border-radius: 8px;
      border: 2px solid ${colors.purple[50]};
      padding: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${colors.etc.white};
      img {
        width: 24px;
        height: 24px;
      }
    `}

  /* 🔹 "forWaitingRoom" 버튼 스타일 */
  ${({ $buttonType }) =>
    $buttonType === 'forWaitingRoom' &&
    css`
      width: 100%;
      border-radius: 8px;
      background-color: ${colors.purple[50]};
      color: ${colors.etc.white};
      font-size: 18px;
      font-weight: 700;
      box-shadow: 0px -4px 16px rgba(0, 0, 0, 0.1);
    `}
`;

export const IconWrapper = styled.span<{ $buttonType?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${({ $buttonType }) => ($buttonType === 'icon' ? '0' : '8px')};
  margin-left: ${({ $buttonType }) => ($buttonType === 'icon' ? '0' : '4px')};

  img {
    width: ${({ $buttonType }) => ($buttonType === 'icon' ? '24px' : '16px')};
    height: ${({ $buttonType }) => ($buttonType === 'icon' ? '24px' : '16px')};
  }
`;

import styled, { css } from 'styled-components';
import colors from '@styles/color/palette';

interface StyledButtonProps {
  $buttonType: 'purple' | 'gray' | 'lightGray';
  $buttonSize: 'small' | 'large';
  $buttonHeight: 'default' | 'short';
  $styleType: 'whiteBackground' | 'coloredBackground';
}

export const StyledButton = styled.button<StyledButtonProps>`
  // buttonHeight default에서 중앙 정렬을 위한 부분
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  border-radius: 4px;
  padding: 16px;
  user-select: none;
  font-size: 16px;

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
          font-weight: 700;
        `
      : css`
          background-color: ${$buttonType === 'purple'
            ? colors.purple[50]
            : $buttonType === 'gray'
              ? colors.gray[70]
              : colors.gray[90]};
          border: none;
          color: ${colors.etc.white};
          font-weight: 700;
        `}

  &:hover {
    opacity: 0.8;
  }
`;

export const IconWrapper = styled.span`
  // 이미지 중앙 정렬을 위한 부분
  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: 8px;
  vertical-align: middle;

  img {
    width: 16px;
    height: 16px;
    display: inline-block;
  }
`;

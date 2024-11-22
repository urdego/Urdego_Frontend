import styled, { css } from 'styled-components';
import colors from '@styles/color/palette';

interface StyledButtonProps {
  $buttonType: 'purple' | 'gray';
  $buttonSize: 'small' | 'large';
  $buttonHeight: 'default' | 'short';
}

export const StyledButton = styled.button<StyledButtonProps>`
  cursor: pointer;
  border-radius: 4px;
  padding: 16px;
  font-weight: 700;
  user-select: none;

  ${({ $buttonType }) =>
    $buttonType === 'purple'
      ? css`
          background-color: ${colors.purple[50]};
          color: white;
          border: none;
          &:hover {
            opacity: 0.8;
          }
        `
      : css`
          background-color: ${colors.gray[70]};
          color: ${colors.etc.white};
          border: none;
          &:hover {
            opacity: 0.8;
          }
        `}

  ${({ $buttonSize }) =>
    $buttonSize === 'small'
      ? css`
          width: 166px;
          font-size: 16px;
        `
      : css`
          width: 100%;
          font-size: 16px;
        `}

    ${({ $buttonHeight }) =>
    $buttonHeight === 'default'
      ? css`
          height: 48px;
        `
      : css`
          height: 40px;
        `}
`;

export const IconWrapper = styled.span`
  margin-right: 8px;
  vertical-align: middle;

  img {
    width: 16px;
    height: 16px;
    display: inline-block;
  }
`;

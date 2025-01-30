import styled, { css } from 'styled-components';
import colors from '@styles/color/palette';

interface StyledButtonProps {
  $buttonType: 'purple' | 'gray' | 'lightGray';
  $buttonSize: 'small' | 'large';
  $buttonHeight: 'default' | 'short' | 'long';
  $styleType: 'whiteBackground' | 'coloredBackground';
  $iconPosition?: 'left' | 'right';
}

export const StyledButton = styled.button<StyledButtonProps>`
  // buttonHeight default에서 중앙 정렬을 위한 부분
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

  transition: 0.5s ease;
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
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  /* 아이콘 위치가 'right'인 경우 아이콘을 오른쪽에 배치(홈 버튼 사용) */
  ${({ $iconPosition }) =>
    $iconPosition === 'right' &&
    css`
      flex-direction: row-reverse;
    `}
`;

export const IconWrapper = styled.span`
  // 이미지 중앙 정렬을 위한 부분
  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: 8px;
  margin-left: 4px; /* 아이콘이 오른쪽일 때 간격 */
  vertical-align: middle;

  img {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    display: inline-block;
  }
`;

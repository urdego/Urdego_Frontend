import styled, { css } from 'styled-components';
import colors from '@styles/color/palette';

interface StyledWButtonProps {
  $buttonType: 'icon' | 'default';
}

export const StyledWButton = styled.button<StyledWButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 700;
  transition: 0.3s ease;
  white-space: nowrap;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  /* 🔹 기본 버튼 (forWaitingRoom) */
  ${({ $buttonType }) =>
    $buttonType === 'default' &&
    css`
      width: 100%;
      height: 48px;
      border-radius: 8px;
      background-color: ${colors.purple[50]};
      color: ${colors.etc.white};
      box-shadow: 0px -4px 16px rgba(0, 0, 0, 0.1);
      border: none;
    `}

  /* 🔹 아이콘 버튼 */
  ${({ $buttonType }) =>
    $buttonType === 'icon' &&
    css`
      width: 48px;
      height: 48px;
      border-radius: 8px;
      background-color: ${colors.etc.white};
      border: 2px solid ${colors.purple[50]};
      padding: 8px;

      img {
        width: 24px;
        height: 24px;
      }
    `}
`;

export const IconWrapper = styled.span<{ $buttonType?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${({ $buttonType }) => ($buttonType === 'icon' ? '0' : '8px')};
  margin-left: ${({ $buttonType }) => ($buttonType === 'icon' ? '0' : '4px')};

  img {
    width: ${({ $buttonType }) => ($buttonType === 'icon' ? '24px' : '20px')};
    height: ${({ $buttonType }) => ($buttonType === 'icon' ? '24px' : '20px')};
  }
`;

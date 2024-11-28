import styled from 'styled-components';
import colors from '@/styles/color/palette';
import { ButtonState } from './InviteButton';

interface ButtonStyledProps {
  $buttonState: ButtonState;
}

export const ButtonStyled = styled.button<ButtonStyledProps>`
  width: 80px;
  height: 46px;
  padding: 12px;
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;

  ${({ $buttonState }) => {
    switch ($buttonState) {
      case 'selected':
        return `
          background-color: ${colors.purple[50]};
          color: ${colors.etc.white};
          border: none;
        `;
      case 'completed':
        return `
          background-color: ${colors.etc.white};
          color: ${colors.etc.black};
          border: 1px solid ${colors.etc.black};
        `;
      default:
        return `
          background-color: ${colors.etc.white};
          color: ${colors.gray[70]};
          border: 1px solid ${colors.gray[70]};
        `;
    }
  }}
`;

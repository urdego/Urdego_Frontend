import styled, { css } from 'styled-components';
import colors from '@/styles/color/palette';

export const InputContainer = styled.div`
  width: 100%;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InputLabel = styled.label`
  font-size: 16px;
  font-weight: 600;
  height: 24px;
  color: ${colors.etc.black};
  display: flex;
  align-items: center;
`;

export const InputWrapper = styled.div`
  width: 100%;
`;

interface StyledInputProps {
  $variant: 'default' | 'readonly';
}

export const StyledInput = styled.input<StyledInputProps>`
  height: 46px;
  width: 100%;
  padding: 12px;
  border: 1px solid ${colors.gray[70]};
  font-weight: 400;
  line-height: 150%;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;

  &::placeholder {
    color: ${colors.gray[70]};
  }

  &:focus {
    outline: none;
  }

  ${(props) =>
    props.$variant === 'readonly' &&
    css`
      border: 1px solid ${colors.gray[70]};
      background-color: ${colors.gray[95]};
      cursor: default;

      &::placeholder {
        color: ${colors.gray[70]};
      }
    `}
`;

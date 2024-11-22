import styled from 'styled-components';
import colors from '@styles/color/palette';

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  font-family: Arial, sans-serif;
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 16px;
  height: 16px;
  margin-right: 8px;
  cursor: pointer;
  accent-color: ${colors.gray[50]};
  border: 1px solid ${colors.gray[50]};

  &:checked {
    background-color: ${colors.gray[50]};
    border-color: ${colors.gray[50]};
  }
`;

export const Label = styled.label`
  font-size: 14px;
  color: ${colors.gray[50]};
`;

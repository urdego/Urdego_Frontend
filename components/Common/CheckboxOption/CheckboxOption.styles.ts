import styled from 'styled-components';

interface SizeProps {
  size?: 'default' | 'big';
}

export const CheckboxOptionWrapper = styled.div<SizeProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: ${({ size }) => (size === 'big' ? '16px' : '14px')};
`;

export const Checkbox = styled.div<SizeProps>`
  width: ${({ size }) => (size === 'big' ? '24px' : '20px')};
  height: ${({ size }) => (size === 'big' ? '24px' : '20px')};
  display: flex;
  align-items: center;
  justify-content: center;
`;

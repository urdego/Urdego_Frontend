import styled from 'styled-components';
import colors from '@/styles/color/palette';

export const PButton = styled.button`
  width: 100%;
  padding: 10px 10px;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  border-radius: 4px;
  border: 1px solid ${colors.gray[80]};
  background-color: white;
  cursor: pointer;

  &:disabled {
    border-color: #e0e0e0;
    background-color: #f9f9f9;
    color: #b0b0b0;
    cursor: not-allowed;
  }
`;

import styled from 'styled-components';
import colors from '@/styles/color/palette';

export const SButton = styled.button`
  width: 166px;
  padding: 12px 16px;
  font-size: 12px;
  text-align: center;
  border-radius: 4px;
  border: 1px solid ${colors.gray[80]};
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5; /* 호버 효과 예시 */
  }

  &:active {
    background-color: #e0e0e0; /* 클릭 시 효과 예시 */
  }

  &:disabled {
    border-color: #e0e0e0;
    background-color: #f9f9f9;
    color: #b0b0b0;
    cursor: not-allowed;
  }
`;

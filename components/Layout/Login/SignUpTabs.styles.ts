import styled from 'styled-components';
import colors from '@styles/color/palette';

export const TabContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const TabDivider = styled.div`
  width: 1px;
  height: 24px;
  background-color: ${colors.gray[90]};
`;

export const TabItem = styled.button`
  padding: 10px;
  border: none;
  background: none;
  font-size: 14px;
  color: ${colors.etc.black};
  cursor: pointer;

  &:hover {
    color: ${colors.gray[50]};
  }

  &:focus {
    outline: none;
  }
`;

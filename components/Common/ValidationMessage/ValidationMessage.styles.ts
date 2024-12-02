import styled from 'styled-components';
import colors from '@styles/color/palette';

export const StyledMessage = styled.div<{ type: 'success' | 'error' }>`
  padding-top: 4px;
  color: ${({ type }) =>
    type === 'success' ? colors.etc.green : colors.alert[50]};
  font-size: 12px;
  margin: 0;
`;

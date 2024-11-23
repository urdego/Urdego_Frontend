import colors from '@styles/color/palette';
import styled from 'styled-components';

export const PlaceSearchButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  border-radius: 4px;
  border: 1px solid ${colors.gray[70]};
  padding: 12px;
`;

export const PlaceSearchText = styled.div`
  color: ${colors.gray[70]};
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
`;

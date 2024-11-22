import colors from '@/styles/color/palette';
import styled from 'styled-components';

export const PlaceRegisterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 12px 0;
`;

export const PlaceRegistertext = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: ${colors.etc.black};
  font-size: 16px;
  font-weight: 700;
  line-height: 150%;
`;

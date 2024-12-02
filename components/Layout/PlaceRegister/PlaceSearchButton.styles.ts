import colors from '@styles/color/palette';
import styled from 'styled-components';

export const PlaceSearchButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  border-radius: 4px;
  border: 1px solid ${colors.gray[70]};
  padding: 12px;
  cursor: pointer;
`;

export const PlaceTexthButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  border-radius: 4px;
  border: 1px solid ${colors.gray[70]};
  padding: 12px;
`;

export const PlaceResetButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const LocationRegisterText = styled.div`
  color: ${colors.gray[70]};
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
`;

export const LocationText = styled.div`
  color: ${colors.etc.black};
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
`;

import colors from '@/styles/color/palette';
import styled from 'styled-components';

export const LocationListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

export const LocationImageContainer = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
  img {
    border-radius: 4px;
  }
`;

export const LocationContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LocationTitle = styled.div`
  color: ${colors.etc.black};
  font-size: 14px;
  font-weight: 700;
  line-height: 150%;
`;

export const LocationDetail = styled.div`
  color: ${colors.etc.black};
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
`;

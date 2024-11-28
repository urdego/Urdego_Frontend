import colors from '@/styles/color/palette';
import styled from 'styled-components';

export const PlaceRegisterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 0;
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

export const PlaceContentResetButton = styled.div`
  cursor: pointer;
`;

export const PlacePreview = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

export const PreviewImage = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  overflow: hidden;
  img {
    border-radius: 4px;
  }
`;

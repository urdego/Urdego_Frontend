import styled from 'styled-components';

export const PlacePreviewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

export const PreviewImage = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  img {
    border-radius: 8px;
  }
`;

export const PreviewImageRemoveButton = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  z-index: 10;
  cursor: pointer;
`;

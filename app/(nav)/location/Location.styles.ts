import styled from 'styled-components';

export const LocationLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const LocationHeader = styled.div`
  display: flex;
  flex-direction: row;
`;

export const LocationContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

export const NoContentText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40vh;
  font-size: 14px;
`;

export const IntersectionObserverArea = styled.div`
  width: 100%;
  min-height: 100px;
  visibility: hidden;
`;

import styled from 'styled-components';

export const ContentHeader = styled.div`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 88vh; //TODO 데이터 존재할 때 높이 확인 필요
  gap: 12px;
  font-size: 14px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
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

export const LoadingText = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  min-height: 40px;
  font-size: 16px;
`;

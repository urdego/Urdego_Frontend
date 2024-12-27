import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  bottom: 12px;
  left: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: left;
  width: 100%;
`;

export const LevelText = styled.div`
  font-size: 12px;
  font-weight: regular;
  padding-right: 4px;
`;

export const UserName = styled.div`
  font-size: 12px;
  font-weight: bold;
`;

export const ProgressBarContainer = styled.div`
  width: 192px;
  background-color: #c6c6c7;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 4px;
`;

export const ProgressBar = styled.div<{ $progress: number }>`
  position: relative;
  height: 10px;
  background-color: #947dff;
  border-radius: 4px;
  width: 0;
  animation: fillProgress 1s ease-out forwards;

  @keyframes fillProgress {
    from {
      width: 0;
    }
    to {
      width: ${(props) => props.$progress}%;
    }
  }
`;

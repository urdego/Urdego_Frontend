import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
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
  background-color: #C6C6C7;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 4px;
`;

export const ProgressBar = styled.div<{ progress: number }>`
  width: ${({ progress }) => `${progress}%`}; 
  height: 10px;
  background-color: #947DFF;
  transition: width 0.3s ease;
`;

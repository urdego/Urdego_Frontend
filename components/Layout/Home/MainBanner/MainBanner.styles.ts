import styled from 'styled-components';

export const BannerWrapper = styled.div`
  position: absolute;
  top: 0;
  width: 430px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top:280px; */
  height: 280px;
  background-color: #f4eeff;
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 8px;
  right: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export const LevelWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
`;


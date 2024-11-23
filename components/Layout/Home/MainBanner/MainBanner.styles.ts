import styled from 'styled-components';

export const BannerWrapper = styled.div`
  position: relative;
  top: 0;
  width: calc(100% + 46px);
  left: 0;
  transform: translateX(-23px);
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
  right: 32px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export const LevelWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
`;


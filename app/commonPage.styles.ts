import styled from 'styled-components';
import BackgroundImage from '@styles/Image/WaitingRoom/BackgroundImageL.png';

export const PageWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 40px);
  padding: 0 16px 199px 16px;
`;

export const HomePageWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 40px);
  padding: 0 0 80px 0;
  background: linear-gradient(180deg, #fff 10%, #cabeff 100%);
`;

export const WaitingRoomListPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 40px);
  padding: 0 16px 100px 16px;
  background-image: url(${BackgroundImage.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
`;

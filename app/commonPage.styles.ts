import styled from 'styled-components';
import BackgroundImage from '@styles/Image/WaitingRoomList/Background_FullHill.png';
import colors from '@/styles/color/palette';

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
  /* background-color: ${colors.purple[90]}; */
`;

export const WaitingRoomListPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 40px);
  padding: 0 16px 100px 16px;
  background-color: rgba(202, 228, 255, 1);
  background-image: url(${BackgroundImage.src});
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: center bottom;
  background-attachment: fixed;

  @media screen and (min-width: 430px) {
    background-size: 430px auto;
  }
`;

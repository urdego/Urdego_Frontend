'use client';
import TopBar from '@/components/Common/TopBar/TopBar';
import { MainBanner } from '@/components/Layout/Home/MainBanner/MainBanner';

import RoomButton from '@/components/Common/RoomButton/RoomButton';
import ChannelButton from '@/components/Layout/Home/ChannelButton/ChannelButton';
import LoactionButton from '@/components/Layout/Home/LocationButton/LocationButton';
import { HomeWrapper } from './Home.styles';

const Home = () => {
  return (
    <div>
      <TopBar NavType="main" />
      <MainBanner />
      <HomeWrapper>
        <h1>Home</h1>
        <RoomButton
          title="방제목"
          hostUser="유저명"
          groupMemberCount={3}
          maxMemberCount={8}
        />
        <LoactionButton title="올린 장소" count={999} />
        <ChannelButton title="그룹 게임" />
        <ChannelButton title="랭킹 게임" />
      </HomeWrapper>
    </div>
  );
};

export default Home;

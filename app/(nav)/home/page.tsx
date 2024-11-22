"use client"
import TopBar from "@/components/Common/TopBar/TopBar";
import { MainBanner } from "@/components/Layout/MainBanner/MainBanner";

import RoomButton from '@/components/Common/RoomButton/RoomButton';
import ChannelButton from '@/components/Layout/Home/ChannelButton/ChannelButton';
import LoactionButton from '@/components/Layout/Home/LocationButton/LocationButton';

const Home = () => {
  return (
    <>
      <TopBar NavType="main"/>
      <MainBanner/>
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

    </>
  );
};

export default Home;
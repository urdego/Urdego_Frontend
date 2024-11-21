'use client';

import RoomButton from '@/components/Common/RoomButton/RoomButton';
import Channel from '@/components/Layout/Home/ChannelButton/ChannelButton';
import Loaction from '@/components/Layout/Home/LocationButton/LocationButton';

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <RoomButton
        title="방제목"
        userName="유저명"
        currCount={0}
        totalCount={0}
      />
      <Loaction title="올린 장소" count={999} />
      <Channel title="게임1" />
      <Channel title="게임2" height="short" />
    </div>
  );
};

export default Home;

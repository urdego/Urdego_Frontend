'use client';

import Channel from '@/components/Layout/Home/Channel/Channel';
import Loaction from '@/components/Layout/Home/Location/Location';

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Loaction title="올린 장소" count={999} />
      <Channel title="게임1" />
      <Channel title="게임2" height="short" />
    </div>
  );
};

export default Home;

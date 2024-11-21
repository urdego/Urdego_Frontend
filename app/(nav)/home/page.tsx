'use client';

import Channel from '@/components/Layout/Home/Channel/Channel';

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Channel title="게임1" />
      <Channel title="게임2" height="short" background="gray" />
    </div>
  );
};

export default Home;

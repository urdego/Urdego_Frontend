'use client';
import Link from 'next/link';
import TopBar from '@/components/Common/TopBar/TopBar';
import { MainBanner } from '@/components/Layout/Home/MainBanner/MainBanner';
import ChannelButton from '@/components/Layout/Home/ChannelButton/ChannelButton';
import { HomeTitle,ChannelWrapper} from './Home.styles';
import { MainTopWrapper } from './../../commonPage.styles';

const Home = () => {
  return (
    <>
      <TopBar NavType="main" />
      <MainTopWrapper>
        <MainBanner />
        <HomeTitle>게임채널</HomeTitle>
        <ChannelWrapper>
          <Link href="/groupList">
            <ChannelButton title="그룹 게임" />
          </Link>
          <ChannelButton title="랭킹 게임" />
        </ChannelWrapper>
      </MainTopWrapper>
    </>
  );
};

export default Home;

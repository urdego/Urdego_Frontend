'use client';
import Link from 'next/link';
import TopBar from '@/components/Common/TopBar/TopBar';
import { MainBanner } from '@/components/Layout/Home/MainBanner/MainBanner';
import ChannelButton from '@/components/Layout/Home/ChannelButton/ChannelButton';
import { HomeTitle, ChannelWrapper, Button } from './Home.styles';
import { HomePageWrapper } from '@/app/commonPage.styles';
import { InviteToast } from '@/components/Layout/Home/InviteToast/InviteToast';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const hostName = '어데고';
const gameId = '1';

const Home = () => {
  const router = useRouter();

  const showInviteToast = () => {
    toast.custom(
      (t) => (
        <InviteToast
          message={`${hostName}님이 당신을 초대했습니다. 수락하시겠습니까?`}
          onAccept={() => {
            router.push(`/game/${gameId}/waitingRoom`);
          }}
          onReject={() => {
            console.log('거절됨');
          }}
          toastId={t.id}
        />
      ),
      { position: 'top-center', duration: Infinity } // TODO: toast 시간  UI에 활용하기
    );
  };
  return (
    <>
      <TopBar NavType="main" />
      <HomePageWrapper>
        <MainBanner />
        <ChannelWrapper>
          <HomeTitle>게임채널</HomeTitle>
          <Link href="/groupList">
            <ChannelButton title="그룹 게임" />
          </Link>
          <ChannelButton title="랭킹 게임" />
        </ChannelWrapper>
        {/* 임시 초대 토스트 보기 버튼 */}
        <Button onClick={showInviteToast}>초대 토스트 보기</Button>
      </HomePageWrapper>
    </>
  );
};

export default Home;

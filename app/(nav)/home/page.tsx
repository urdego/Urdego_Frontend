'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import TopBar from '@/components/Common/TopBar/TopBar';
import { MainBanner } from '@/components/Layout/Home/MainBanner/MainBanner';
import ChannelButton from '@/components/Layout/Home/ChannelButton/ChannelButton';
import { HomeTitle, ChannelWrapper } from './Home.styles';
import { HomePageWrapper } from '@/app/commonPage.styles';
import useSSEStore from '@/stores/useSSEStore';
import { toast } from 'react-hot-toast';
import type { NotificationMessage } from '@/lib/types/notification';

const Home = () => {
  const { eventSource } = useSSEStore();

  useEffect(() => {
    if (!eventSource) return;

    const messageHandler = (event: MessageEvent) => {
      try {
        const notification: NotificationMessage = JSON.parse(event.data);
        const message = `${notification.groupName}에서 ${notification.senderNickName}님이 ${notification.targetNickName}님을 ${notification.action}`;

        toast(message, {
          duration: 3000,
          position: 'bottom-center',
          style: {
            background: '#ffffff',
            color: '#000000',
            fontSize: '14px',
            padding: '12px 20px',
            borderRadius: '4px',
            maxWidth: '280px',
          },
        });
      } catch (error) {
        console.error('Failed to parse SSE message:', error);
      }
    };

    eventSource.onmessage = messageHandler;

    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      eventSource.onmessage = null;
    };
  }, [eventSource]);

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
      </HomePageWrapper>
      <MainBanner />
      <HomeTitle>게임채널</HomeTitle>
      <ChannelWrapper>
        <Link href="/groupList">
          <ChannelButton title="그룹 게임" />
        </Link>
        <ChannelButton title="랭킹 게임" />
      </ChannelWrapper>
    </>
  );
};

export default Home;

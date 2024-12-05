// src/app/home/page.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/Common/TopBar/TopBar';
import { MainBanner } from '@/components/Layout/Home/MainBanner/MainBanner';
import ChannelButton from '@/components/Layout/Home/ChannelButton/ChannelButton';
import { HomeTitle, ChannelWrapper } from './Home.styles';
import { HomePageWrapper } from '@/app/commonPage.styles';
import useSSEStore from '@/stores/useSSEStore';
import useUserStore from '@/stores/useUserStore';
import { toast } from 'react-hot-toast';
import type { NotificationMessage } from '@/lib/types/notification';

interface InviteToastProps {
  message: string;
  onAccept: () => void;
  onReject: () => void;
  toastId: string;
}

const InviteToast = ({ message, onAccept, onReject }: InviteToastProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm w-full mx-auto">
      <p className="text-gray-800 mb-4">{message}</p>
      <div className="flex justify-end space-x-2">
        <button
          onClick={onReject}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          거절
        </button>
        <button
          onClick={onAccept}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          수락
        </button>
      </div>
    </div>
  );
};

const connectSSE = (userId: string) => {
  const { setEventSource } = useSSEStore.getState();
  let retryCount = 0;
  const MAX_RETRIES = 3;

  const connect = () => {
    try {
      const url = `/api/notification-service/connect/${encodeURIComponent(userId)}`;
      console.log('SSE 연결 시도:', url);

      const eventSource = new EventSource(url, {
        withCredentials: true,
      });

      eventSource.onopen = () => {
        console.log('SSE 연결 성공');
        console.log('연결 상태:', {
          readyState: eventSource.readyState,
          url: eventSource.url,
        });
        retryCount = 0;
      };

      eventSource.onerror = (error) => {
        console.error('SSE 연결 에러:', error);

        if (eventSource.readyState === EventSource.CLOSED) {
          eventSource.close();
          setEventSource(null);

          if (retryCount < MAX_RETRIES) {
            retryCount++;
            const delay = Math.min(1000 * Math.pow(2, retryCount), 10000);
            console.log(
              `재연결 시도 ${retryCount}/${MAX_RETRIES} (${delay / 1000}초 후)`
            );
            setTimeout(connect, delay);
          } else {
            console.error('최대 재시도 횟수 도달');
            toast.error('실시간 알림 연결에 실패했습니다');
          }
        }
      };

      eventSource.onmessage = (event) => {
        console.log('hello this is event');
        console.log('SSE 메시지 수신:', event.data);
      };

      setEventSource(eventSource);
      return eventSource;
    } catch (error) {
      console.error('SSE 초기화 실패:', error);
      return null;
    }
  };

  return connect();
};

const Home = () => {
  const router = useRouter();
  const { email } = useUserStore();
  const { eventSource, setEventSource } = useSSEStore();

  // SSE 연결 설정
  useEffect(() => {
    if (!email || eventSource) return;

    const newEventSource = connectSSE(email);

    return () => {
      if (newEventSource) {
        console.log('SSE 연결 정리');
        newEventSource.close();
        setEventSource(null);
      }
    };
  }, [email, eventSource, setEventSource]);

  // SSE 메시지 처리
  useEffect(() => {
    if (!eventSource) return;

    const handleInvitation = (notification: NotificationMessage) => {
      toast.custom(
        (t) => (
          <InviteToast
            message={`${notification.groupName}에서 ${notification.senderNickName}님이 ${notification.action}`}
            onAccept={() => {
              // 수락 처리 API 호출
              router.push(`/group/${notification.groupId}`);
              toast.dismiss(t.id);
            }}
            onReject={() => {
              // 거절 처리 API 호출
              toast.dismiss(t.id);
            }}
            toastId={t.id}
          />
        ),
        {
          position: 'top-center',
          duration: 30000,
        }
      );
    };

    const messageHandler = (event: MessageEvent) => {
      try {
        const notification: NotificationMessage = JSON.parse(event.data);
        console.log('SSE 메시지 수신:', notification);

        // action에 따른 처리
        if (notification.action.includes('초대')) {
          handleInvitation(notification);
        } else {
          // 다른 종류의 알림 처리
          toast(
            `${notification.groupName}에서 ${notification.senderNickName}님이 ${notification.action}`,
            {
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
            }
          );
        }
      } catch (error) {
        console.error('SSE 메시지 파싱 에러:', error);
      }
    };

    eventSource.onmessage = messageHandler;

    return () => {
      eventSource.onmessage = null;
    };
  }, [eventSource, router]);

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
    </>
  );
};

export default Home;

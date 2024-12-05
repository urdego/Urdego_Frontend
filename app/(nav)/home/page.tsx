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
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

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

const handleRegularNotification = (notification: NotificationMessage) => {
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
};

const handleInvitation = (
  notification: NotificationMessage,
  router: AppRouterInstance
) => {
  toast.custom(
    (t) => (
      <InviteToast
        message={`${notification.groupName}에서 ${notification.senderNickName}님이 ${notification.action}`}
        onAccept={() => {
          router.push(`/game/${notification.groupId}/waitingRoom`);
          toast.dismiss(t.id);
        }}
        onReject={() => {
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

const connectSSE = (userId: string) => {
  const { setEventSource } = useSSEStore.getState();
  let retryCount = 0;
  const MAX_RETRIES = 3;
  let retryTimeout: NodeJS.Timeout;

  const connect = () => {
    try {
      const url = `/api/notification-service/connect/${encodeURIComponent(userId)}`;
      console.log('SSE 연결 시도:', url);

      const eventSource = new EventSource(url, {
        withCredentials: true,
      });

      eventSource.onopen = () => {
        console.log('SSE 연결 성공');
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

            clearTimeout(retryTimeout);
            retryTimeout = setTimeout(connect, delay);
          } else {
            console.error('최대 재시도 횟수 도달');
            toast.error('실시간 알림 연결에 실패했습니다');
          }
        }
      };

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

  useEffect(() => {
    let mounted = true;

    const initializeSSE = async () => {
      if (!email || eventSource) return;

      try {
        const newEventSource = connectSSE(email);

        if (!mounted) {
          newEventSource?.close();
          return;
        }

        if (newEventSource) {
          newEventSource.onmessage = (event) => {
            try {
              if (
                event.data === 'Connect to notification service' ||
                event.data.includes('event:Connect')
              ) {
                console.log('SSE 연결 확인:', event.data);
                return;
              }

              if (event.data.startsWith('event:notification')) {
                const jsonStr = event.data
                  .replace('event:notification', '')
                  .trim();
                const notification: NotificationMessage = JSON.parse(jsonStr);

                if (notification.action?.includes('초대')) {
                  handleInvitation(notification, router);
                } else {
                  handleRegularNotification(notification);
                }
              }
            } catch (error) {
              console.error('SSE 메시지 처리 중 에러:', error);
            }
          };
        }
      } catch (error) {
        console.error('SSE 초기화 실패:', error);
      }
    };

    initializeSSE();

    return () => {
      mounted = false;
      if (eventSource) {
        console.log('SSE 연결 정리');
        eventSource.close();
        setEventSource(null);
      }
    };
  }, [email]);

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

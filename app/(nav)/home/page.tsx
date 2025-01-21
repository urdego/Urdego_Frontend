'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/Common/TopBar/TopBar';
import { MainBanner } from '@/components/Layout/Home/MainBanner/MainBanner';
import ChannelButton from '@/components/Layout/Home/ChannelButton/ChannelButton';
import { HomeTitle, ChannelWrapper } from './Home.styles';
import { HomePageWrapper } from '@/app/commonPage.styles';

import useSSEStore from '@/stores/useSSEStore';
import useUserStore from '@/stores/useUserStore';
import type { NotificationMessage } from '@/lib/types/notification';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import useWebSocketStore from '@/stores/useWebSocketStore';
import WaitingRoomWebSocket from '@/lib/websocket/waittingRoomWebsocket';

import { toast } from 'react-hot-toast';
import LocationListBottomSheet from '@/components/Common/BottomSheet/LocationListBottomSheet';
import { InviteToast } from '@/components/Layout/Home/InviteToast/InviteToast';

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
//   notification: NotificationMessage,
//   router: AppRouterInstance,
//   addMessageFn: (message: any) => void
// ) => {
//   toast.custom(
//     (t) => (
//       <InviteToast
//         message={`${notification.groupName}에서 ${notification.senderNickName}님이 ${notification.action}`}
//         onAccept={async () => {
//           const stompClient = new Client({
//             brokerURL: `${process.env.NEXT_PUBLIC_GROUP_WS_URL}/group-service/connect`,
//           });

//           // 연결 시도 전에 이벤트 핸들러 설정
//           stompClient.onConnect = () => {
//             console.log('WebSocket 연결 성공');

//             // 구독 설정
//             const subscription = stompClient.subscribe(
//               `${process.env.NEXT_PUBLIC_GROUP_SUBSCRIBE}/${notification.groupId}`,
//               (message: { body: string }) => {
//                 console.log('Received message:', message.body);
//                 const parsedMessage = JSON.parse(message.body);
//                 addMessageFn({
//                   ...parsedMessage,
//                   timestamp: Date.now(),
//                 });
//               }
//             );
//             console.log('구독 설정 완료');
//           };

//           stompClient.onConnect = () => {
//             stompClient.subscribe(
//               `${process.env.NEXT_PUBLIC_GROUP_SUBSCRIBE}/${notification.groupId}`,
//               (message: { body: string }) => {
//                 console.log('Received message:', message.body);
//                 const parsedMessage = JSON.parse(message.body);
//                 addMessageFn({
//                   ...parsedMessage,
//                   timestamp: Date.now(),
//                 });
//               }
//             );
//           };
//           stompClient.activate();
//           router.push(`/game/${notification.groupId}/waitingRoom`);
//           toast.dismiss(t.id);
//         }}
//         onReject={() => {
//           toast.dismiss(t.id);
//         }}
//         toastId={t.id}
//       />
//     ),
//     {
//       position: 'top-center',
//       duration: 30000,
//     }
//   );
// };
// ... existing code ...

const handleInvitation = (
  notification: NotificationMessage,
  router: AppRouterInstance
) => {
  toast.custom(
    (t) => (
      <InviteToast
        message={`${notification.groupName}에서 ${notification.senderNickName}님이 ${notification.action}`}
        onAccept={async () => {
          const wsClient = WaitingRoomWebSocket.getInstance();
          try {
            await wsClient.connect(notification.groupId, false); // false for MEMBER role
            router.push(`/game/${notification.groupId}/waitingRoom`);
            toast.dismiss(t.id);
          } catch (error) {
            console.error('WebSocket 연결 실패:', error);
            toast.error('연결에 실패했습니다.');
          }
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

const connectSSE = (userId: number) => {
  const { setEventSource } = useSSEStore.getState();
  // let retryCount = 0;
  // const MAX_RETRIES = 3;
  // let retryTimeout: NodeJS.Timeout;

  try {
    const url = `/api/notification-service/connect/${encodeURIComponent(userId)}`;
    console.log('SSE 연결 시도:', url);

    const eventSource = new EventSource(url, {
      withCredentials: true,
    });

    eventSource.onopen = () => {
      console.log('SSE 연결 성공');
    };

    eventSource.onerror = (error) => {
      console.error('SSE 연결 에러:', error);
      if (eventSource.readyState === EventSource.CLOSED) {
        eventSource.close();
        setEventSource(null);
        toast.error('실시간 알림 연결이 끊어졌습니다');
      }
    };

    return eventSource;
  } catch (error) {
    console.error('SSE 초기화 실패:', error);
    return null;
  }
};

const Home = () => {
  const router = useRouter();
  const { userId } = useUserStore();
  const { eventSource, setEventSource } = useSSEStore();
  const addMessage = useWebSocketStore((state) => state.addMessage);

  useEffect(() => {
    let mounted = true;

    const initializeSSE = async () => {
      if (!userId || eventSource) return;

      try {
        const newEventSource = connectSSE(userId);

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
  }, [userId, eventSource, router, setEventSource, addMessage]);

  const [isLocationListVisible, setLocationListVisible] = useState(false);

  return (
    <>
      <TopBar NavType="main" />
      <HomePageWrapper>
        <MainBanner setLocationListVisible={setLocationListVisible} />
        <ChannelWrapper>
          <HomeTitle>게임채널</HomeTitle>
          <Link href="/groupList">
            <ChannelButton title="그룹 게임" />
          </Link>
          <ChannelButton title="랭킹 게임" />
        </ChannelWrapper>
        {isLocationListVisible && (
          <LocationListBottomSheet
            setLocationListVisible={setLocationListVisible}
          />
        )}
      </HomePageWrapper>
    </>
  );
};

export default Home;

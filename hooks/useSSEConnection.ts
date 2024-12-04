import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import useSSEStore from '@/stores/useSSEStore';
import { API_BASE_URL } from '@/config/apiEndPointConfig';

interface SSEConfig {
  userId: string;
  maxRetries?: number;
  initialRetryDelay?: number;
  maxRetryDelay?: number;
}

export const useSSEConnection = ({
  userId,
  maxRetries = 3,
  initialRetryDelay = 1000,
  maxRetryDelay = 10000,
}: SSEConfig) => {
  const { setEventSource } = useSSEStore();
  const retryCount = useRef(0);
  const eventSourceRef = useRef<EventSource | null>(null);
  const router = useRouter();

  const connect = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    try {
      // API URL 설정 - environment에 따라 다른 URL 사용
      const baseUrl =
        process.env.NODE_ENV === 'development'
          ? `${window.location.protocol}//${window.location.host}`
          : API_BASE_URL.NOTIFICATION;

      const sseUrl = `${baseUrl}/api/notification/sse/${userId}`;

      const eventSource = new EventSource(sseUrl, {
        withCredentials: true,
      });

      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        console.log('SSE connection established');
        retryCount.current = 0;
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          // 메시지 처리 로직
          console.log('Received SSE message:', data);
        } catch (error) {
          console.error('Error parsing SSE message:', error);
        }
      };

      eventSource.onerror = (error) => {
        console.error('SSE connection error:', error);

        if (eventSource.readyState === EventSource.CLOSED) {
          eventSource.close();
          setEventSource(null);

          // 401 에러 처리 - 로그인 페이지로 리다이렉트
          if ((error as any)?.status === 401) {
            toast.error('세션이 만료되었습니다. 다시 로그인해주세요.');
            router.push('/login');
            return;
          }

          if (retryCount.current < maxRetries) {
            retryCount.current++;
            const delay = Math.min(
              initialRetryDelay * Math.pow(2, retryCount.current),
              maxRetryDelay
            );

            console.log(
              `Attempting reconnection in ${delay / 1000} seconds...`
            );
            setTimeout(connect, delay);
          } else {
            console.error('Max retry attempts reached for SSE connection');
            toast.error(
              '실시간 알림 연결에 실패했습니다. 페이지를 새로고침 해주세요.',
              { duration: 5000 }
            );
          }
        }
      };

      setEventSource(eventSource);
    } catch (error) {
      console.error('Failed to initialize SSE:', error);
      toast.error('실시간 알림 연결에 실패했습니다.');
    }
  };

  useEffect(() => {
    connect();

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        setEventSource(null);
      }
    };
  }, [userId]);
};

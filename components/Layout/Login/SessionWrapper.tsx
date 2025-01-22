'use client';
import { SessionProvider, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import useUserStore from '@/stores/useUserStore';

// 세션 데이터로 store 업데이트하는 컴포넌트
function SessionStoreUpdater() {
  const { data: session } = useSession();
  const { setUserId, setNickname } = useUserStore();

  useEffect(() => {
    if (session?.user?.userId) {
      setUserId(session.user.userId);
      setNickname(session.user.nickname ?? '');
    }
  }, [session, setUserId, setNickname]);

  return null;
}

const SessionWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <SessionStoreUpdater />
      {children}
    </SessionProvider>
  );
};

export default SessionWrapper;

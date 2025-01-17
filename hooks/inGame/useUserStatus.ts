import useWebSocketStore from '@/stores/useWebSocketStore';
import useUserStore from '@/stores/useUserStore';

export const useUserStatus = () => {
  const { users } = useWebSocketStore();
  const nickname = useUserStore((state) => state.nickname);

  const currentUser = users.find((user) => user.name === nickname);
  const isManager = currentUser?.role === 'MANAGER';
  const allPlayersReady = users.every(
    (user) => user.role === 'MANAGER' || user.isReady
  );

  return {
    currentUser,
    isManager,
    allPlayersReady,
    users,
  };
};

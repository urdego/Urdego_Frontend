import { WaitingRoomList } from '@/hooks/waitingRoomList/useGetWaitingRoomList';
import RoomButton from './RoomButton';
import { useRouter } from 'next/navigation';
import useGameStore from '@/stores/useGameStore';

const RoomButtonList = ({
  waitingRoomList,
}: {
  waitingRoomList: WaitingRoomList[] | null;
}) => {
  const router = useRouter();
  const { setRoomId } = useGameStore();

  // 방 이동 함수
  const handleRoomClick = (roomId: string) => {
    setRoomId(roomId);
    router.push(`game/${roomId}/waitingRoom`);
  };

  return (
    <>
      {waitingRoomList &&
        waitingRoomList.map((item, index) => (
          <RoomButton
            key={`key${index}`}
            hostType={item.hostInfo.activeCharacter}
            title={item.roomName}
            round={item.totalRounds}
            currMemberCount={item.currentPlayersCount}
            maxMemberCount={item.maxPlayers}
            onClick={() => handleRoomClick(item.roomId)}
          />
        ))}
    </>
  );
};

export default RoomButtonList;

import { WaitingRoomList } from '@/hooks/waitingRoomList/useGetWaitingRoomList';
import RoomButton from './RoomButton';
import { useRouter } from 'next/navigation';

const RoomButtonList = ({
  waitingRoomList,
}: {
  waitingRoomList: WaitingRoomList[] | null;
}) => {
  const router = useRouter();

  // 방 이동 함수
  const handleRoomClick = (roomId: string) => {
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

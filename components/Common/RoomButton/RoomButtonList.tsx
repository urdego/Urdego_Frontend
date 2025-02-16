import { WaitingRoomList } from '@/hooks/waitingRoomList/useGetWaitingRoomList';
import RoomButton from './RoomButton';

const RoomButtonList = ({
  waitingRoomList,
}: {
  waitingRoomList: WaitingRoomList[] | null;
}) => {
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
          />
        ))}
    </>
  );
};

export default RoomButtonList;

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
            hostType={'basic'}
            title={item.roomName}
            round={item.totalRounds}
            currMemberCount={item.currentPlayersCount}
            maxMemberCount={item.maxPlayer}
          />
        ))}
    </>
  );
};

export default RoomButtonList;

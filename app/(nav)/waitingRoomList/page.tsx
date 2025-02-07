'use client';

import TopBar from '@/components/Common/TopBar/TopBar';
import RoomButton from '@/components/Common/RoomButton/RoomButton';
import { WaitingRoomListPageWrapper } from '@/app/commonPage.styles';
import { RoomButtonGrid, ListTitle, SubTitle } from './waitingRoomList.styles';
import { RefreshIcon } from '@/components/Common/RoomButton/WaitingRoomListIcon';
import { useEffect } from 'react';
import useGetWaitingRoomList from '@/hooks/waitingRoomList/useGetWaitingRoomList';

const WaitingRoomList = () => {
  const { waitingRoomList, fetchWaitingRoomList } = useGetWaitingRoomList();
  useEffect(() => {
    const handleWaitingRoomList = async () => {
      await fetchWaitingRoomList();
    };
    handleWaitingRoomList();
  }, []);

  const roomButtons = waitingRoomList?.map((item, index) => (
    <RoomButton
      key={`key${index}`}
      hostType={'basic'}
      title={item.roomName}
      round={item.totalRounds}
      currMemberCount={item.currentPlayersCount}
      maxMemberCount={item.maxPlayer}
    />
  ));

  return (
    <>
      <TopBar NavType="default" label="대기방" />
      <WaitingRoomListPageWrapper>
        <SubTitle>
          <ListTitle>참여 가능한 방</ListTitle>
          <RefreshIcon onClick={fetchWaitingRoomList} />
        </SubTitle>
        <RoomButtonGrid>{roomButtons}</RoomButtonGrid>
      </WaitingRoomListPageWrapper>
    </>
  );
};

export default WaitingRoomList;

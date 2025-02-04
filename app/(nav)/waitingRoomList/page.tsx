'use client';

import TopBar from '@/components/Common/TopBar/TopBar';
import RoomButton from '@/components/Common/RoomButton/RoomButton';
import { WaitingRoomListPageWrapper } from '@/app/commonPage.styles';
import { RoomButtonGrid, ListTitle, SubTitle } from './waitingRoomList.styles';
import { RefreshIcon } from '@/components/Common/RoomButton/WaitingRoomListIcon';

const WaitingRoomList = () => {
  const roomButtons = Array.from({ length: 20 }, (_, index) => (
    <RoomButton
      key={`key${index}`}
      hostType={'basic'}
      title={`방제목 ${index + 1}`}
      round={1}
      currMemberCount={3}
      maxMemberCount={8}
    />
  ));

  return (
    <>
      <TopBar NavType="default" label="대기방" />
      <WaitingRoomListPageWrapper>
        <SubTitle>
          <ListTitle>참여 가능한 방</ListTitle>
          <RefreshIcon onClick={() => alert('OK')} />
        </SubTitle>
        <RoomButtonGrid>{roomButtons}</RoomButtonGrid>
      </WaitingRoomListPageWrapper>
    </>
  );
};

export default WaitingRoomList;

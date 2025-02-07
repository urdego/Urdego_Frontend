'use client';

import TopBar from '@/components/Common/TopBar/TopBar';
import { WaitingRoomListPageWrapper } from '@/app/commonPage.styles';
import { RoomButtonGrid, ListTitle, SubTitle } from './waitingRoomList.styles';
import { RefreshIcon } from '@/components/Common/RoomButton/WaitingRoomListIcon';
import useGetWaitingRoomList from '@/hooks/waitingRoomList/useGetWaitingRoomList';
import DotLoadingSpinner from '@/components/Common/LoadingSpinner/DotLoadingSpinner';
import RoomButtonList from '@/components/Common/RoomButton/RoomButtonList';

const WaitingRoomList = () => {
  const { waitingRoomList, isLoading, fetchWaitingRoomList } =
    useGetWaitingRoomList();

  return (
    <>
      <TopBar NavType="default" label="대기방" />
      <WaitingRoomListPageWrapper>
        <SubTitle>
          <ListTitle>참여 가능한 방</ListTitle>
          <RefreshIcon onClick={fetchWaitingRoomList} />
        </SubTitle>
        <RoomButtonGrid>
          {isLoading ? (
            <DotLoadingSpinner color="white" />
          ) : (
            <RoomButtonList waitingRoomList={waitingRoomList} />
          )}
        </RoomButtonGrid>
      </WaitingRoomListPageWrapper>
    </>
  );
};

export default WaitingRoomList;

'use client';

import { useState } from 'react';
import TopBar from '@/components/Common/TopBar/TopBar';
import { WaitingRoomListPageWrapper } from '@/app/commonPage.styles';
import {
  RoomButtonGrid,
  ListTitle,
  SubTitle,
  Footer,
} from './waitingRoomList.styles';
import { RefreshIcon } from '@/components/Common/RoomButton/WaitingRoomListIcon';
import useGetWaitingRoomList from '@/hooks/waitingRoomList/useGetWaitingRoomList';
import DotLoadingSpinner from '@/components/Common/LoadingSpinner/DotLoadingSpinner';
import RoomButtonList from '@/components/Common/RoomButton/RoomButtonList';
import Button from '@/components/Common/Button/Button';
import CreateRoomBottomSheet from '@/components/Layout/MakeRoom/CreateRoomBottomSheet';

const WaitingRoomList = () => {
  const { waitingRoomList, isLoading, fetchWaitingRoomList } =
    useGetWaitingRoomList();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

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
      <Footer>
        <Button
          label="방 만들기"
          buttonType="purple"
          buttonSize="large"
          buttonHeight="default"
          styleType="coloredBackground"
          onClick={() => setIsBottomSheetOpen(true)}
        />
      </Footer>

      {/* 바텀시트 표시 */}
      {isBottomSheetOpen && (
        <CreateRoomBottomSheet
          isOpen={isBottomSheetOpen}
          setIsOpen={setIsBottomSheetOpen}
        />
      )}
    </>
  );
};

export default WaitingRoomList;

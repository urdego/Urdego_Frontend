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
  const [buttonType, setButtonType] = useState<'purple' | 'gray'>('purple');
  const [buttonLabel, setButtonLabel] = useState('방 만들기');
  const [roomTitle, setRoomTitle] = useState('');

  const handleButtonClick = () => {
    setIsBottomSheetOpen(true);
    setButtonType('gray'); // 버튼을 회색(gray-70)으로 변경
  };

  const handleRoomTitleChange = (title: string) => {
    setRoomTitle(title);
    if (title.trim() !== '') {
      setButtonType('purple'); // 방 제목이 입력되면 다시 보라색(purple-50)으로 변경
      setButtonLabel('버튼을 누르면 방이 생성됩니다');
    } else {
      setButtonType('gray'); // 방 제목이 비어있다면 다시 회색(gray-70) 유지
      setButtonLabel('방 만들기');
    }
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
    setButtonType('purple'); // 바텀시트를 닫을 때 버튼 색상을 원래대로
    setButtonLabel('방 만들기'); // 바텀시트를 닫을 때 버튼 텍스트 원래대로
    setRoomTitle(''); // 방 제목도 초기화
  };

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
          label={buttonLabel}
          buttonType={buttonType}
          buttonSize="large"
          buttonHeight="default"
          styleType="coloredBackground"
          onClick={handleButtonClick}
        />
      </Footer>

      {/* 바텀시트 표시 */}
      {isBottomSheetOpen && (
        <CreateRoomBottomSheet
          isOpen={isBottomSheetOpen}
          setIsOpen={handleCloseBottomSheet} // 바텀시트를 닫을 때 초기 상태로 복구
          onRoomTitleChange={handleRoomTitleChange}
        />
      )}
    </>
  );
};

export default WaitingRoomList;

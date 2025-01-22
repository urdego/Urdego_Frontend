'use client';

import { useState } from 'react';
import { WaitingWrapper, UserList, Footer } from './waitingRoom.styles';
import TopBar from '@/components/Common/TopBar/TopBar';
import Button from '@/components/Common/Button/Button';
import PositionCard from '@/components/Layout/WaitingRoom/PositionCard';
import { showReadyToast } from '@/components/Common/Toast/ReadyToast';
import InviteUser from '@/components/Layout/InviteUser/InviteUser';
import AddContents from '@/components/Layout/AddContents/AddContents';

const WaitingRoom = () => {
  const mockData = {
    currentUser: { name: '테스트유저', isReady: false },
    isManager: true,
    allPlayersReady: false,
    users: [
      { id: 1, name: '유저1', isHost: true, isReady: true },
      { id: 2, name: '유저2', isHost: false, isReady: true },
      { id: 3, name: '유저3', isHost: false, isReady: false },
      { id: 4, name: '유저4', isHost: false, isReady: false },
    ],
  };

  const { currentUser, isManager, allPlayersReady, users } = mockData;

  const [isInviteVisible, setInviteVisible] = useState(false);
  const [isAddContentsVisible, setAddContentsVisible] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [toastShown, setToastShown] = useState(false); // 토스트가 이미 표시되었는지 여부

  const toggleReady = () => console.log('준비하기 클릭');
  const startGame = () => {
    if (!allPlayersReady) {
      showReadyToast('아직 모든 팀원이 준비되지 않았습니다.');
      return;
    }
    console.log('게임 시작');
  };

  const handleAddContentsClose = () => {
    setAddContentsVisible(false);
  };

  const handleLocationSelection = (locations: string[]) => {
    setSelectedLocations(locations);
  };

  const handleAddContentsOpen = () => {
    setAddContentsVisible(true);
    if (!toastShown) {
      // 토스트가 이미 표시된 적이 없다면 표시
      showReadyToast('"어데고"에서 제공하는 컨텐츠로 대체될 수 있습니다.');
      setToastShown(true); // 토스트 표시 여부 업데이트
    }
  };

  const buttonLabel = isAddContentsVisible
    ? selectedLocations.length > 0
      ? '선택 완료'
      : '선택없이 준비완료'
    : '장소 선택하기';

  return (
    <>
      <TopBar label="게임 대기방" NavType="room" exitIcon />
      <WaitingWrapper>
        <UserList>
          {users.map((user) => (
            <PositionCard
              key={user.id}
              level={1}
              username={user.name}
              isHost={user.isHost}
              isReady={user.isReady}
              isEmpty={false}
            />
          ))}
          {Array.from({ length: Math.max(0, 6 - users.length) }).map(
            (_, index) => (
              <PositionCard
                key={`empty-${index}`}
                isEmpty={true}
                onClick={() => setInviteVisible(true)}
              />
            )
          )}
        </UserList>
        <Footer>
          <Button
            buttonType="purple"
            buttonSize="large"
            buttonHeight="default"
            label={buttonLabel}
            onClick={handleAddContentsOpen} // '장소 선택하기' 버튼 클릭 시 실행
            styleType="coloredBackground"
          />
        </Footer>
      </WaitingWrapper>
      {isInviteVisible && <InviteUser setInviteVisible={setInviteVisible} />}
      {isAddContentsVisible && (
        <AddContents
          isVisible={isAddContentsVisible}
          setIsVisible={handleAddContentsClose}
          title="장소 선택하기 (최대 5개)"
          onSelectionChange={handleLocationSelection}
          initialSelections={selectedLocations}
        />
      )}
    </>
  );
};

export default WaitingRoom;

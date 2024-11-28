'use client';

import { useRef, useState } from 'react';
import TopBar from '@/components/Common/TopBar/TopBar';
import { PageWrapper, Footer } from '@/app/makeRoom/makeRoom.styles';
import RoomTitleInput from '@layout/MakeRoom/RoomTitleInput';
import Button from '@common/Button/Button';
import NumSelectForm from '@layout/MakeRoom/NumSelectForm';
import FriendsInviteForm from '@layout/MakeRoom/FriendsInviteForm';

interface UserInfo {
  id: number;
  nickname: string;
}

const MakeRoomPage = () => {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [invitedFriends, setInvitedFriends] = useState<UserInfo[]>([]);
  const [selectedNumber, setSelectedNumber] = useState(2);
  const [isRoomTitleEntered, setIsRoomTitleEntered] = useState(false);

  // 방 제목 입력 감지
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRoomTitleEntered(!!e.target.value.trim());
  };

  // 인원 수 변경 감지
  const handleNumberChange = (value: number) => {
    setSelectedNumber(value);
  };

  // 초대된 친구 목록 변경
  const handleInvitedFriendsChange = (friends: UserInfo[]) => {
    setInvitedFriends(friends);
  };

  // 버튼 활성화 조건 체크
  const isButtonEnabled =
    isRoomTitleEntered && invitedFriends.length === selectedNumber - 1;

  const handleCreateRoom = () => {
    const roomData = {
      title: titleInputRef.current?.value,
      invitedFriends,
      totalMembers: selectedNumber,
    };
    console.log('Room creation data:', roomData);
  };

  return (
    <>
      <TopBar label="방 만들기" NavType="room" exitIcon />
      <PageWrapper>
        <RoomTitleInput
          ref={titleInputRef}
          label="방 제목 설정"
          placeholder="방 제목을 설정해주세요"
          onChange={handleTitleChange}
        />
        <NumSelectForm
          label="인원수 (최대 6명)"
          maxValue={6}
          minValue={2}
          initialValue={2}
          onChange={handleNumberChange}
        />
        <NumSelectForm label="라운드 (최대 3라운드)" maxValue={3} />
        <RoomTitleInput
          label="타이머"
          placeholder="1분 (변경불가)"
          variant="readonly"
        />
        <FriendsInviteForm
          onFriendsChange={handleInvitedFriendsChange}
          invitedFriends={invitedFriends}
          selectedNumber={selectedNumber}
        />
      </PageWrapper>
      <Footer>
        <Button
          buttonType={isButtonEnabled ? 'purple' : 'gray'}
          buttonSize="large"
          buttonHeight="default"
          styleType="coloredBackground"
          label="그룹 생성"
          onClick={handleCreateRoom}
          disabled={!isButtonEnabled}
        />
      </Footer>
    </>
  );
};

export default MakeRoomPage;

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

  const handleInvitedFriendsChange = (friends: UserInfo[]) => {
    setInvitedFriends(friends);
  };

  const handleCreateRoom = () => {
    const roomData = {
      title: titleInputRef.current?.value,
      invitedFriends,
    };
    console.log('Room creation data:', roomData);
  };

  return (
    <>
      <TopBar NavType="other" label="방 만들기" />
      <PageWrapper>
        <RoomTitleInput
          ref={titleInputRef}
          label="방 제목 설정"
          placeholder="방 제목을 설정해주세요"
        />
        <NumSelectForm
          label="인원수 (최대 6명)"
          maxValue={6}
          minValue={2}
          initialValue={2}
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
        />
      </PageWrapper>
      <Footer>
        <Button
          buttonType="gray"
          buttonSize="large"
          buttonHeight="default"
          styleType="coloredBackground"
          label="그룹 생성"
          onClick={handleCreateRoom}
        />
      </Footer>
    </>
  );
};

export default MakeRoomPage;

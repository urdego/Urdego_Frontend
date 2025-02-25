import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  BackgroundOverlay,
  BottomSheet,
  HeaderWrapper,
  HeaderHandler,
  ContentWrapper,
  SearchBarWrapper,
  SearchBar,
  UserList,
  HeaderTitle,
} from './InviteUser.styles';
import UserListItem from './UserListItem';
import SearchIcon from '@styles/Icon/search-btn.svg';
import { IUser } from '@/components/Layout/InviteUser/InviteUser.types';

import { useWebSocketFunctions } from '@/hooks/websocket/useWebsocketFunctions';
import useUserStore from '@/stores/useUserStore';
import useGameStore from '@/stores/useGameStore';

interface InviteUserProps {
  setInviteVisible: React.Dispatch<React.SetStateAction<boolean>>;
  roomName: string; // ★ WaitingRoom에서 전달받은 방 이름
}

const InviteUser = ({ setInviteVisible, roomName }: InviteUserProps) => {
  const [isExpand, setIsExpand] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const [users, setUsers] = useState<IUser[]>([]);

  // 웹소켓, 사용자, 방 정보를 가져옵니다.
  const { sendMessage } = useWebSocketFunctions();
  const { userId: senderId, nickname: senderNickname } = useUserStore();
  const { roomId } = useGameStore();

  // 검색어가 변경될 때마다 API 호출하여 사용자 목록을 가져옵니다.
  useEffect(() => {
    if (!searchWord) {
      setUsers([]);
      return;
    }

    const fetchUsers = async () => {
      try {
        const url = `/api/userSearch?word=${encodeURIComponent(searchWord)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch user list');

        const data: Omit<IUser, 'invited'>[] = await res.json();
        const mappedUsers: IUser[] = data.map((user) => ({
          ...user,
          invited: false,
        }));
        setUsers(mappedUsers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [searchWord]);

  // 초대 상태 토글 + 초대 시 소켓으로 알림 전송
  const handleInvite = (targetId: number, targetNickname: string) => {
    const targetUser = users.find((u) => u.userId === targetId);
    if (!targetUser) return;

    const newInvited = !targetUser.invited;
    setUsers((prev) =>
      prev.map((user) =>
        user.userId === targetId ? { ...user, invited: newInvited } : user
      )
    );

    // invited 가 true로 바뀔 때만 소켓 전송
    if (newInvited) {
      sendMessage(
        'INVITE_PLAYER',
        {
          roomId: String(roomId),
          roomName: roomName,
          senderId: Number(senderId),
          senderNickname: senderNickname,
          targetId: Number(targetId),
          targetNickname: targetNickname,
          action: 'INVITE', // ★ 명세서 예시에 따른 고정 값
        },
        'notification'
      );
    }
  };

  // 백그라운드 클릭 시 BottomSheet 닫기
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setInviteVisible(false);
    }
  };

  return (
    <BackgroundOverlay onClick={handleBackgroundClick}>
      <BottomSheet
        $isExpand={isExpand}
        initial={{ y: '100%' }}
        animate={{ y: '0%' }}
        exit={{ y: '100%' }}
        transition={{ type: 'tween' }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={(event, info) => {
          const isScrollToBottom = info.delta.y > 5 || info.offset.y > 150;
          if (isScrollToBottom) {
            setIsExpand(false);
            setInviteVisible(false);
          } else {
            setIsExpand(true);
          }
        }}
      >
        <HeaderWrapper>
          <HeaderHandler />
          <HeaderTitle>플레이어 초대</HeaderTitle>
        </HeaderWrapper>
        <ContentWrapper>
          <SearchBarWrapper>
            <Image src={SearchIcon} alt="search-icon" width={24} height={24} />
            <SearchBar
              placeholder="검색"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
            />
          </SearchBarWrapper>
          <UserList>
            {users
              .filter((user) => user.userId !== senderId)
              .map((user) => (
                <UserListItem
                  key={user.userId}
                  user={user}
                  onInvite={handleInvite}
                />
              ))}
          </UserList>
        </ContentWrapper>
      </BottomSheet>
    </BackgroundOverlay>
  );
};

export default InviteUser;

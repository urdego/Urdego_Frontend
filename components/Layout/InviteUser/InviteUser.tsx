'use client';

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
import { IUser } from './InviteUser.types';

// 추가
import useGameStore from '@/stores/useGameStore';
import useUserStore from '@/stores/useUserStore';
import { useWebSocketFunctions } from '@/hooks/websocket/useWebsocketFunctions';

interface InviteUserProps {
  setInviteVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const InviteUser = ({ setInviteVisible }: InviteUserProps) => {
  const [isExpand, setIsExpand] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const [users, setUsers] = useState<IUser[]>([]);

  // ▼ 추가: 초대 시 필요한 정보(방ID, 방이름, 보낸사람 ID/닉네임 등)를 가져온다고 가정
  const { roomId, roomName } = useGameStore(); // 예시: roomName도 store에 있다고 가정 (추후 수정)
  const { userId, nickname: senderNickname } = useUserStore();
  const { sendMessage } = useWebSocketFunctions();

  // 유저 검색 로직 (생략)
  useEffect(() => {
    if (!searchWord) {
      setUsers([]);
      return;
    }
    // ...
  }, [searchWord]);

  // 1) 초대 버튼을 눌렀을 때 실행되는 함수
  const handleInvite = (targetId: number, targetNickname: string) => {
    // (1) 초대 상태 토글
    setUsers((prev) =>
      prev.map((user) =>
        user.userId === targetId ? { ...user, invited: !user.invited } : user
      )
    );

    // (2) WebSocket으로 초대 알림 보내기
    // 명세서에 따라 payload를 구성
    const payload = {
      roomId: String(roomId), // 예시
      roomName: roomName || '', // 예시
      senderId: userId, // 보낸사람 ID
      senderNickname, // 보낸사람 닉네임
      targetId, // 받는사람 ID
      targetNickname, // 받는사람 닉네임
      action: 'INVITE',
    };

    // messageType: "INVITE_PLAYER"
    // destinationType: 'notification'
    sendMessage('INVITE_PLAYER', payload, 'notification');
  };

  // 2) 배경 클릭 시 BottomSheet 닫기
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
            {users.map((user) => (
              <UserListItem
                key={user.userId}
                user={user}
                // ▼ 자식으로 초대 핸들러를 내려주면서, 대상 ID/닉네임을 넘김
                onInvite={(id, nickname) => handleInvite(id, nickname)}
              />
            ))}
          </UserList>
        </ContentWrapper>
      </BottomSheet>
    </BackgroundOverlay>
  );
};

export default InviteUser;

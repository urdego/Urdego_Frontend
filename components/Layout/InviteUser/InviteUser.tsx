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

interface InviteUserProps {
  setInviteVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const InviteUser = ({ setInviteVisible }: InviteUserProps) => {
  const [isExpand, setIsExpand] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const [users, setUsers] = useState<IUser[]>([]);

  // 검색어가 변경될 때마다 API 호출하여 사용자 목록을 가져옵니다.
  useEffect(() => {
    if (!searchWord) {
      setUsers([]);
      return;
    }

    const fetchUsers = async () => {
      try {
        // 내부 라우터를 통해 API 호출 (/api/userSearch?word=검색어)
        const url = `/api/userSearch?word=${encodeURIComponent(searchWord)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch user list');

        // API에서 받은 데이터는 invited 필드가 없으므로 Omit<IUser, 'invited'>로 받습니다.
        const data: Omit<IUser, 'invited'>[] = await res.json();

        // UI용으로 invited 필드를 false로 추가합니다.
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

  // 초대 상태 토글
  const handleInvite = (userId: number) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.userId === userId ? { ...user, invited: !user.invited } : user
      )
    );
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
            {users.map((user) => (
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

import { useState } from 'react';
import {
  BackgroundOverlay,
  BottomSheet,
  HeaderWrapper,
  HeaderHandler,
  ContentWrapper,
  SearchBar,
  UserList,
  UserItem,
  UserAvatar,
  UserInfo,
  InviteButton,
  HeaderTitle,
  Level,
  SearchBarWrapper,
  UserId,
} from '@components/Layout/InviteUser/InviteUser.styles';
import Image from 'next/image';
import SearchIcon from '@styles/Icon/search-btn.svg';

interface InviteUserProps {
  setInviteVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const InviteUser = ({ setInviteVisible }: InviteUserProps) => {
  const [isExpand, setIsExpand] = useState(false);

  const [users, setUsers] = useState([
    { id: '셉셉이', level: 5, status: '게임중', invited: false },
    { id: '날라리', level: 5, status: '게임중', invited: false },
    { id: '프론트맨', level: 5, status: '온라인', invited: false },
    { id: '계란맨', level: 5, status: '온라인', invited: false },
    { id: '누구신지', level: 5, status: '오프라인', invited: true },
  ]);

  // 클릭 이벤트가 백그라운드에만 적용되도록 수정
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setInviteVisible(false);
    }
  };

  const handleInvite = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, invited: !user.invited } : user
      )
    );
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
            <SearchBar placeholder="검색" />
          </SearchBarWrapper>
          <UserList>
            {users.map((user) => (
              <UserItem key={user.id}>
                <UserAvatar />
                <UserInfo>
                  <UserId>{user.id}</UserId>
                  <Level>LV.{user.level}</Level>
                  {/* <UserStatus $status={user.status}>{user.status}</UserStatus> */}
                </UserInfo>
                <InviteButton
                  $invited={user.invited}
                  onClick={() => handleInvite(user.id)}
                >
                  {user.invited ? '초대완료' : '초대하기'}
                </InviteButton>
              </UserItem>
            ))}
          </UserList>
        </ContentWrapper>
      </BottomSheet>
    </BackgroundOverlay>
  );
};

export default InviteUser;

import React, { useState, useEffect } from 'react';
import {
  Container,
  Title,
  SearchContainer,
  Input,
  InviteButton,
  SearchResultList,
  SearchResultItem,
  InvitedFriendsContainer,
  InvitedFriendsTitle,
  InvitedFriendsList,
  InvitedFriend,
  InvitedFriendContainer,
  CancelButton,
} from './FriendsInviteForm.styles';

interface UserInfo {
  id: number;
  nickname: string;
}

interface FriendsInviteFormProps {
  onFriendsChange: (friends: UserInfo[]) => void;
  invitedFriends: UserInfo[];
}

const FriendsInviteForm = ({
  onFriendsChange,
  invitedFriends,
}: FriendsInviteFormProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<UserInfo[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const searchUsers = async () => {
      if (searchTerm.trim()) {
        try {
          const queryString = encodeURIComponent(searchTerm.trim());
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/user-service/nickname?string=${queryString}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          if (response.status === 200) {
            const data = await response.json();
            console.log('API 응답 데이터:', data); // API 데이터 확인
            setSearchResults(Array.isArray(data) ? data : []);
          } else {
            console.error('API 호출 실패:', response.status);
            setSearchResults([]);
          }
        } catch (error) {
          console.error('API 호출 에러:', error);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    };

    const debounceTimeout = setTimeout(searchUsers, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  const handleUserSelect = (user: UserInfo) => {
    setSelectedUser(user);
    setSearchTerm(user.nickname);
    setSearchResults([]);
  };

  const handleInvite = () => {
    if (
      selectedUser &&
      !invitedFriends.find(
        (friend) => friend.nickname === selectedUser.nickname
      )
    ) {
      const newInvitedFriends = [...invitedFriends, selectedUser];
      onFriendsChange(newInvitedFriends);
      setSelectedUser(null);
      setSearchTerm('');
    }
  };

  const handleCancelInvite = (friendToRemove: UserInfo) => {
    const newInvitedFriends = invitedFriends.filter(
      (friend) => friend.id !== friendToRemove.id
    );
    onFriendsChange(newInvitedFriends);
  };

  return (
    <Container>
      <Title>닉네임으로 친구 초대</Title>
      <SearchContainer>
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="닉네임을 입력해주세요"
        />
        {searchResults.length > 0 && (
          <SearchResultList>
            {searchResults.map((user) => (
              <SearchResultItem
                key={user.id}
                onClick={() => handleUserSelect(user)}
              >
                {user.nickname}
              </SearchResultItem>
            ))}
          </SearchResultList>
        )}
        <InviteButton onClick={handleInvite} isSelected={selectedUser !== null}>
          초대완료!
        </InviteButton>
      </SearchContainer>

      <InvitedFriendsContainer>
        <InvitedFriendsTitle>초대된 친구 목록</InvitedFriendsTitle>
        <InvitedFriendsList>
          {invitedFriends.map((friend) => (
            <InvitedFriendContainer key={friend.id}>
              <InvitedFriend>{friend.nickname}</InvitedFriend>
              <CancelButton
                onClick={() => handleCancelInvite(friend)}
                aria-label="초대 취소"
              >
                ✕
              </CancelButton>
            </InvitedFriendContainer>
          ))}
        </InvitedFriendsList>
      </InvitedFriendsContainer>
    </Container>
  );
};

export default FriendsInviteForm;

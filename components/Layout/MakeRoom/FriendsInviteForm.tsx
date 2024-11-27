import React, { useState, useEffect } from 'react';
import {
  Container,
  Title,
  SearchContainer,
  Input,
  InviteButton,
  SearchResultList,
  SearchResultItem,
  InvitedFriendsList,
  InvitedFriendsTitle,
  InvitedFriend,
  InvitedFriendsContainer,
} from './FriendsInviteForm.styles';

interface UserInfo {
  id: number;
  nickname: string;
}

interface FriendsInviteFormProps {
  onFriendsChange: (friends: UserInfo[]) => void;
  invitedFriends: UserInfo[];
}

const FriendsInviteForm: React.FC<FriendsInviteFormProps> = ({
  onFriendsChange,
  invitedFriends,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<UserInfo[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const searchUsers = async () => {
      if (searchTerm.trim()) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/user-service/users/search`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ string: searchTerm }),
            }
          );

          const data = await response.json();
          if (response.ok) {
            setSearchResults(data.userInfoList);
          } else {
            console.error('Search failed:', data.message);
          }
        } catch (error) {
          console.error('API call failed:', error);
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
      !invitedFriends.find((friend) => friend.id === selectedUser.id)
    ) {
      const newInvitedFriends = [...invitedFriends, selectedUser];
      onFriendsChange(newInvitedFriends);
      setSelectedUser(null);
      setSearchTerm('');
    }
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
        <InviteButton onClick={handleInvite}>초대완료!</InviteButton>
        {searchResults.length > 0 && !selectedUser && (
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
      </SearchContainer>

      <InvitedFriendsContainer>
        <InvitedFriendsTitle>초대된 친구 목록</InvitedFriendsTitle>
        <InvitedFriendsList>
          {invitedFriends.map((friend) => (
            <InvitedFriend key={friend.id}>{friend.nickname}</InvitedFriend>
          ))}
        </InvitedFriendsList>
      </InvitedFriendsContainer>
    </Container>
  );
};

export default FriendsInviteForm;

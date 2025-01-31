import React, { useState } from 'react';
import {
  Container,
  Title,
  SearchContainer,
  Input,
  SearchResultList,
  SearchResultItem,
  InvitedFriendsContainer,
  InvitedFriendsTitle,
  InvitedFriendsList,
  InvitedFriend,
  InvitedFriendContainer,
  CancelButton,
} from './FriendsInviteForm.styles';
import toast from 'react-hot-toast';
import useUserStore from '@stores/useUserStore';
import InviteButton from '@layout/MakeRoom/InviteButton';

interface UserInfo {
  id: number;
  nickname: string;
}

interface FriendsInviteFormProps {
  onFriendsChange: (friends: UserInfo[]) => void;
  invitedFriends: UserInfo[];
  selectedNumber: number;
}

const FriendsInviteForm = ({
  onFriendsChange,
  invitedFriends,
  selectedNumber,
}: FriendsInviteFormProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<UserInfo[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);
  const currentUserNickname = useUserStore((state) => state.nickname);

  const handleUserSelect = (user: UserInfo) => {
    setSelectedUser(user);
    setSearchTerm(user.nickname);
    setSearchResults([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value !== selectedUser?.nickname) {
      setSelectedUser(null);
    }
  };

  const handleInvite = async () => {
    if (selectedUser) {
      // 이미 초대된 친구인지 체크
      if (
        invitedFriends.find(
          (friend) => friend.nickname === selectedUser.nickname
        )
      ) {
        toast.error('이미 초대한 친구 입니다.', {
          duration: 2000,
          position: 'bottom-center',
        });
        return false;
      }

      // 인원수 체크
      if (invitedFriends.length >= selectedNumber - 1) {
        toast.error('인원수 보다 많은 친구 초대는 어렵습니다.', {
          duration: 2000,
          position: 'bottom-center',
        });
        return false;
      }

      const newInvitedFriends = [...invitedFriends, selectedUser];
      onFriendsChange(newInvitedFriends);
      setSelectedUser(null);
      setSearchTerm('');
      return true; // 성공적으로 초대된 경우
    }
    return false;
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
          onChange={handleInputChange}
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
        <InviteButton onClick={handleInvite} selectedUser={selectedUser} />
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

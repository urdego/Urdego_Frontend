import React from 'react';
import Image from 'next/image';
import {
  UserItem,
  UserInfo,
  UserId,
  Level,
  InviteButton,
} from '@/components/Layout/InviteUser/InviteUser.styles';
import useCharacterData from '@/hooks/character/useCharacterData';

interface IUser {
  userId: number;
  nickname: string;
  level: number;
  activeCharacter: string;
  ownedCharacters: string[];
  invited: boolean;
}

interface UserListItemProps {
  user: IUser;
  onInvite: (userId: number) => void;
}

const UserListItem: React.FC<UserListItemProps> = ({ user, onInvite }) => {
  const { userId, nickname, level, activeCharacter, ownedCharacters, invited } =
    user;

  // useCharacterData 훅을 통해 해당 유저가 보유한 캐릭터 정보를 가져옵니다.
  const characters = useCharacterData({ ownCharacters: ownedCharacters });
  // activeCharacter에 해당하는 캐릭터 객체를 찾습니다.
  const activeChar = characters.find(
    (character) => character.key === activeCharacter
  );

  return (
    <UserItem>
      {activeChar && (
        <Image
          src={activeChar.displayImage.src}
          width={42}
          height={42}
          alt="User Avatar"
        />
      )}
      <UserInfo>
        <UserId>{nickname}</UserId>
        <Level>LV.{level}</Level>
      </UserInfo>
      <InviteButton $invited={invited} onClick={() => onInvite(userId)}>
        {invited ? '초대완료' : '초대하기'}
      </InviteButton>
    </UserItem>
  );
};

export default UserListItem;

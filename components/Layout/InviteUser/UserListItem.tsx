import React from 'react';
import Image from 'next/image';
import {
  UserItem,
  UserInfo,
  UserId,
  Level,
  InviteButton,
} from './InviteUser.styles';
import useCharacterData from '@/hooks/character/useCharacterData';
import { IUser } from './InviteUser.types';

interface UserListItemProps {
  user: IUser;
  onInvite: (userId: number, nickname: string) => void;
}

function UserListItem({ user, onInvite }: UserListItemProps) {
  const { userId, nickname, level, activeCharacter, ownedCharacters, invited } =
    user;

  const characters = useCharacterData({ ownCharacters: ownedCharacters });
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
        <Level>Lvl.{level}</Level>
      </UserInfo>
      <InviteButton
        $invited={invited}
        // ▼ 클릭 시 부모의 handleInvite(userId, nickname) 실행
        onClick={() => onInvite(userId, nickname)}
      >
        {invited ? '초대완료' : '초대하기'}
      </InviteButton>
    </UserItem>
  );
}

export default UserListItem;

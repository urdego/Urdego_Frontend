import Image from 'next/image';
import SnowMan1 from '@/styles/Icon/SnowMan1.svg';
import SnowMan2 from '@/styles/icon/snowman2.svg';
import SnowMan3 from '@/styles/icon/snowman3.svg';
import SnowMan4 from '@/styles/icon/snowman4.svg';
import SnowMan5 from '@/styles/icon/snowman5.svg';
import SnowMan6 from '@/styles/icon/snowman6.svg';
import {
  CharacterWrapper,
  CharactersContainer,
  InfoWrapper,
  Level,
  NickName,
  IsHost,
} from './Character.styles';

interface User {
  id: number;
  name: string;
  isHost: boolean;
}

interface CharacterProps {
  users: User[];
}

const Character = ({ users }: CharacterProps) => {
  // 캐릭터 이미지 소스 설정
  const characterImages = [
    SnowMan1,
    SnowMan2,
    SnowMan3,
    SnowMan4,
    SnowMan5,
    SnowMan6,
  ];

  // 유저 수에 맞춰 배치
  const positions = [
    { top: '10%', left: '50%' },
    { top: '30%', left: '80%' },
    { top: '70%', left: '70%' },
    { top: '90%', left: '30%' },
    { top: '60%', left: '10%' },
    { top: '20%', left: '20%' },
  ];

  return (
    <CharactersContainer>
      {users.map((user: User, idx: number) => (
        <CharacterWrapper key={user.id} style={positions[idx]}>
          <IsHost>{user.isHost && '방장'}</IsHost>
          <InfoWrapper>
            <Level>{'레벨 1'}</Level>
            <NickName>{user.name}</NickName>
          </InfoWrapper>
          <Image src={characterImages[idx]} alt={`${user.name} 캐릭터`} />
        </CharacterWrapper>
      ))}
    </CharactersContainer>
  );
};

export default Character;

import Image from 'next/image';
import SnowMan1 from '@/styles/Icon/SnowMan1.svg';
import SnowMan2 from '@/styles/Icon/Snowman2.svg';
import SnowMan3 from '@/styles/Icon/Snowman3.svg';
import SnowMan4 from '@/styles/Icon/Snowman4.svg';
import SnowMan5 from '@/styles/Icon/Snowman5.svg';
import SnowMan6 from '@/styles/Icon/Snowman6.svg';
import {
  CharacterWrapper,
  CharactersContainer,
  InfoWrapper,
  Host,
  Level,
  NickName,
  NicknameContainer,
} from './Character.styles';

interface CharacterProps {
  users: {
    id: number;
    name: string;
    isHost: boolean;
    isReady: boolean;
  }[];
}

const positions = [
  { top: '10%', left: '50%' },
  { top: '30%', left: '80%' },
  { top: '70%', left: '70%' },
  { top: '90%', left: '30%' },
  { top: '60%', left: '10%' },
  { top: '20%', left: '20%' },
];

const Character = ({ users }: CharacterProps) => {
  const characters = users.map((user, index) => ({
    id: user.id,
    level: `레벨 ${index + 1}`, // 임시 레벨 할당
    nickname: user.name,
    src: [SnowMan1, SnowMan2, SnowMan3, SnowMan4, SnowMan5, SnowMan6][index],
    alt: `${index + 1}번 눈사람`,
    isHost: user.isHost,
    isReady: user.isReady,
  }));

  return (
    <CharactersContainer>
      {characters.map((char, idx) => (
        <CharacterWrapper
          key={char.id}
          style={positions[idx]}
          animation="slide"
        >
          <InfoWrapper>
            {char.isHost ? (
              <Host>방장</Host>
            ) : char.isReady ? (
              <Host isReady>준비완료</Host>
            ) : null}
            <NicknameContainer>
              <Level>{char.level}</Level>
              <NickName>{char.nickname}</NickName>
            </NicknameContainer>
          </InfoWrapper>
          <Image src={char.src} alt={char.alt} />
        </CharacterWrapper>
      ))}
    </CharactersContainer>
  );
};

export default Character;

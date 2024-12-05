import Image from 'next/image';
import Character0 from '@/styles/Icon/Character/character-0.svg';
import Character1 from '@/styles/Icon/Character/character-1.svg';
import Character2 from '@/styles/Icon/Character/character-2.svg';
import Character3 from '@/styles/Icon/Character/character-3.svg';
import Character4 from '@/styles/Icon/Character/character-4.svg';
import Character5 from '@/styles/Icon/Character/character-5.svg';
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
  const characters = users.map((user, index) => {
    // 타원형 배치를 위한 계산
    const angle = (index * 360) / users.length;
    const horizontalRadius = 35; // 가로 반지름 (더 작게)
    const verticalRadius = 45; // 세로 반지름 (더 크게)

    // 타원형 좌표 계산
    const x = 50 + horizontalRadius * Math.cos((angle * Math.PI) / 180);
    const y = 50 + verticalRadius * Math.sin((angle * Math.PI) / 180);

    return {
      id: user.id,
      level: `레벨 ${index + 1}`,
      nickname: user.name,
      src: [
        Character0,
        Character1,
        Character2,
        Character3,
        Character4,
        Character5,
      ][index],
      alt: `${index + 1}번 눈사람`,
      isHost: user.isHost,
      isReady: user.isReady,
      position: { left: `${x}%`, top: `${y}%` },
    };
  });

  return (
    <CharactersContainer>
      {characters.map((char) => (
        <CharacterWrapper key={char.id} style={char.position} animation="slide">
          <InfoWrapper>
            {char.isHost ? (
              <Host>방장</Host>
            ) : char.isReady ? (
              <Host isReady>준비완료</Host>
            ) : (
              <Host>준비중..</Host>
            )}
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

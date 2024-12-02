import Image from 'next/image';
import SnowMan1 from '@/styles/Icon/SnowMan1.svg';
import SnowMan2 from '@/styles/Icon/SnowMan2.svg';
import SnowMan3 from '@/styles/Icon/SnowMan3.svg';
import SnowMan4 from '@/styles/Icon/SnowMan4.svg';
import SnowMan5 from '@/styles/Icon/SnowMan5.svg';
import SnowMan6 from '@/styles/Icon/SnowMan6.svg';
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
      src: [SnowMan1, SnowMan2, SnowMan3, SnowMan4, SnowMan5, SnowMan6][index],
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

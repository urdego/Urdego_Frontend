import Image from 'next/image';
import Character0 from '@/styles/Icon/Character/character-0.svg';
import Character1 from '@/styles/Icon/Character/character-1.svg';
import Character2 from '@/styles/Icon/Character/character-2.svg';
import Character3 from '@/styles/Icon/Character/character-3.svg';
import Character4 from '@/styles/Icon/Character/character-4.svg';
import Character5 from '@/styles/Icon/Character/character-5.svg';
import HostIcon from '@/styles/Icon/Host.svg';

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
  { top: '30%', left: '20%' },
  { top: '10%', left: '50%' },
  { top: '30%', left: '80%' },
  { top: '50%', left: '40%' },
  { top: '80%', left: '30%' },
  { top: '100%', left: '60%' },
];

const Character = ({ users }: CharacterProps) => {
  const characters = users.map((user, index) => {
    return {
      id: user.id,
      level: '레벨 1',
      nickname: user.name,
      src: [
        Character5,
        Character4,
        Character3,
        Character2,
        Character1,
        Character0,
      ][index],
      alt: `${index + 1}번 눈사람`,
      isHost: user.isHost,
      isReady: user.isReady,
      position: positions[index],
    };
  });

  return (
    <CharactersContainer>
      {characters.map((char) => (
        <CharacterWrapper
          key={char.id}
          style={{
            ...char.position,
            width: '350px',
            height: '280px',
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <InfoWrapper>
            {char.isHost ? (
              <Host style={{ display: 'flex', alignItems: 'center' }}>
                <Image
                  src={HostIcon.src}
                  alt="방장"
                  width={16}
                  height={16}
                  style={{ paddingRight: '3px' }}
                />
                방장
              </Host>
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

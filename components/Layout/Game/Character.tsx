import Image from 'next/image';
import Angular from '@/styles/Icon/angular.png';
import Basic from '@/styles/Icon/basic.png';
import Bumpy from '@/styles/Icon/bumpy.png';
import Dot from '@/styles/Icon/dot.png';
import Planet from '@/styles/Icon/planet.png';
import Sharp from '@/styles/Icon/sharp.png';
import Square from '@/styles/Icon/square.png';
import Star from '@/styles/Icon/star.png';
import Wool from '@/styles/Icon/wool.png';
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
      src: [Angular, Basic, Bumpy, Dot, Planet, Sharp, Square, Star, Wool][
        index % 15
      ], // 파일 순환 로직
      alt: `${index + 1}번 캐릭터`,
      isHost: user.isHost,
      isReady: user.isReady,
      position: positions[index % positions.length], // 위치 순환 로직
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
                  // style={{ paddingRight: '3px' }}
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
          <Image src={char.src} alt={char.alt} width={100} height={100} />
        </CharacterWrapper>
      ))}
    </CharactersContainer>
  );
};

export default Character;

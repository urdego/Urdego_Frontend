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
  Host,
  Level,
  NickName,
} from './Character.styles';

const positions = [
  { top: '10%', left: '50%' },
  { top: '30%', left: '80%' },
  { top: '70%', left: '70%' },
  { top: '90%', left: '30%' },
  { top: '60%', left: '10%' },
  { top: '20%', left: '20%' },
];

const Character = () => {
  const characters = [
    {
      id: 1,
      level: '레벨 1',
      nickname: '눈사람',
      src: SnowMan1,
      alt: '1번 눈사람',
      isHost: true,
    },
    {
      id: 2,
      level: '레벨 2',
      nickname: '쪼꼬미',
      src: SnowMan2,
      alt: '2번 눈사람',
      isHost: false,
    },
    {
      id: 3,
      level: '레벨 1',
      nickname: '곽두팔씨',
      src: SnowMan3,
      alt: '3번 눈사람',
      isHost: false,
    },
    {
      id: 4,
      level: '레벨 2',
      nickname: '귀요미',
      src: SnowMan4,
      alt: '4번 눈사람',
      isHost: false,
    },
    {
      id: 5,
      level: '레벨 3',
      nickname: '군침이싹',
      src: SnowMan5,
      alt: '5번 눈사람',
      isHost: false,
    },
    {
      id: 6,
      level: '레벨 1',
      nickname: '강낭콩',
      src: SnowMan6,
      alt: '6번 눈사람',
      isHost: false,
    },
  ];

  return (
    <CharactersContainer>
      {characters.map((char, idx) => (
        <CharacterWrapper
          key={char.id}
          style={positions[idx]}
          animation="slide"
        >
          <InfoWrapper>
            {char.isHost && <Host>방장</Host>}
            <div style={{ display: 'flex', gap: '4px' }}>
              <Level>{char.level}</Level>
              <NickName>{char.nickname}</NickName>
            </div>
          </InfoWrapper>
          <Image src={char.src} alt={char.alt} />
        </CharacterWrapper>
      ))}
    </CharactersContainer>
  );
};

export default Character;

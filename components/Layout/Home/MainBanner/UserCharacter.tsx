import { StyledImage } from './UserCharacter.styles';
import UserCharacterSrc from '@/styles/Icon/Character/character-5.svg';
import Image from 'next/image';

export const UserCharacter = () => {
  return (
    <StyledImage>
      <Image
        src={UserCharacterSrc}
        alt="유저 캐릭터"
        priority
        decoding="async"
      />
    </StyledImage>
  );
};

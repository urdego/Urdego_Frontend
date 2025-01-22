import { StyledImage } from './UserCharacter.styles';
import UserCharacterSrc from '@/styles/Icon/Character/basic.png';
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

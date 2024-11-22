import { StyledImage } from './UserCharacter.styles';
import UserCharacterSrc from '@/styles/Icon/UserCharacter.svg';

export const UserCharacter = () => {
  return (
    <StyledImage src={UserCharacterSrc} alt='유저 캐릭터' />
  );
};
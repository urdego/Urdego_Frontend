import {
  ProfileInfoWrapper,
  ImageWrapper,
  InfoRow,
  ProfileName,
  ProfileEmail,
  Level,
} from '@/components/Layout/MyPage/ProfileInfo.styles';
import Image from 'next/image';
import useCharacterData from '@/hooks/character/useCharacterData';
import { useCharacterState } from '@/hooks/character/useCharacterState';

interface ProfileInfoProps {
  email: string;
  nickname: string;
  activeCharacter: string;
}

const ProfileInfo = ({
  email,
  nickname,
  activeCharacter,
}: ProfileInfoProps) => {
  const characters = useCharacterData({ ownCharacters: [activeCharacter] });
  const activeCharacterData = characters.find(
    (character) => character.key === activeCharacter
  );
  const { level } = useCharacterState();

  return (
    <ProfileInfoWrapper>
      <ImageWrapper>
        {activeCharacterData ? (
          <Image
            src={activeCharacterData.displayImage.src}
            width={activeCharacterData.displayImage.width}
            height={activeCharacterData.displayImage.height}
            alt={`${activeCharacter} 이미지`}
          />
        ) : (
          'no character'
        )}
      </ImageWrapper>
      <InfoRow>
        <Level>Lvl.{level}</Level>
        <ProfileName>{nickname || '닉네임 없음'}</ProfileName>
      </InfoRow>
      <ProfileEmail>{email || '이메일 없음'}</ProfileEmail>
    </ProfileInfoWrapper>
  );
};

export default ProfileInfo;

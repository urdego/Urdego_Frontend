import Image from 'next/image';
import {
  ProfileInfoWrapper,
  ImageWrapper,
  InfoRow,
  ProfileName,
  ProfileEmail,
  Level,
} from '@/components/Layout/MyPage/ProfileInfo.styles';
import useCharacterData from '@/hooks/character/useCharacterData';
import { useCharacterState } from '@/hooks/character/useCharacterState';
import {
  SkeletonImageWrapper,
  SkeletonInfoRow,
  SkeletonLevel,
  SkeletonName,
  SkeletonEmail,
} from './ProfileInfoSkeleton.styles';

interface ProfileInfoProps {
  email: string;
  nickname: string;
  activeCharacter: string;
}

export default function ProfileInfo({
  email,
  nickname,
  activeCharacter,
}: ProfileInfoProps) {
  const characters = useCharacterData({ ownCharacters: [activeCharacter] });
  const { level } = useCharacterState();

  // 스켈레톤 렌더링 조건
  const isLoading = !email;

  // 스켈레톤 조건부 렌더링
  if (isLoading) {
    return (
      <ProfileInfoWrapper>
        <SkeletonImageWrapper />
        <SkeletonInfoRow>
          <SkeletonLevel />
          <SkeletonName />
        </SkeletonInfoRow>
        <SkeletonEmail />
      </ProfileInfoWrapper>
    );
  }

  // 실제 UI
  const activeCharacterData = characters.find(
    (character) => character.key === activeCharacter
  );

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
}

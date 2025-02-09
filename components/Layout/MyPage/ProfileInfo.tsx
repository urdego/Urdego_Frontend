import {
  ProfileInfoWrapper,
  ImageWrapper,
  ProfileName,
  ProfileEmail,
} from '@/components/Layout/MyPage/ProfileInfo.styles';

import ProfileImg from '@/styles/Icon/Profile_Snowman1.svg';
import Image from 'next/image';

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
  return (
    <ProfileInfoWrapper>
      <ImageWrapper>
        <Image src={ProfileImg} width={56} height={56} alt="Profile Image" />
      </ImageWrapper>
      <ProfileName>{nickname || '닉네임 없음'}</ProfileName>
      <ProfileEmail>{email || '이메일 없음'}</ProfileEmail>
      <div>{activeCharacter || '캐릭터 타입 없음'}</div>
    </ProfileInfoWrapper>
  );
};

export default ProfileInfo;

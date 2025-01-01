import {
  ProfileInfoWrapper,
  ImageWrapper,
  ProfileName,
  ProfileEmail,
} from '@/components/Layout/MyPage/ProfileInfo.styles';

import ProfileImg from '@/styles/Icon/Profile_Snowman1.svg';
import Image from 'next/image';

const ProfileInfo = () => {
  return (
    <ProfileInfoWrapper>
      <ImageWrapper>
        <Image src={ProfileImg} width={56} height={56} alt="Profile Image" />
      </ImageWrapper>
      <ProfileName>김눈사람</ProfileName>
      <ProfileEmail>urdego@gmail.com</ProfileEmail>
    </ProfileInfoWrapper>
  );
};

export default ProfileInfo;

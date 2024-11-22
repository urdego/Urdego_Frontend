import {
  SocialLoginWrapper,
  SocialButton,
} from '@components/Layout/Login/SNSLogos.styles';

import KakaoLogoSrc from '@styles/Icon/sns-kakao-login.svg';
import NaverLogoSrc from '@styles/Icon/sns-naver-login.svg';
import GoogleLogoSrc from '@styles/Icon/sns-google-login.svg';
import Image from 'next/image';

type SocialProvider = 'kakao' | 'naver' | 'google';

const SocialLogin = () => {
  const handleLogin = (provider: SocialProvider) => {
    window.location.href = `/api/auth/${provider}`;
  };

  return (
    <SocialLoginWrapper>
      <SocialButton onClick={() => handleLogin('kakao')}>
        <Image src={KakaoLogoSrc} width={56} height={56} alt="Kakao Login" />
      </SocialButton>
      <SocialButton onClick={() => handleLogin('naver')}>
        <Image src={NaverLogoSrc} width={56} height={56} alt="Naver Login" />
      </SocialButton>
      <SocialButton onClick={() => handleLogin('google')}>
        <Image src={GoogleLogoSrc} width={56} height={56} alt="Google Login" />
      </SocialButton>
    </SocialLoginWrapper>
  );
};

export default SocialLogin;

import styled from 'styled-components';
import loginBackground from '@/styles/Icon/Login/login-bg.png';

export const LoginWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 40px 16px 0 16px;
  background-image: url(${loginBackground.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  /* Input 컴포넌트들과 AutoLoginCheckbox 컴포넌트 가운데 정렬에서 제외 */
  & > div[class*='Input'],
  & > div[class*='AutoLogin'] {
    align-self: flex-start;
    width: 100%;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  padding-top: 550px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 40px 0;

  // 아이폰 SE 높이 기준
  @media screen and (max-height: 667px) {
    padding-top: 450px;
  }

  // 삼성 S8+ 높이 기준
  @media screen and (min-height: 668px) and (max-height: 740px) {
    padding-top: 470px;
  }

  // 아이폰 15 높이 기준
  @media screen and (min-height: 741px) and (max-height: 884px) {
    padding-top: 530px;
  }

  // 아이폰 XR 높이 기준
  @media screen and (min-height: 885px) and (max-height: 896px) {
    padding-top: 570px;
  }

  // 아이폰 15 Pro Max 높이 기준
  @media screen and (min-height: 897px) and (max-height: 932px) {
    padding-top: 600px;
  }
`;

export const SocialButton = styled.button`
  border: none;
  cursor: pointer;
  background: transparent;
  transition: transform 0.2s;
  padding-bottom: 12px;

  img {
    width: 100%;
    height: 100%;
  }
`;

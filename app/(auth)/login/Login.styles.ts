import styled from 'styled-components';
import colors from '@/styles/color/palette';

export const LoginWrapper = styled.div`
  width: 100%;
  padding: 40px 16px 0 16px;

  /* Input 컴포넌트들과 AutoLoginCheckbox 컴포넌트 가운데 정렬에서 제외 */
  & > div[class*='Input'],
  & > div[class*='AutoLogin'] {
    align-self: flex-start;
    width: 100%;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* gap: 20px; // svg 넣을 경우 추가하기 */
  margin: 40px 0;
`;

export const LoginTitle = styled.div`
  margin: 8px 0;
  font-size: 32px;
  font-weight: 700;
  color: ${colors.purple[50]};
  padding: 20px 0 40px 0;
`;

export const ButtonSignupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 34px 0;
  gap: 16px;
`;

export const SocialButton = styled.button`
  border: none;
  cursor: pointer;
  background: transparent;
  transition: transform 0.2s;
  padding-bottom: 12px;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 100%;
  }
`;

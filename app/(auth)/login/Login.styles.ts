import styled from 'styled-components';

export const LoginWrapper = styled.div`
  width: 100%;
  padding: 84px 16px 40px 16px;
  align-items: center;
  display: flex;
  flex-direction: column;

  /* Input 컴포넌트들과 AutoLoginCheckbox 컴포넌트 가운데 정렬에서 제외 */
  & > div[class*='Input'],
  & > div[class*='AutoLogin'] {
    align-self: flex-start;
    width: 100%;
  }
`;

export const LoginTitle = styled.div`
  margin: 8px 0;
  font-size: 30px;
`;

export const ButtonSignupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 34px 0;
  gap: 16px;
`;

export const SocialLoginWrapper = styled.div`
  display: flex;
  gap: 43px;
  justify-content: center;
  align-items: center;
`;

export const SocialButton = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: transparent;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  img {
    width: 100%;
    height: 100%;
  }
`;

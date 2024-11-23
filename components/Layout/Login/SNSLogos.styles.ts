import styled from 'styled-components';

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
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: scale(1.1);
  }
`;

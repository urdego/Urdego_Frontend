import styled from 'styled-components';
import colors from '@/styles/color/palette';

export const CharactersContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1.2;
  max-width: 430px;
  height: calc(100vh - 500px);
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CharacterWrapper = styled.div<{ animation?: string }>`
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease-in-out;

  img {
    width: auto;
    height: auto;
    max-width: 120px;
    max-height: 120px;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const Host = styled.div<{ isReady?: boolean }>`
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 700;
  color: ${({ isReady }) =>
    isReady ? `${colors.etc.white}` : `${colors.purple[50]}`};
  background-color: ${({ isReady }) =>
    isReady ? `${colors.purple[50]}` : `none`};
  border-radius: 4px;
  letter-spacing: -0.12px;
`;

export const Level = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: ${colors.etc.black};
  flex-shrink: 0;
`;

export const NickName = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: ${colors.etc.black};
  flex-shrink: 0;
`;

export const IsHost = styled.span`
  font-size: 12px;
  font-weight: normal;
  color: ${colors.etc.black};
`;
export const NicknameContainer = styled.div`
  display: flex;
  gap: 4px;
`;

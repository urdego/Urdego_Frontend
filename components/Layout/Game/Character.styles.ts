import styled from 'styled-components';
import colors from '@/styles/color/palette';

interface CharacterWrapperProps {
  animation?: string;
}

// const slideAnimation = keyframes`
// 0% {
//     transform: translateX(0) translateY(0) rotate(0deg);
//   }
//   25% {
//     transform: translateX(30px) translateY(50px) rotate(30deg);
//   }
//   50% {
//     transform: translateX(-40px) translateY(80px) rotate(-30deg);
//   }
//   75% {
//     transform: translateX(20px) translateY(-60px) rotate(60deg);
//   }
//   100% {
//     transform: translateX(0) translateY(0) rotate(0deg);
//   }
// `;

export const CharactersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin: 0 auto;
  position: relative;
`;

export const CharacterWrapper = styled.div<CharacterWrapperProps>`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

/* export const Host = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: ${colors.purple[50]};
  
`; */
export const Host = styled.div<{ isReady?: boolean }>`
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 700;
  color: ${({ isReady }) =>
    isReady ? `${colors.purple[50]}` : `${colors.purple[50]}`};
`;

export const Level = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: ${colors.etc.black};
`;

export const NickName = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: ${colors.etc.black};
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

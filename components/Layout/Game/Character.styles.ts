import colors from '@/styles/color/palette';
import styled from 'styled-components';

export const CharactersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 500px;
  margin: 0 auto;
  position: relative;
`;

export const CharacterWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;
export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
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

export const IsHost = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: ${colors.purple[50]};
`;

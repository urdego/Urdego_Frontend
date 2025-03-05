import styled from 'styled-components';
import colors from '@styles/color/palette';

export const ProfileInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const ImageWrapper = styled.div`
  margin-bottom: 12px;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;
`;

export const ProfileName = styled.div`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`;

export const ProfileEmail = styled.div`
  font-size: 12px;
  color: ${colors.gray[60]};
  text-align: center;
`;

export const Level = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${colors.purple[50]};
  border-radius: 4px;
  background: ${colors.purple[95]};
  height: 20px;
  padding: 0 10px;
  text-align: center;
  line-height: 20px;
`;

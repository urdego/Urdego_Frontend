import styled from 'styled-components';
import colors from '@styles/color/palette';

export const ProfileInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px; /* 프로필과 버튼 간 간격 */
`;

export const ImageWrapper = styled.div`
  margin-bottom: 12px; /* 이미지와 이름/이메일 간 간격 */
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProfileName = styled.div`
  font-size: 14px;
  margin-bottom: 4px; /* 이름과 이메일 간 간격 */
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
  font-style: normal;
  font-weight: 400;
  color: ${colors.purple[50]};
  border-radius: 4px;
  background: ${colors.purple[95]};
  height: 20px;
  padding: 0 10px;
  text-align: center;
  line-height: 20px;
  margin: 0 auto;
  margin-bottom: 3px;
`;

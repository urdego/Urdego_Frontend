import styled from 'styled-components';
import colors from '@/styles/color/palette';

export const MyPageWrapper = styled.div`
  padding: 0 16px;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0px;
`;

export const SmallButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Separator = styled.div`
  height: 9px;
  width: calc(100% + 32px); /* 부모 padding 16px * 2 보정 */
  margin: 0 -16px; /* MyPageWrapper의 padding 값 반영 */
  background-color: ${colors.gray[95]};
`;

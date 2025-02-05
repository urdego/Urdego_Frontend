import styled from 'styled-components';
import colors from '@/styles/color/palette';

export const PageWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 40px);
  padding: 0 16px 199px 16px;
`;

export const HomePageWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 40px);
  padding: 0 0 80px 0;
  background: linear-gradient(180deg, #fff 10%, #cabeff 100%);
  /* background-color: ${colors.purple[90]}; */
`;

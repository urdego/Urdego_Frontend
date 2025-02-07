import styled from 'styled-components';

export const SubTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0 8px 0;
`;

export const ListTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  line-height: 150%;
`;

export const RoomButtonGrid = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(1, 1fr);
  gap: 8px;
`;

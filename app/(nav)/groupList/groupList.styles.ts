import styled from 'styled-components';

export const SubTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 8px 8px 8px;
`;

export const ListTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  padding: 8px 0px;
`;

export const RoomButtonGrid = styled.div`
  display: grid;
  place-items: center;
  /* padding-left: 16px; */
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  width: 100%;
`;

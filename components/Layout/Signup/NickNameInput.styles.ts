import styled from 'styled-components';

export const NickNameWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 8px;

  > div:first-child {
    flex: 1;
    min-width: 0;
  }
`;

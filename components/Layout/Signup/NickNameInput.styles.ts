import styled from 'styled-components';

export const NickNameWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 8px;

  // Input 컴포넌트를 감싸는 div에 flex-grow 적용
  > div:first-child {
    flex: 1;
    min-width: 0; // flexbox 내에서 자식 요소가 부모 컨테이너를 넘어가는 것을 방지
  }
`;

import styled from 'styled-components';
export const HomeTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  align-self: stretch;
  padding-top: 24px;
`;

export const ChannelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 16px;
  height: 100%;
  flex: 1;
`;
// 임시 초대 토스트 보기 버튼 (TODO: 삭제 필요)
export const Button = styled.button`
  padding: 6px 12px;
`;

export const TopWrapper = styled.div`
  height: 450px;
  padding: 0 15px;
`;

export const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 240px;
  padding: 0 15px;
  position: absolute;
  bottom: 80px;
  width: 100%;
`;
export const UserInfo = styled.div`
  height: 152px;
`;
export const UserCharacter = styled.div``;

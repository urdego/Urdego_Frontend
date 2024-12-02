import styled from 'styled-components';
import colors from '@/styles/color/palette';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 12px 0;
  gap: 8px;
`;

export const Title = styled.h2`
  color: ${colors.etc.black};
  height: 24px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

export const SearchContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
  position: relative;
`;

export const Input = styled.input`
  flex: 1;
  height: 46px;
  padding: 12px;
  border: 1px solid ${colors.gray[70]};
  border-radius: 4px;
  color: ${colors.etc.black};
  font-size: 16px;
  box-sizing: border-box;
  font-weight: 400;
  line-height: 150%;

  &::placeholder {
    color: ${colors.gray[70]};
  }

  &:focus {
    outline: none;
  }
`;

export const InviteButton = styled.button<{ $isSelected: boolean }>`
  width: 80px;
  height: 46px;
  padding: 12px;
  background-color: ${(props) =>
    props.$isSelected ? colors.purple[50] : colors.gray[70]};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  box-sizing: border-box;
`;

export const SearchResultList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 90px;
  background: white;
  border: 1px solid ${colors.gray[70]};
  border-radius: 4px;
  margin: 3px 0 0;
  padding: 0;
  list-style: none;
  max-height: 200px;
  overflow-y: auto;
  z-index: 100000;
`;

export const SearchResultItem = styled.li`
  padding: 8px 12px;
  cursor: pointer;
  color: ${colors.etc.black};

  &:hover {
    background-color: ${colors.gray[70]};
  }
`;

export const InvitedFriendsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  gap: 8px;
`;

export const InvitedFriendsTitle = styled.h3`
  color: ${colors.etc.black};
  height: 24px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

export const InvitedFriendsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding-left: 12px;
  list-style: none;
`;

export const InvitedFriend = styled.li`
  color: ${colors.etc.black};
  font-size: 14px;
`;

export const InvitedFriendContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CancelButton = styled.button`
  color: ${colors.etc.black};
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  font-size: 14px;
  line-height: 1;
  margin-left: 8px;

  &:hover {
    opacity: 0.8;
    color: ${colors.alert[50]};
  }
`;

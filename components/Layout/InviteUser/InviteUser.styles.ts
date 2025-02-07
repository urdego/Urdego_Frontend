import styled from 'styled-components';
import { motion } from 'framer-motion';
import colors from '@/styles/color/palette';

export const BackgroundOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
`;

export const BottomSheet = styled(motion.div)<{ $isExpand: boolean }>`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 430px;
  height: ${({ $isExpand }) => ($isExpand ? '100vh' : '75vh')};
  background: ${colors.etc.white};
  border-radius: ${({ $isExpand }) => ($isExpand ? '0' : '20px 20px 0 0')};
  padding: 16px;
  z-index: 1000;
  overflow: hidden;
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding-bottom: 16px;
`;

export const HeaderHandler = styled.div`
  width: 40px;
  height: 4px;
  background: ${colors.gray[50]};
  border-radius: 100px;
`;

export const HeaderTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.etc.black};
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: calc(100% - 80px);
  overflow-y: auto;
`;

export const UserList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0;
`;

export const UserItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
`;

export const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${colors.gray[90]};
  flex-shrink: 0;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px; /* 요소 간 간격 조정 */
  flex-grow: 1;
  margin-left: 16px;
`;

export const UserId = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: ${colors.etc.black};
`;

export const Level = styled.span`
  font-size: 12px; /* 폰트 크기 조정 */
  font-weight: 400;
  color: ${colors.gray[70]};
`;

export const UserStatus = styled.span<{ $status: string }>`
  font-size: 14px; /* 폰트 크기 조정 */
  color: ${({ $status }) =>
    $status === '온라인'
      ? colors.etc.green
      : $status === '게임중'
        ? colors.alert[50]
        : colors.gray[70]};
  display: flex;
  align-items: center;
  gap: 4px;

  &::before {
    content: '●';
    font-size: 8px;
    color: ${({ $status }) =>
      $status === '온라인'
        ? colors.etc.green
        : $status === '게임중'
          ? colors.alert[50]
          : colors.gray[70]};
  }
`;

export const InviteButton = styled.button<{ $invited: boolean }>`
  width: 74px;
  height: 30px;
  padding: 8px 16px;
  font-size: 12px;
  color: ${colors.etc.white};
  background: ${({ $invited }) =>
    $invited ? colors.purple[80] : colors.purple[50]};
  border: none;
  border-radius: 999px;
  cursor: ${({ $invited }) => ($invited ? 'default' : 'pointer')};
  flex-shrink: 0;
`;

export const SearchBarWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  background: ${colors.gray[95]};
  border-radius: 999px;
  padding: 8px 16px;
  gap: 8px;
`;

export const SearchBar = styled.input`
  width: 100%;
  height: 24px;
  font-size: 16px;
  border: none;
  outline: none;
  background: transparent;

  &::placeholder {
    color: ${colors.gray[70]};
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  line-height: 0; // 이미지 여백 제거
`;

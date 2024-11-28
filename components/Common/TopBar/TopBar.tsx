'use client';

import { useRouter } from 'next/navigation';
import {
  Nav,
  BackIconWrapper,
  RightIconsWrapper,
  Label,
  ExitButtonWrapper,
} from './TopBar.styles';
import { BackIcon, AlarmIcon, FriendIcon, ExitIcon } from './TopBarIcon';

// default : 뒤로가기 아이콘 + 라벨
// other : 뒤로가기 아이콘 + 라벨 + 알람 아이콘 + 친구 아이콘
// main : 알람 아이콘 + 친구 아이콘
// game : 뒤로가기 아이콘 + 라벨
// room : 라벨 + 나가기 아이콘(오른쪽)
interface TopBarProps {
  NavType?: 'default' | 'other' | 'main' | 'game' | 'room';
  label?: string;
  backIcon?: boolean;
  alarmIcon?: boolean;
  friendIcon?: boolean;
  isMapView?: boolean; // 지도일 경우만 뒤로가기 버튼 사용
  onBackClick?: () => void;
  exitIcon?: boolean;
  onExitClick?: () => void;
}

const TopBar = ({
  NavType = 'other',
  label,
  backIcon = true,
  alarmIcon = true,
  friendIcon = true,
  isMapView = false,
  onBackClick,
  exitIcon = false,
  onExitClick,
}: TopBarProps) => {
  const router = useRouter();

  const handleBackClick = () => {
    // "게임 화면"일 때는 페이지 이동 없이 상태 변경만 하고, 다른 경우에는 페이지 이동
    if (NavType === 'game') {
      if (onBackClick) {
        onBackClick(); // 외부에서 전달된 onBackClick 호출 (상태 변경 등)
      }
    } else {
      router.back(); // "게임 화면"이 아닐 때는 이전 페이지로 돌아감
    }
  };

  const handleExitClick = () => {
    if (onExitClick) {
      onExitClick();
    } else {
      router.push('/groupList');
    }
  };

  return (
    <Nav $NavType={NavType}>
      {NavType === 'game' && (
        <>
          {isMapView &&
            backIcon && ( // 지도 화면에서만 뒤로가기 표시
              <BackIconWrapper onClick={handleBackClick}>
                <BackIcon />
              </BackIconWrapper>
            )}
          <Label>{label}</Label>
        </>
      )}
      {NavType === 'default' && (
        <>
          {backIcon && (
            <BackIconWrapper onClick={handleBackClick}>
              <BackIcon />
            </BackIconWrapper>
          )}
          <Label>{label}</Label>
        </>
      )}
      {NavType === 'other' && (
        <>
          {backIcon && (
            <BackIconWrapper onClick={handleBackClick}>
              <BackIcon />
            </BackIconWrapper>
          )}
          <Label>{label}</Label>
          <RightIconsWrapper $NavType={NavType}>
            {alarmIcon && <AlarmIcon />}
            {friendIcon && <FriendIcon />}
          </RightIconsWrapper>
        </>
      )}
      {NavType === 'main' && (
        <RightIconsWrapper $NavType={NavType}>
          {alarmIcon && <AlarmIcon />}
          {friendIcon && <FriendIcon />}
        </RightIconsWrapper>
      )}
      {NavType === 'room' && (
        <>
          <Label>{label}</Label>
          {exitIcon && (
            <ExitButtonWrapper onClick={handleExitClick}>
              <ExitIcon />
            </ExitButtonWrapper>
          )}
        </>
      )}
    </Nav>
  );
};

export default TopBar;

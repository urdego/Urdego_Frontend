'use client';

import { useRouter } from 'next/navigation';
import { Nav, BackIconWrapper, RightIconsWrapper, Label } from "./TopBar.styles";
import { BackIcon, AlarmIcon, FriendIcon } from "./TopBarIcon";

interface TopBarProps {
  NavType?: "default" | "other" | "main";
  label?: string;
  backIcon?: boolean;
  alarmIcon?: boolean;
  friendIcon?: boolean;
}

const TopBar = ({
  NavType = "other",
  label,
  backIcon = true,
  alarmIcon = true,
  friendIcon = true
}: TopBarProps) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <Nav $NavType={NavType}>
      {NavType === "default" && (
        <>
          {backIcon && (
            <BackIconWrapper onClick={handleBackClick}>
              <BackIcon />
            </BackIconWrapper>
          )}
          <Label>{label}</Label>
        </>
      )}
      {NavType === "other" && (
        <>
          {backIcon && (
            <BackIconWrapper onClick={handleBackClick}>
              <BackIcon />
            </BackIconWrapper>
          )}
          <Label>{label}</Label>
          <RightIconsWrapper>
            {alarmIcon && <AlarmIcon />}
            {friendIcon && <FriendIcon />}
          </RightIconsWrapper>
        </>
      )}
      {NavType === "main" && (
        <RightIconsWrapper>
          {alarmIcon && <AlarmIcon />}
          {friendIcon && <FriendIcon />}
        </RightIconsWrapper>
      )}
    </Nav>
  );
};

export default TopBar;
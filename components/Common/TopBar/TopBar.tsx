"use client";
import { Nav, BackIconWrapper, RightIconsWrapper, Label } from "./TopBar.styles";
import { BackIcon, AlarmIcon, FriendIcon } from "./TopBarIcon";

// default : 뒤로가기 아이콘 + 라벨 
// other : 뒤로가기 아이콘 + 라벨 + 알람 아이콘 + 친구 아이콘 
// main : 알람 아이콘 + 친구 아이콘
interface TopBarProps {
  NavType?: "default" | "other" | "main"; 
  label?: string;
  backIcon?: boolean;
  alarmIcon?: boolean;
  friendIcon?: boolean;
}

const TopBar = ({ NavType = "other", label, backIcon=true, alarmIcon=true, friendIcon=true }: TopBarProps) => {
  return (
    <Nav $NavType={NavType}>
      {NavType === "default" && (
        <>
          {backIcon && <BackIconWrapper><BackIcon /></BackIconWrapper>}
          <Label>{label}</Label>
        </>
      )}
      {NavType === "other" && (
        <>
          {backIcon && <BackIconWrapper><BackIcon /></BackIconWrapper>}
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
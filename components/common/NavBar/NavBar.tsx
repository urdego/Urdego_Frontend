"use client";
import Link from "next/link";
import { Nav, NavItem, IconPlaceholder, NavBarText } from "./NavBar.styles";

const NavBar = () => {
  return (
    <Nav>
      <Link href="/home">
        <NavItem>
          <IconPlaceholder />
          <NavBarText>홈</NavBarText>
        </NavItem>
      </Link>
      <Link href="/placeRegister">
        <NavItem>
          <IconPlaceholder />
          <NavBarText>장소등록</NavBarText>
        </NavItem>
      </Link>
      <Link href="/rank">
        <NavItem>
          <IconPlaceholder />
          <NavBarText>랭킹</NavBarText>
        </NavItem>
      </Link>
      <Link href="/myPage">
        <NavItem>
          <IconPlaceholder />
          <NavBarText>마이페이지</NavBarText>
        </NavItem>
      </Link>
    </Nav>
  );
};

export default NavBar;

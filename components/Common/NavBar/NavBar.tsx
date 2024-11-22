'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Nav, NavItem, NavBarText } from '@/components/Common/NavBar/NavBar.styles';
import {
  HomeIcon,
  HomeColorIcon,
  MapIcon,
  MapColorIcon,
  StarIcon,
  StarColorIcon,
  MypageIcon,
  MypageColorIcon,
} from '@/components/Common/NavBar/NavIcon';

const NavBar = () => {
  const [selected, setSelected] = useState<string>('home');

  return (
    <Nav>
      <Link href="/home" passHref>
        <NavItem onClick={() => setSelected('home')}>
          {selected === 'home' ? <HomeColorIcon /> : <HomeIcon />}
          <NavBarText>홈</NavBarText>
        </NavItem>
      </Link>
      <Link href="/placeRegister" passHref>
        <NavItem onClick={() => setSelected('placeRegister')}>
          {selected === 'placeRegister' ? <MapColorIcon /> : <MapIcon />}
          <NavBarText>장소등록</NavBarText>
        </NavItem>
      </Link>
      <Link href="/rank" passHref>
        <NavItem onClick={() => setSelected('rank')}>
          {selected === 'rank' ? <StarColorIcon /> : <StarIcon />}
          <NavBarText>랭킹</NavBarText>
        </NavItem>
      </Link>
      <Link href="/mypage" passHref>
        <NavItem onClick={() => setSelected('myPage')}>
          {selected === 'mypage' ? <MypageColorIcon /> : <MypageIcon />}
          <NavBarText>마이페이지</NavBarText>
        </NavItem>
      </Link>
    </Nav>
  );
};

export default NavBar;

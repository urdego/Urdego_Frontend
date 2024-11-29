'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Nav,
  NavItem,
  NavBarText,
} from '@/components/Common/NavBar/NavBar.styles';
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
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const [selected, setSelected] = useState<string>('home');
  const pathname = usePathname();

  useEffect(() => {
    // URL에서 '/' 다음 경로를 추출해서 가져오기
    const path = pathname.split('/')[1];
    setSelected(path === 'groupList' ? 'home' : path);
  }, [pathname]);

  return (
    <Nav>
      <Link href="/home" passHref>
        <NavItem onClick={() => setSelected('home')}>
          {selected === 'home' || selected === 'groupList' ? (
            <HomeColorIcon />
          ) : (
            <HomeIcon />
          )}
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
        <NavItem onClick={() => setSelected('mypage')}>
          {selected === 'mypage' ? <MypageColorIcon /> : <MypageIcon />}
          <NavBarText>마이페이지</NavBarText>
        </NavItem>
      </Link>
    </Nav>
  );
};

export default NavBar;

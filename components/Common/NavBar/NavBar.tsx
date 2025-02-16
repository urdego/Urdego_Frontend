'use client';
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
  const pathname = usePathname();

  return (
    <Nav>
      <Link href="/home" passHref>
        <NavItem>
          {pathname === '/home' || pathname === '/waitingRoomList' ? (
            <HomeColorIcon />
          ) : (
            <HomeIcon />
          )}
          <NavBarText>홈</NavBarText>
        </NavItem>
      </Link>
      <Link href="/content/register" passHref>
        <NavItem>
          {pathname === '/content/register' ? <MapColorIcon /> : <MapIcon />}
          <NavBarText>장소등록</NavBarText>
        </NavItem>
      </Link>
      <Link href="/rank" passHref>
        <NavItem>
          {pathname === '/rank' ? <StarColorIcon /> : <StarIcon />}
          <NavBarText>랭킹</NavBarText>
        </NavItem>
      </Link>
      <Link href="/myPage" passHref>
        <NavItem>
          {pathname === '/myPage' ? <MypageColorIcon /> : <MypageIcon />}
          <NavBarText>마이페이지</NavBarText>
        </NavItem>
      </Link>
    </Nav>
  );
};

export default NavBar;

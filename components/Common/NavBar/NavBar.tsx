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
          <NavBarText
            isActive={pathname === '/home' || pathname === '/waitingRoomList'}
          >
            홈
          </NavBarText>
        </NavItem>
      </Link>
      <Link href="/content/register" passHref>
        <NavItem>
          {pathname === '/content/register' ? <MapColorIcon /> : <MapIcon />}
          <NavBarText isActive={pathname === '/content/register'}>
            장소등록
          </NavBarText>
        </NavItem>
      </Link>
      <Link href="/myPage" passHref>
        <NavItem>
          {pathname === '/myPage' ? <MypageColorIcon /> : <MypageIcon />}
          <NavBarText isActive={pathname === '/myPage'}>마이페이지</NavBarText>
        </NavItem>
      </Link>
    </Nav>
  );
};

export default NavBar;

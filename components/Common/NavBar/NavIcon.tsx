import Image from 'next/image';
import HomeIconSrc from '@/styles/Icon/Navbar/Home.svg';
import HomeColorIconSrc from '@/styles/Icon/Navbar/HomeColor.svg';
import MapIconSrc from '@/styles/Icon/Navbar/Map.svg';
import MapColorIconSrc from '@/styles/Icon/Navbar/MapColor.svg';
import MypageIconSrc from '@/styles/Icon/Navbar/Mypage.svg';
import MypageColorIconSrc from '@/styles/Icon/Navbar/MypageColor.svg';

export const HomeIcon = () => <Image src={HomeIconSrc} alt="Home Icon" />;
export const HomeColorIcon = () => (
  <Image src={HomeColorIconSrc} alt="Home Color Icon" />
);

export const MapIcon = () => <Image src={MapIconSrc} alt="Map Icon" />;
export const MapColorIcon = () => (
  <Image src={MapColorIconSrc} alt="Map Color Icon" />
);

export const MypageIcon = () => <Image src={MypageIconSrc} alt="Mypage Icon" />;
export const MypageColorIcon = () => (
  <Image src={MypageColorIconSrc} alt="Mypage Color Icon" />
);

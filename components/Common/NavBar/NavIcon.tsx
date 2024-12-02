import Image from 'next/image';
import HomeIconSrc from '@/styles/Icon/Home.svg';
import HomeColorIconSrc from '@/styles/Icon/HomeColor.svg';
import MapIconSrc from '@/styles/Icon/Map.svg';
import MapColorIconSrc from '@/styles/Icon/MapColor.svg';
import StarIconSrc from '@/styles/Icon/Star.svg';
import StarColorIconSrc from '@/styles/Icon/StarColor.svg';
import MypageIconSrc from '@/styles/Icon/Mypage.svg';
import MypageColorIconSrc from '@/styles/Icon/MypageColor.svg';

export const HomeIcon = () => <Image src={HomeIconSrc} alt="Home Icon" />;
export const HomeColorIcon = () => (
  <Image src={HomeColorIconSrc} alt="Home Color Icon" />
);

export const MapIcon = () => <Image src={MapIconSrc} alt="Map Icon" />;
export const MapColorIcon = () => (
  <Image src={MapColorIconSrc} alt="Map Color Icon" />
);

export const StarIcon = () => <Image src={StarIconSrc} alt="Star Icon" />;
export const StarColorIcon = () => (
  <Image src={StarColorIconSrc} alt="Star Color Icon" />
);

export const MypageIcon = () => <Image src={MypageIconSrc} alt="Mypage Icon" />;
export const MypageColorIcon = () => (
  <Image src={MypageColorIconSrc} alt="Mypage Color Icon" />
);

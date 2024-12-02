'use client';
import { useRouter } from 'next/navigation';
import Slider from 'react-slick';
import Button from '@/components/Common/Button/Button';
import {
  PageWrapper,
  OnBoardingWrapper,
  ButtonContainer,
  SlideContainer,
  SlideContent,
  SlideTitle,
  SlideDescription,
  SlideImage,
} from './onBoarding.styles';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SnowMan1 from '@/styles/Icon/SnowMan1.svg';
import SnowMan2 from '@/styles/Icon/SnowMan2.svg';
import SnowMan3 from '@/styles/Icon/SnowMan3.svg';
import SnowMan4 from '@/styles/Icon/SnowMan4.svg';

const OnBoarding = () => {
  const router = useRouter();

  // TODO : 마지막 슬라이드에서 첫번째 슬라이드로 넘어갈 때 끊어지는 이슈
  const settings = {
    dots: true, // 네비게이션 버튼
    infinite: true, // 무한 반복
    speed: 500, // 슬라이드 이동 속도
    slidesToShow: 1, // 한 번에 보여줄 슬라이드 개수
    slidesToScroll: 1, // 한 번에 스크롤할 슬라이드 개수
    arrows: false, // 좌우 버튼 숨김
    autoplay: true, // 자동 재생 활성화
    autoplaySpeed: 3000, // 3초마다 슬라이드 변경
    pauseOnHover: true, // 마우스 호버시 일시정지
    cssEase: 'linear', // 부드러운 전환
  };

  const slides = [
    {
      title: '어서오세요 👋',
      description: '어데고에 오신 것을 환영합니다!',
      image: SnowMan1,
    },
    {
      title: '내가 등록한 사진과 동영상으로',
      description: '추억할 장소를 저장하고',
      image: SnowMan2,
    },
    {
      title: '저장한 장소를 통해',
      description: '함께한 장소를 추측해보세요!',
      image: SnowMan3,
    },
    {
      title: '이제 시작해볼까요?',
      description: '어데고와 함께 추억을 공유해봐요 🚩',
      image: SnowMan4,
    },
  ];

  return (
    <PageWrapper>
      <OnBoardingWrapper>
        <SlideContainer>
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <SlideContent key={index}>
                <SlideTitle>{slide.title}</SlideTitle>
                <SlideDescription>{slide.description}</SlideDescription>
                <SlideImage
                  src={slide.image}
                  alt={`온보딩 이미지 ${index + 1}`}
                  width={300}
                  height={300}
                />
              </SlideContent>
            ))}
          </Slider>
        </SlideContainer>
        <ButtonContainer>
          <Button
            label="시작하기"
            onClick={() => router.push('/login')}
            buttonType="purple"
            buttonSize="large"
          />
        </ButtonContainer>
      </OnBoardingWrapper>
    </PageWrapper>
  );
};

export default OnBoarding;

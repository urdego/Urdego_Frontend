'use client';
import { useRouter } from 'next/navigation';
import Slider from 'react-slick';
import Button from '@/components/Common/Button/Button';
import {
  PageWrapper,
  OnBoardingWrapper,
  ButtonContainer,
  TextWrapper,
  ImageWrapper,
  SlideContainer,
  SlideContent,
  SlideTitle,
  SlideDescription,
  SlideImage,
} from './onBoarding.styles';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SnowMan1 from '@/styles/Icon/SnowMan1.svg';
import OnBoarding2 from '@/styles/Icon/OnBoarding2.svg';
import OnBoarding3 from '@/styles/Icon/OnBoarding3.svg';
import OnBoarding4 from '@/styles/Icon/OnBoarding4.svg';

const OnBoarding = () => {
  const router = useRouter();

  // TODO : 마지막 슬라이드에서 첫번째 슬라이드로 넘어갈 때 끊어지는 이슈 (fade 옵션으로 해결!)
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
    fade: true,
  };

  const slides = [
    {
      title: '“어데고?!”',
      description: `가족, 커플, 친구들과 함께 방문했던 장소를 
새롭게 추억하며 위치를 맞춰보세요!`,
      image: SnowMan1,
    },
    {
      title: '장소 등록하기',
      description: '하단의 네비게이션 바의 ‘장소등록’을 탭해주세요.',
      image: OnBoarding2,
      width: 300,
      height: 500,
    },
    {
      title: '장소 등록하기',
      description: `장소 사진, 장소명, 위치추가하기, 힌트 작성을 해주세요.
장소는 한 번에 최대 3개씩 등록이 가능합니다.`,
      image: OnBoarding3,
    },
    {
      title: '정답 제출하기',
      description: `추억이 담긴 장소에 대해 유추를 하며,
함께 장소의 위치를 찾으며 얻는 “재미”를 느껴보세요!`,
      image: OnBoarding4,
    },
  ];

  return (
    <PageWrapper>
      <OnBoardingWrapper>
        <SlideContainer>
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <SlideContent key={index}>
                <ImageWrapper $isSecondSlide={index === 1}>
                  <SlideImage
                    src={slide.image}
                    alt={`온보딩 이미지 ${index + 1}`}
                  />
                </ImageWrapper>
                <TextWrapper $isFirstSlide={index === 0}>
                  <SlideTitle>{slide.title}</SlideTitle>
                  <SlideDescription>{slide.description}</SlideDescription>
                </TextWrapper>
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

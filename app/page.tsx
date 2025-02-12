'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Slider from 'react-slick';
import {
  OnBoardingWrapper,
  SlideContainer,
  SlideContent,
  SlideTitle,
  SlideDescription,
} from './onBoarding.styles';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const OnBoarding = () => {
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    cssEase: 'linear',
    swipe: true,
    swipeToSlide: true,
    beforeChange: (current: number, next: number) => {
      setCurrentSlide(next);
    },
    afterChange: (current: number) => {
      setCurrentSlide(current);
      if (current === slides.length - 1) {
        router.push('/login');
      }
    },
  };

  const slides = [
    {
      title: '장소 위 유추 게임',
      description: `첫 여행, 드라이브 갔던 바다, 좋아하는 카페
      당신의 발자취를 기억해보는 시간을 가져보세요.`,
    },
    {
      title: `추억이 있거나
      방문한 장소 등록`,
      description: `하단의 “장소등록”을 눌러
      가봤던 혹은 좋았던 장소를 기록해 보세요.`,
    },
    {
      title: '간편하게 장소 자동 등록',
      description: `'어데고?!'가 알려주는 팁을 통해
      일일이 등록하지 말고 자동으로 등록해보세요.`,
    },
    {
      title: '장소를 상기하며 위치 추리',
      description: `추억을 나눈 사람 혹은 다른 사람들과
      즐겁게 추억을 되새겨보세요.`,
    },
  ];

  return (
    <>
      <OnBoardingWrapper $currentSlide={currentSlide}>
        <SlideContainer>
          <Slider ref={sliderRef} {...settings}>
            {slides.map((slide, index) => (
              <SlideContent key={index}>
                <SlideTitle>{slide.title}</SlideTitle>
                <SlideDescription>{slide.description}</SlideDescription>
              </SlideContent>
            ))}
          </Slider>
        </SlideContainer>
      </OnBoardingWrapper>
    </>
  );
};

export default OnBoarding;

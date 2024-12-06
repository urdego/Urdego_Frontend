'use client';

import { useState, useRef } from 'react';
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
import OnBoarding1 from '@/styles/Icon/OnBoarding/OnBoarding1.svg';
import OnBoarding2 from '@/styles/Icon/OnBoarding2.svg';
import OnBoarding3 from '@/styles/Icon/OnBoarding/OnBoarding3.gif';
import OnBoarding4 from '@/styles/Icon/OnBoarding/OnBoarding4.gif';

const OnBoarding = () => {
  const router = useRouter();
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    cssEase: 'linear',
    fade: true,
    beforeChange: (current: number, next: number) => {
      setCurrentSlide(next);
    },
  };

  const slides = [
    {
      title: '“어데고?!”',
      description: `가족, 커플, 친구들과 함께 방문했던 장소를 
새롭게 추억하며 위치를 맞춰보세요!`,
      image: OnBoarding1,
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
          <Slider ref={sliderRef} {...settings}>
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
          {currentSlide === slides.length - 1 ? (
            <Button
              label="시작하기"
              onClick={() => router.push('/login')}
              buttonType="purple"
              buttonSize="large"
            />
          ) : (
            <Button
              label="다음으로"
              onClick={() => {
                sliderRef.current?.slickNext();
              }}
              buttonType="purple"
              buttonSize="large"
            />
          )}
        </ButtonContainer>
      </OnBoardingWrapper>
    </PageWrapper>
  );
};

export default OnBoarding;

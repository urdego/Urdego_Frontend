'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperContainer, StyledSwiperSlide, Image } from './Swiper.styles';

import 'swiper/css';

const images = [
  'https://swiperjs.com/demos/images/nature-1.jpg',
  'https://swiperjs.com/demos/images/nature-1.jpg',
  'https://swiperjs.com/demos/images/nature-3.jpg',
];

const SwiperComponent = () => {
  // 슬라이드 복제: 슬라이드가 3개 미만이면 복제해서 최소 3개로 보이도록 처리
  const slides = images.length < 3 ? [...images, ...images] : images;
  const applySlideStyles = (swiper: any) => {
    const slides = swiper.slides;
    slides.forEach((slide: any, index: number) => {
      slide.style.zIndex = index === swiper.activeIndex ? '10' : '1';
      slide.style.opacity = index === swiper.activeIndex ? '1' : '0.5';
      slide.style.transform =
        index === swiper.activeIndex ? 'scale(1)' : 'scale(0.9)';
    });
  };

  return (
    <SwiperContainer>
      <Swiper
        grabCursor={true} // 마우스 커서 잡기 설정
        centeredSlides={true} // 슬라이드 중앙 정렬
        slidesPerView={1.5} // 슬라이드가 일부 겹쳐 보이도록 설정
        spaceBetween={-50} // 슬라이드 간 간격 설정
        loop={images.length > 3} // 슬라이드가 2장 이상일 경우에만 무한 스크롤
        initialSlide={0} // 초기 슬라이드 설정(TODO: 라운드별로 다른 이미지 보여주기)
        onSwiper={applySlideStyles}
        onSlideChange={applySlideStyles}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <StyledSwiperSlide>
              <Image src={src} alt={`Slide ${index}`} />
            </StyledSwiperSlide>
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperContainer>
  );
};

export default SwiperComponent;

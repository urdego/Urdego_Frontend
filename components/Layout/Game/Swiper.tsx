'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperContainer, StyledSwiperSlide, Image } from './Swiper.styles';

import 'swiper/css';

const images = [
  // TODO: 초기 렌더링 시 두번째 이미지가 안보이는 이슈(스와이퍼 위치 이슈)
  'https://swiperjs.com/demos/images/nature-1.jpg',
  'https://swiperjs.com/demos/images/nature-2.jpg',
  'https://swiperjs.com/demos/images/nature-3.jpg',
];

const SwiperComponent = () => {
  return (
    <SwiperContainer>
      <Swiper
        grabCursor={true} // 마우스 커서 잡기 설정
        centeredSlides={true} // 슬라이드 중앙 정렬
        slidesPerView={1.5} // 슬라이드가 일부 겹쳐 보이도록 설정
        spaceBetween={-50} // 슬라이드 간 간격 설정
        loop={images.length > 1} // 슬라이드가 2장 이상일 경우에만 무한 스크롤
        initialSlide={0} // 초기 슬라이드 설정(TODO: 라운드별로 다른 이미지 보여주기)
        onSlideChange={(swiper) => {
          // 활성 슬라이드와 비활성 슬라이드 스타일 설정
          const slides = swiper.slides;
          slides.forEach((slide, index) => {
            if (index === swiper.activeIndex) {
              slide.style.zIndex = '10'; // 현재 활성화된 슬라이드
              slide.style.opacity = '1';
              slide.style.transform = 'scale(1)';
            } else {
              slide.style.zIndex = '1'; // 비활성화된 슬라이드
              slide.style.opacity = '0.5';
              slide.style.transform = 'scale(0.9)';
            }
          });
        }}
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

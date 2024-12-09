'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  SwiperContainer,
  StyledSwiperSlide,
  ImageContainer,
} from './Swiper.styles';
import { Swiper as SwiperType } from 'swiper/types';
import Image from 'next/image';
import 'swiper/css';

interface SwiperProps {
  images: string[];
}

const SwiperComponent: React.FC<SwiperProps> = ({ images }) => {
  // 이미지가 없을 경우 처리
  if (!images || images.length === 0) {
    console.log('이미지가 없습니다.');
    return null;
  }

  const applySlideStyles = (swiper: SwiperType) => {
    const slides = swiper.slides;
    slides.forEach((slide: HTMLElement, index: number) => {
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
              <ImageContainer>
                <Image
                  src={src}
                  alt={`Slide ${index}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority={true}
                />
              </ImageContainer>
            </StyledSwiperSlide>
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperContainer>
  );
};

export default SwiperComponent;

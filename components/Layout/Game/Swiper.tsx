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

const SwiperComponent = ({ contents }: { contents: string[] }) => {
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
        slidesPerView={contents.length > 1 ? 1.4 : 1} // 이미지가 1개일 때는 1개만 보이도록 설정
        spaceBetween={contents.length > 1 ? -50 : 0} // 이미지가 1개일 때는 간격 조정
        loop={contents.length > 1} // 2장 이상일 때만 무한 루프 적용
        initialSlide={0} // 초기 슬라이드 설정(TODO: 라운드별로 다른 이미지 보여주기)
        onSwiper={applySlideStyles}
        onSlideChange={applySlideStyles}
      >
        {contents.map((content, index) => (
          <SwiperSlide key={index}>
            <StyledSwiperSlide>
              <ImageContainer>
                <Image
                  key={index}
                  src={content}
                  alt={`Slide ${index + 1}`}
                  priority={true}
                  width={262}
                  height={280}
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

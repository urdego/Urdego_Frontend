'use client';
import React, { useEffect, useRef } from 'react';
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
  const swiperRef = useRef<SwiperType | null>(null);

  const applySlideStyles = (swiper: SwiperType) => {
    const slides = swiper.slides;
    slides.forEach((slide: HTMLElement, index: number) => {
      slide.style.zIndex = index === swiper.activeIndex ? '10' : '1';
      slide.style.opacity = index === swiper.activeIndex ? '1' : '0.5';
      slide.style.transform =
        index === swiper.activeIndex ? 'scale(1)' : 'scale(0.9)';
    });
  };

  // 슬라이드 초기 설정을 위한 useEffect 추가
  useEffect(() => {
    if (swiperRef.current && contents.length > 1) {
      // loop 모드: 실제 인덱스가 복제된 슬라이드를 고려하여 조정
      // 첫 번째 이미지가 중앙에 오도록 설정
      swiperRef.current.slideTo(0, 0, false);
      applySlideStyles(swiperRef.current);
    }
  }, [contents.length]);

  return (
    <SwiperContainer>
      <Swiper
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={contents.length > 1 ? 1.4 : 1}
        spaceBetween={contents.length > 1 ? -50 : 0}
        loop={contents.length > 1}
        initialSlide={0}
        loopAdditionalSlides={contents.length} // 충분한 수의 슬라이드 복제
        onInit={(swiper) => {
          // 초기화 직후 실행
          if (contents.length > 1) {
            swiper.slideTo(0, 0, false);
            applySlideStyles(swiper);
          }
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          applySlideStyles(swiper);

          // 이미지가 여러 장일 때 초기 위치 조정
          if (contents.length > 1) {
            // 비동기로 처리하여 DOM이 완전히 로드된 후 실행
            setTimeout(() => {
              swiper.slideTo(0, 0, false);
              applySlideStyles(swiper);
            }, 10);
          }
        }}
        onSlideChange={applySlideStyles}
        onAfterInit={applySlideStyles}
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

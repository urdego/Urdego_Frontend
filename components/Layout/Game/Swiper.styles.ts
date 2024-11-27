import styled from 'styled-components';
import { SwiperSlide } from 'swiper/react';

export const SwiperContainer = styled.div`
  width: calc(100% - 32px);
  margin: 0 auto;
  padding-top: 12px;
  padding-bottom: 50px;
`;

export const StyledSwiperSlide = styled(SwiperSlide)`
  background: #f8f8f8;
  border-radius: 15px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  max-width: 262px;
  max-height: 280px;
  height: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: scale(1.05); // 슬라이드 호버 시 확대 효과
    transition: transform 0.3s ease-in-out;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

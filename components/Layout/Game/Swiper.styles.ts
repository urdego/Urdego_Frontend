import styled from 'styled-components';
import { SwiperSlide } from 'swiper/react';

export const SwiperContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 16px 12px;
`;

export const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 280px;
  width: 100%;
  max-width: 262px;
  flex-shrink: 0;
  overflow: visible;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease-in-out;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 262px;
  height: 280px;
  background: lightgrey 50% cover no-repeat;
`;

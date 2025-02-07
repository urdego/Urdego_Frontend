import styled from 'styled-components';
import { SwiperSlide } from 'swiper/react';

export const SwiperContainer = styled.div`
  width: calc(100% - 30px);
  position: relative;
`;

export const StyledSwiperSlide = styled(SwiperSlide)`
  max-width: 262px;
  height: 280px;
  width: 100%;
  flex-shrink: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease-in-out;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: lightgrey 50% cover no-repeat;
`;

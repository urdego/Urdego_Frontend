import styled from 'styled-components';
import colors from '@/styles/color/palette';
import OnBoarding1 from '@/styles/Icon/OnBoarding/onboarding-01.png';
import OnBoarding2 from '@/styles/Icon/OnBoarding/onboarding-02.png';
import OnBoarding3 from '@/styles/Icon/OnBoarding/onboarding-03.png';
import OnBoarding4 from '@/styles/Icon/OnBoarding/onboarding-04.png';

const backgrounds = [
  OnBoarding1.src,
  OnBoarding2.src,
  OnBoarding3.src,
  OnBoarding4.src,
];

export const OnBoardingWrapper = styled.div<{ $currentSlide: number }>`
  width: 100%;
  min-height: 100vh;
  background-image: url('${({ $currentSlide }) => backgrounds[$currentSlide]}');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  touch-action: none; // 브라우저 기본 터치 동작 비활성화
`;

export const SlideContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;

  .slick-slider,
  .slick-list,
  .slick-track {
    height: 100vh; // 전체 높이 적용
  }

  .slick-slide {
    display: flex; // 높이 100% 유지 (중요)
    align-items: center; // 중앙 정렬
    justify-content: center; // 중앙 정렬
    height: 100%;
    padding-top: 124px;

    > div {
      width: 100%;
      height: 100%;
    }
  }
  .slick-dots {
    position: absolute;
    top: 100px; // 슬라이드의 title 위로 이동
    left: 50%;
    transform: translateX(-50%);
    z-index: 1; // 다른 요소 위에 표시되도록 설정
    pointer-events: none; // dot이 스와이프를 방해하지 않도록 설정

    li {
      margin: 0 0.2px;

      button:before {
        font-size: 10px;
        color: ${colors.gray[90]};
        opacity: 1;
      }
    }

    li.slick-active button:before {
      color: ${colors.etc.black};
      opacity: 1;
    }
  }
`;

export const SlideContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center; // 중앙 정렬
  text-align: center;
`;

export const SlideTitle = styled.h2`
  display: flex;
  height: 72px;
  flex-direction: column;
  justify-content: center;
  align-self: stretch;
  font-size: 24px;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: -0.24px;
  color: ${colors.etc.black};
`;

export const SlideDescription = styled.p`
  font-size: 16px;
  color: ${colors.gray[70]};
  line-height: 150%;
  letter-spacing: -0.16px;
  white-space: pre-line;
`;

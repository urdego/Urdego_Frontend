import Image from 'next/image';
import styled from 'styled-components';
import colors from '@/styles/color/palette';

export const PageWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 60px);
`;

export const OnBoardingWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const SlideContainer = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  // 자동 슬라이드 기능
  .slick-slider {
    flex: 1;
    .slick-track,
    .slick-list {
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }

  .slick-dots {
    position: fixed;
    bottom: 110px;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
    li {
      margin: 0 2px;

      button:before {
        font-size: 12px;
        color: ${colors.gray[90]};
        opacity: 1;
      }
    }

    li.slick-active button:before {
      color: ${colors.purple[50]};
      opacity: 1;
    }
  }
`;

export const SlideContent = styled.div`
  display: fixed;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; // 상단 정렬로 변경
  text-align: center;
  padding: 80px 0 0 0; // 상단 패딩만 지정
  height: 100%; // 전체 높이 사용
`;

export const ImageWrapper = styled.div<{ $isSecondSlide?: boolean }>`
  width: 100%;
  padding-top: ${({ $isSecondSlide }) => ($isSecondSlide ? '110px' : '0')};
`;

export const TextWrapper = styled.div<{ $isFirstSlide?: boolean }>`
  width: 100%;
  max-width: 430px;
  padding: 0;
  text-align: ${({ $isFirstSlide }) => ($isFirstSlide ? 'center' : 'left')};
  box-sizing: border-box;
  margin-left: ${({ $isFirstSlide }) => ($isFirstSlide ? 'auto' : '0')};
  margin-right: ${({ $isFirstSlide }) => ($isFirstSlide ? 'auto' : '0')};
`;

export const SlideTitle = styled.h2`
  padding-top: 61px;
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

export const SlideImage = styled(Image)`
  width: 100%;
  max-height: 400px;
  height: 100%;
  object-fit: contain;
`;

export const ButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  display: flex;
  transform: translateX(-50%);
  width: 100%;
  min-width: 340px;
  max-width: 430px;
  height: 80px;
  justify-content: space-evenly;
  align-items: flex-start;
  padding: 0 16px;
  z-index: 100;
`;

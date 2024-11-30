import Image from 'next/image';
import styled from 'styled-components';
import colors from '@/styles/color/palette';

export const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 0 0 80px 0;
`;

export const OnBoardingWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ButtonWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 375px;
  max-width: 430px;
  margin: 0 auto;
  bottom: 78px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 16px;
`;

export const SlideContainer = styled.div`
  flex: 1;
  width: 100%;

  // 자동 슬라이드 기능
  .slick-slider {
    .slick-track,
    .slick-list {
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }

  .slick-dots {
    bottom: 28px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 120px);
  padding-top: 200px;
  text-align: center;
`;

export const SlideTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 10px 12px;
  color: ${colors.etc.black};
`;

export const SlideDescription = styled.p`
  font-size: 16px;
  color: ${colors.gray[70]};
  line-height: 1.5;
`;

export const SlideImage = styled(Image)`
  display: block;
  margin: 20px auto;
  width: 200px;
  height: 200px;
  max-width: 80%;
  object-fit: contain;
`;

export const ButtonContainer = styled.div`
  width: 100%;
`;

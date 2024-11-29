'use client';
import { useRouter } from 'next/navigation';
import Slider from 'react-slick';
import Button from '@/components/Common/Button/Button';
import {
  PageWrapper,
  OnBoardingWrapper,
  ButtonContainer,
  SlideContainer,
  SlideContent,
  SlideTitle,
  SlideDescription,
  SlideImage,
} from './onBoarding.styles';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SnowMan1 from '@/styles/Icon/SnowMan1.svg';
import SnowMan2 from '@/styles/Icon/SnowMan2.svg';
import SnowMan3 from '@/styles/Icon/SnowMan3.svg';
import SnowMan4 from '@/styles/Icon/SnowMan4.svg';

const OnBoarding = () => {
  const router = useRouter();

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
  };

  const slides = [
    {
      title: '어서오세요 👋',
      description: '어데고에 오신 것을 환영합니다!',
      image: SnowMan1,
    },
    {
      title: '내가 등록한 사진과 동영상으로',
      description: '추억할 장소를 저장하고',
      image: SnowMan2,
    },
    {
      title: '저장한 장소를 통해',
      description: '함께한 장소를 추측해보세요!',
      image: SnowMan3,
    },
    {
      title: '이제 시작해볼까요?',
      description: '어데고와 함께 추억을 공유해봐요 🚩',
      image: SnowMan4,
    },
  ];

  return (
    <PageWrapper>
      <OnBoardingWrapper>
        <SlideContainer>
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <SlideContent key={index}>
                <SlideTitle>{slide.title}</SlideTitle>
                <SlideDescription>{slide.description}</SlideDescription>
                <SlideImage
                  src={slide.image}
                  alt={`온보딩 이미지 ${index + 1}`}
                  width={300}
                  height={300}
                />
              </SlideContent>
            ))}
          </Slider>
        </SlideContainer>
        <ButtonContainer>
          <Button
            label="시작하기"
            onClick={() => router.push('/login')}
            buttonType="purple"
            buttonSize="large"
          />
        </ButtonContainer>
      </OnBoardingWrapper>
    </PageWrapper>
  );
};

export default OnBoarding;

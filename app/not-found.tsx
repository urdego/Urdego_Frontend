'use client';

import Image from 'next/image';
import notFound from '@/styles/Icon/404.svg';
import Button from '@/components/Common/Button/Button';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import color from '@/styles/color/palette';

const NotFound = () => {
  const router = useRouter();

  return (
    <NotFoundContainer>
      <Image src={notFound} alt="404" />
      <Text>
        찾을 수 없는 페이지입니다. <br />
        요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨어요:)
      </Text>
      <Button label="홈으로 이동" onClick={() => router.push('/')} />
    </NotFoundContainer>
  );
};

export default NotFound;

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0 20px;
`;

const Text = styled.p`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.14px;
  margin-bottom: 20px;
  text-align: center;
  color: ${color.purple[50]};
  padding: 24px 0;
`;

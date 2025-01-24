'use client';

import { TopWrapper, BottomWrapper, UserCharacter } from './Home.styles';
import HomeBox from '@/components/Layout/Home/HomeBox/HomeBox';
import { HomePageWrapper } from '@/app/commonPage.styles';
import Button from '@/components/Common/Button/Button';
import EnterArrowIcon from '@/styles/Icon/Home/EnterArrowIcon.svg';

const Home = () => {
  return (
    <>
      <HomePageWrapper>
        <TopWrapper>
          <UserCharacter />
        </TopWrapper>
        <BottomWrapper>
          <HomeBox />
          <Button
            label="방 입장하기"
            icon={EnterArrowIcon}
            buttonHeight="long"
            $iconPosition="right"
          />
        </BottomWrapper>
      </HomePageWrapper>
    </>
  );
};

export default Home;

'use client';
import { useEffect } from 'react';
import { TopWrapper, BottomWrapper } from './Home.styles';
import HomeBox from '@/components/Layout/Home/HomeBox/HomeBox';
import { HomePageWrapper } from '@/app/commonPage.styles';
import Button from '@/components/Common/Button/Button';
import EnterArrowIcon from '@/styles/Icon/Home/EnterArrowIcon.svg';
import UserCharacter from '@/components/Layout/Home/Character/UserCharacter';
import { useState } from 'react';
import axiosInstance from '@/lib/axios';

const Home = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
    'BASIC'
  );

  // 초기 BASIC으로 로드 후 데이터 가져오는 즉시 사용자 설정 캐릭터로 변경
  useEffect(() => {
    const fetchUserCharacter = async () => {
      try {
        const response = await axiosInstance.get('/api/character');
        setSelectedCharacter(response.data.characterType);
      } catch (error) {
        console.error('캐릭터 정보 조회 에러:', error);
        setSelectedCharacter('BASIC');
      }
    };
    fetchUserCharacter();
  }, []);

  return (
    <>
      <HomePageWrapper>
        <TopWrapper>
          <UserCharacter
            selectedCharacter={selectedCharacter}
            isOpen={isBottomSheetOpen}
          />
        </TopWrapper>
        <BottomWrapper>
          <HomeBox
            setSelectedCharacter={setSelectedCharacter}
            setIsBottomSheetOpen={setIsBottomSheetOpen}
            isBottomSheetOpen={isBottomSheetOpen}
          />
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

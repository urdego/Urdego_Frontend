'use client';

import { useState } from 'react';
import Image from 'next/image';
import GoldMedal from '@/styles/Icon/Game/Rank/Gold.svg';
import SilverMedal from '@/styles/Icon/Game/Rank/Sliver.svg';
import BronzeMedal from '@/styles/Icon/Game/Rank/Bronze.svg';
import Rank4 from '@/styles/Icon/Game/Rank/Rank4.svg';
import Rank5 from '@/styles/Icon/Game/Rank/Rank5.svg';
import Rank6 from '@/styles/Icon/Game/Rank/Rank6.svg';

import {
  Container,
  ButtonContainer,
  ActiveIndicator,
  Button,
  ListContainer,
  UserRow,
  Rank,
  Name,
  Score,
} from './RankList.styles';

interface RankListProps {
  rankData: {
    rank: number;
    userId: number;
    nickname: string;
    score: number;
    activeCharacter: string;
  }[];
  handleToggle: (round: 'thisRound' | 'totalRound') => void;
  initialActiveButton: 'thisRound' | 'totalRound';
  currentRound: number;
  $isLast: boolean;
}

const RankList = ({
  rankData,
  handleToggle,
  initialActiveButton,
  currentRound,
  $isLast,
}: RankListProps) => {
  const [activeTab, setActiveTab] = useState<'thisRound' | 'totalRound'>(
    initialActiveButton
  );

  const handleButtonClick = (round: 'thisRound' | 'totalRound') => {
    setActiveTab(round);
    handleToggle(round);
  };

  const currentData = rankData;

  const getRankDisplay = (rank: number) => {
    switch (rank) {
      case 1:
        return <Image src={GoldMedal} alt="1등" width={24} height={24} />;
      case 2:
        return <Image src={SilverMedal} alt="2등" width={24} height={24} />;
      case 3:
        return <Image src={BronzeMedal} alt="3등" width={24} height={24} />;
      case 4:
        return <Image src={Rank4} alt="4등" width={24} height={24} />;
      case 5:
        return <Image src={Rank5} alt="5등" width={24} height={24} />;
      case 6:
        return <Image src={Rank6} alt="6등" width={24} height={24} />;
      default:
        return <Rank>{rank}</Rank>;
    }
  };

  return (
    <Container>
      <ButtonContainer>
        {$isLast ? (
          <Button
            $active={true}
            $isLast={$isLast}
            onClick={() => handleButtonClick('totalRound')}
          >
            최종 점수 결과
          </Button>
        ) : (
          <>
            <ActiveIndicator $activeIndex={activeTab === 'thisRound' ? 0 : 1} />
            <Button
              $active={activeTab === 'thisRound'}
              onClick={() => handleButtonClick('thisRound')}
            >
              {currentRound} 라운드
            </Button>
            <Button
              $active={activeTab === 'totalRound'}
              onClick={() => handleButtonClick('totalRound')}
            >
              총 라운드
            </Button>
          </>
        )}
      </ButtonContainer>
      <ListContainer>
        {currentData.map((user) => (
          <UserRow key={user.userId}>
            {getRankDisplay(user.rank)}
            <Image
              src={`/Character/${user.activeCharacter.toLowerCase()}.png`}
              alt={`${user.nickname}의 프로필 이미지`}
              width={32}
              height={32}
            />
            <Name>{user.nickname}</Name>
            <Score>{user.score}점</Score>
          </UserRow>
        ))}
      </ListContainer>
    </Container>
  );
};

export default RankList;

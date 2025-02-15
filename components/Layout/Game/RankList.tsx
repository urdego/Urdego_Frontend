'use client';

import { useState } from 'react';
import Image from 'next/image';
import GoldMedal from '@/styles/Icon/Game/Rank/Gold.svg';
import SilverMedal from '@/styles/Icon/Game/Rank/Sliver.svg';
import BronzeMedal from '@/styles/Icon/Game/Rank/Bronze.svg';
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
  rankData?: {
    rank: number;
    userId: number;
    nickname: string;
    score: number;
    activeCharacter: string;
  }[];
  handleToggle: (round: 'thisRound' | 'totalRound') => void;
  initialActiveButton: 'thisRound' | 'totalRound';
  currentRound: number;
  maxRounds: number;
}

const RankList = ({
  rankData,
  handleToggle,
  initialActiveButton,
  currentRound,
  maxRounds,
}: RankListProps) => {
  const [activeTab, setActiveTab] = useState<'thisRound' | 'totalRound'>(
    initialActiveButton
  );

  const handleButtonClick = (round: 'thisRound' | 'totalRound') => {
    setActiveTab(round);
    handleToggle(round);
  };

  const mockData = {
    roundScore: [
      {
        rank: 1,
        userId: 1,
        nickname: '가가가',
        score: 150,
        activeCharacter: 'basic',
      },
      {
        rank: 2,
        userId: 2,
        nickname: '나나나',
        score: 120,
        activeCharacter: 'dot',
      },
      {
        rank: 3,
        userId: 3,
        nickname: '다다다',
        score: 100,
        activeCharacter: 'basic',
      },
      {
        rank: 4,
        userId: 4,
        nickname: '라라라',
        score: 70,
        activeCharacter: 'basic',
      },
      {
        rank: 5,
        userId: 5,
        nickname: '마마마',
        score: 50,
        activeCharacter: 'basic',
      },
      {
        rank: 6,
        userId: 6,
        nickname: '바바바',
        score: 10,
        activeCharacter: 'basic',
      },
    ],
    totalScore: [
      {
        rank: 1,
        userId: 1,
        nickname: '가가가',
        score: 420,
        activeCharacter: 'basic',
      },
      {
        rank: 2,
        userId: 2,
        nickname: '나나나',
        score: 380,
        activeCharacter: 'dot',
      },
      {
        rank: 3,
        userId: 3,
        nickname: '다다다',
        score: 340,
        activeCharacter: 'basic',
      },
      {
        rank: 4,
        userId: 4,
        nickname: '라라라',
        score: 340,
        activeCharacter: 'basic',
      },
      {
        rank: 5,
        userId: 5,
        nickname: '마마마',
        score: 340,
        activeCharacter: 'basic',
      },
      {
        rank: 6,
        userId: 6,
        nickname: '바바바',
        score: 340,
        activeCharacter: 'basic',
      },
    ],
  };

  const currentData: RankListProps['rankData'] =
    (rankData ?? []).length > 0
      ? (rankData ?? [])
      : activeTab === 'thisRound'
        ? mockData.roundScore
        : mockData.totalScore;

  const getRankDisplay = (rank: number) => {
    switch (rank) {
      case 1:
        return <Image src={GoldMedal} alt="1등" width={24} height={24} />;
      case 2:
        return <Image src={SilverMedal} alt="2등" width={24} height={24} />;
      case 3:
        return <Image src={BronzeMedal} alt="3등" width={24} height={24} />;
      default:
        return <Rank>{rank}</Rank>;
    }
  };

  return (
    <Container>
      <ButtonContainer>
        {currentRound >= maxRounds ? (
          <Button
            $active={true}
            isFinal={true}
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
              src={`/character/${user.activeCharacter}.png`}
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

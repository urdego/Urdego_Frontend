'use client';

import { useState } from 'react';
import Image from 'next/image';
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
import UserProfile from '@/styles/Icon/UserProfile.svg';

// interface User {
//   rank: number;
//   name: string;
//   score: number;
// }

const RankList = ({
  handleToggle,
  initialActiveButton,
}: {
  handleToggle: (round: 'thisRound' | 'totalRound') => void;
  initialActiveButton: 'thisRound' | 'totalRound';
}) => {
  const [activeTab, setActiveTab] = useState<'thisRound' | 'totalRound'>(
    initialActiveButton
  );

  const handleButtonClick = (round: 'thisRound' | 'totalRound') => {
    setActiveTab(round);
    handleToggle(round);
  };

  const rankData = [
    { rank: 1, name: '유저1', score: 100, totalScore: 600 },
    { rank: 2, name: '유저2', score: 90, totalScore: 550 },
    { rank: 3, name: '유저3', score: 80, totalScore: 500 },
    { rank: 4, name: '유저4', score: 70, totalScore: 450 },
    { rank: 5, name: '유저5', score: 60, totalScore: 400 },
    { rank: 6, name: '유저6', score: 50, totalScore: 350 },
  ];

  return (
    <Container>
      <ButtonContainer>
        <ActiveIndicator $activeIndex={activeTab === 'thisRound' ? 0 : 1} />
        <Button
          $active={activeTab === 'thisRound'}
          onClick={() => handleButtonClick('thisRound')}
        >
          이번 라운드
        </Button>
        <Button
          $active={activeTab === 'totalRound'}
          onClick={() => handleButtonClick('totalRound')}
        >
          총 라운드
        </Button>
      </ButtonContainer>
      <ListContainer>
        {rankData.map((user) => (
          <UserRow key={user.rank}>
            <Rank>{user.rank}</Rank>
            <Image
              src={UserProfile}
              alt={`${user.name}의 프로필 이미지`}
              width={32}
              height={32}
            />
            <Name>{user.name}</Name>
            <Score>
              {activeTab === 'thisRound' ? user.score : user.totalScore}점
            </Score>
          </UserRow>
        ))}
      </ListContainer>
    </Container>
  );
};

export default RankList;

'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Container,
  ButtonContainer,
  Button,
  ListContainer,
  UserRow,
  Rank,
  Name,
  Score,
} from './RankList.styles';
import UserProfile from '@/styles/Icon/UserProfile.svg';

interface User {
  rank: number;
  name: string;
  score: number;
}

const RankList = ({
  rankData,
  handleToggle,
  initialActiveButton,
}: {
  rankData: User[];
  handleToggle: (round: 'thisRound' | 'totalRound') => void;
  initialActiveButton: 'thisRound' | 'totalRound';
}) => {
  const [activeButton, setActiveButton] = useState<'thisRound' | 'totalRound'>(
    initialActiveButton
  );

  const handleButtonClick = (round: 'thisRound' | 'totalRound') => {
    setActiveButton(round);
    handleToggle(round);
  };

  return (
    <Container>
      <ButtonContainer>
        <Button
          $active={activeButton === 'thisRound'}
          onClick={() => handleButtonClick('thisRound')}
        >
          이번 라운드
        </Button>
        <Button
          $active={activeButton === 'totalRound'}
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
            <Score>{user.score}점</Score>
          </UserRow>
        ))}
      </ListContainer>
    </Container>
  );
};

export default RankList;

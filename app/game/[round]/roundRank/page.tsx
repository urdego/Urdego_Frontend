'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Common/Button/Button';

const RoundRank = ({ params }: { params: { round: string } }) => {
  const router = useRouter();
  const [rankData, setRankData] = useState([
    { username: '김혜수', score: Math.floor(Math.random() * 100) },
    { username: '최효종', score: Math.floor(Math.random() * 100) },
    { username: '김민정', score: Math.floor(Math.random() * 100) },
  ]);

  const currentRound = Number(params.round);
  const maxRounds = 3;

  // 다음 라운드로 이동
  const handleNextRound = () => {
    if (currentRound < maxRounds) {
      router.push(`/game/${currentRound + 1}`);
    } else {
      router.push('/game/totalRank');
    }
  };

  return (
    <div>
      <h1>Round {currentRound} 점수</h1>
      <ul>
        {rankData.map((rank, index) => (
          <li key={index}>
            {rank.username}: {rank.score}점
          </li>
        ))}
      </ul>
      <Button
        label={
          currentRound < maxRounds ? '다음 라운드로 이동' : '최종 점수 확인'
        }
        buttonSize="large"
        onClick={handleNextRound}
        styleType="coloredBackground"
      />
    </div>
  );
};

export default RoundRank;

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Score {
  username: string;
  totalScore: number;
}

const TotalRank = () => {
  const router = useRouter();

  // 더미 데이터 (총합 점수)
  const [totalScores, setTotalScores] = useState<Score[]>([]);

  useEffect(() => {
    // 더미 데이터로 3명의 사용자 점수 합산
    const dummyTotalScores = [
      { username: '김혜수', totalScore: Math.floor(Math.random() * 300) },
      { username: '최효종', totalScore: Math.floor(Math.random() * 300) },
      { username: '김민정', totalScore: Math.floor(Math.random() * 300) },
    ];
    setTotalScores(dummyTotalScores);
  }, []);

  return (
    <div>
      <h1>최종 랭킹</h1>
      <ul>
        {totalScores
          .sort((a, b) => b.totalScore - a.totalScore) // 총 점수 높은 순으로 정렬
          .map((score, index) => (
            <li key={index}>
              {score.username}: {score.totalScore}점
            </li>
          ))}
      </ul>
      <button onClick={() => router.push('/home')}>게임 종료</button>
    </div>
  );
};

export default TotalRank;

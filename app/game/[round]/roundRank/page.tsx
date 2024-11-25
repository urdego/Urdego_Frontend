'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Common/Button/Button';
import TopBar from '@/components/Common/TopBar/TopBar';
import ProgressBar from '@/components/Layout/Game/ProgressBar';
import { PageWrapper, TimerContainer, TimerText } from '../game.styles';
import RankList from '@/components/Layout/Game/RankList';

const RoundRank = ({ params }: { params: { round: string } }) => {
  const router = useRouter();
  const currentRound = Number(params.round) || 1; // 기본값 설정
  const maxRounds = 3;
  const [timeLeft, setTimeLeft] = useState(1000);

  // 더미 데이터 (thisRound, totalRound)
  const dummyData = {
    thisRound: [
      { rank: 1, name: '홍길동', score: 120 },
      { rank: 2, name: '김철수', score: 110 },
      { rank: 3, name: '이영희', score: 100 },
      { rank: 4, name: '박민수', score: 95 },
      { rank: 5, name: '최지우', score: 90 },
    ],
    totalRound: [
      { rank: 1, name: '이영희', score: 580 },
      { rank: 2, name: '홍길동', score: 560 },
      { rank: 3, name: '김철수', score: 540 },
      { rank: 4, name: '최지우', score: 520 },
      { rank: 5, name: '박민수', score: 500 },
    ],
  };

  // 상태로 현재 라운드 선택 관리
  const [currentRoundData, setCurrentRoundData] = useState<
    'thisRound' | 'totalRound'
  >('thisRound');

  const handleToggle = (round: 'thisRound' | 'totalRound') => {
    setCurrentRoundData(round);
  };

  // 타이머 로직
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) return prev - 1;
        clearInterval(timer);
        handleNextRound(); // 타이머가 0이 되면 자동으로 다음 라운드로 넘어감
        return 0;
      });
    }, 1000);

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [currentRound]);

  // 다음 라운드로 이동
  const handleNextRound = () => {
    if (currentRound < maxRounds) {
      router.push(`/game/${currentRound + 1}`);
    } else {
      router.push('/game/totalRank');
    }
  };

  return (
    <>
      <PageWrapper>
        <TopBar NavType="game" label={`${currentRound} 라운드`} />
        {/* 타이머와 게이지 */}
        <TimerContainer>
          <TimerText>{timeLeft}초</TimerText>
          <ProgressBar progress={(timeLeft / 1000) * 100} />
        </TimerContainer>
        <RankList
          rankData={dummyData[currentRoundData]}
          handleToggle={handleToggle}
        />

        <Button
          label={
            currentRound < maxRounds ? '다음 라운드로 이동' : '최종 점수 확인'
          }
          buttonSize="large"
          onClick={handleNextRound}
          styleType="coloredBackground"
        />
      </PageWrapper>
    </>
  );
};

export default RoundRank;

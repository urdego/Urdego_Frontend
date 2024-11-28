'use client';

import { useMemo, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/Common/TopBar/TopBar';
import Timer from '@/components/Layout/Game/Timer';
import { PageWrapper, Footer } from '../game.styles';
import RankList from '@/components/Layout/Game/RankList';
import MapComponent from '@/components/Layout/Game/GoogleMap';
import CountdownButton from '@/components/Layout/Game/CountdownButton';

const RoundRank = ({
  params,
}: {
  params: { round: string; roomId: string };
}) => {
  const router = useRouter();
  const currentRound = Number(params.round) || 1; // 기본값 설정
  const maxRounds = 3; // TODO : prop으로 라운드 받아오기

  const MapDummyData = useMemo(() => {
    // TODO: 나중에 데이터를 가져와서 쓸땐 useMemo쓰기
    return {
      answerCoordinate: { lat: 37.5665, lng: 126.958 },
      userCoordinates: [
        { nickname: '가가가', lat: 37.5665, lng: 126.978, score: 120 },
        { nickname: '나나나', lat: 37.5675, lng: 126.979, score: 110 },
        { nickname: '다다다', lat: 37.5685, lng: 126.98, score: 100 },
        { nickname: '라라라', lat: 37.5695, lng: 126.981, score: 90 },
        { nickname: '마마마', lat: 37.5705, lng: 126.982, score: 80 },
        { nickname: '바바바', lat: 37.5715, lng: 126.983, score: 70 },
      ],
    };
  }, []);

  // 상태로 현재 라운드 선택 관리
  const [currentRoundData, setCurrentRoundData] = useState<
    'thisRound' | 'totalRound'
  >(currentRound >= maxRounds ? 'totalRound' : 'thisRound');

  const handleToggle = (round: 'thisRound' | 'totalRound') => {
    setCurrentRoundData(round);
  };

  // 이번 라운드 계산 (useMemo로 렌더링 한번만)
  const thisRoundData = useMemo(
    () =>
      MapDummyData.userCoordinates.map((user, index) => ({
        rank: index + 1,
        name: user.nickname,
        score: user.score,
      })),
    [MapDummyData]
  );

  const totalRoundData = useMemo(
    () =>
      MapDummyData.userCoordinates.map((user, index) => ({
        rank: index + 1,
        name: user.nickname,
        score: user.score * currentRound,
      })),
    [MapDummyData, currentRound]
  );

  const dummyData = useMemo(
    () => ({
      thisRound: thisRoundData,
      totalRound: totalRoundData,
    }),
    [thisRoundData, totalRoundData]
  );

  // 다음 라운드로 이동하거나 /home으로 리디렉션
  const handleNextRound = useCallback(() => {
    if (currentRound >= maxRounds) {
      router.push('/home');
    } else {
      router.push(`/game/${params.roomId}/${currentRound + 1}`);
    }
  }, [router, params.roomId, currentRound]);

  return (
    <PageWrapper>
      <TopBar NavType="game" label={`${currentRound} 라운드`} />

      {/* 타이머와 게이지 */}
      {currentRound < maxRounds && (
        <Timer initialTime={15} onTimeEnd={handleNextRound} />
      )}

      <MapComponent
        mode="rank"
        answerCoordinate={MapDummyData.answerCoordinate}
        userCoordinates={MapDummyData.userCoordinates}
      />

      <RankList
        rankData={dummyData[currentRoundData]}
        handleToggle={handleToggle}
        initialActiveButton={
          currentRound >= maxRounds ? 'totalRound' : 'thisRound'
        }
      />

      {/* 버튼: 마지막 라운드나 3라운드일 경우 '최종 점수 확인' */}
      {currentRound >= maxRounds && (
        <Footer>
          <CountdownButton initialTime={15} onTimeEnd={handleNextRound} />
        </Footer>
      )}
    </PageWrapper>
  );
};

export default RoundRank;

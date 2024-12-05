'use client';

import { useMemo, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/Common/TopBar/TopBar';
import Timer from '@/components/Layout/Game/Timer';
import { PageWrapper, Footer } from '../game.styles';
import RankList from '@/components/Layout/Game/RankList';
import MapComponent from '@/components/Layout/Game/GoogleMap';
import CountdownButton from '@/components/Layout/Game/CountdownButton';
import { useWebSocket } from '@/hooks/inGame/useWebSocket';

const RoundRank = ({
  params,
}: {
  params: { round: string; roomId: string };
}) => {
  const { gameState } = useWebSocket(Number(params.roomId)); // TODO: 라운드 데이터 받아오기
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

  // TODO: ws 연동 시 사용
  // // 이번 라운드 점수 기준 정렬
  // const thisRoundRankData = useMemo(() => {
  //   if (!gameState.scoreState?.submitCoordinates) return [];

  //   return [...gameState.scoreState.submitCoordinates]
  //     .sort((a, b) => b.score - a.score) // 점수 내림차순 정렬
  //     .map((coord, index) => ({
  //       rank: index + 1,
  //       name: coord.nickname,
  //       score: coord.score,
  //       totalScore: coord.totalScore
  //     }));
  // }, [gameState.scoreState]);

  // // 누적 점수 기준 정렬
  // const totalRoundRankData = useMemo(() => {
  //   if (!gameState.scoreState?.submitCoordinates) return [];

  //   return [...gameState.scoreState.submitCoordinates]
  //     .sort((a, b) => b.totalScore - a.totalScore) // 총점 내림차순 정렬
  //     .map((coord, index) => ({
  //       rank: index + 1,
  //       name: coord.nickname,
  //       score: coord.score,
  //       totalScore: coord.totalScore
  //     }));
  // }, [gameState.scoreState]);

  // // 동점자 처리 로직
  // const assignRankWithTies = (sortedData: any[]) => {
  //   let currentRank = 1;
  //   let currentScore = -1;
  //   let sameRankCount = 0;

  //   return sortedData.map((item, index) => {
  //     const score = currentRoundData === 'thisRound' ? item.score : item.totalScore;

  //     if (score !== currentScore) {
  //       currentRank = index + 1;
  //       currentScore = score;
  //       sameRankCount = 0;
  //     } else {
  //       sameRankCount++;
  //     }

  //     return {
  //       ...item,
  //       rank: currentRank
  //     };
  //   });
  // };

  // // 현재 보여줄 데이터 선택
  // const displayRankData = useMemo(() => {
  //   const rawData = currentRoundData === 'thisRound'
  //     ? thisRoundRankData
  //     : totalRoundRankData;

  //   return assignRankWithTies(rawData);
  // }, [currentRoundData, thisRoundRankData, totalRoundRankData]);

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

  // TODO: ws 연동 시 사용
  // gameState.scoreState를 사용하여 실제 데이터 활용
  // const rankData = useMemo(() => {
  //   if (!gameState.scoreState) return [];

  //   return gameState.scoreState.submitCoordinates.map((coord, index) => ({
  //     rank: index + 1,
  //     name: coord.nickname,
  //     score: coord.score,
  //     totalScore: coord.totalScore
  //   }));
  // }, [gameState.scoreState]);

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
      {/* TODO: ws 연동 시 사용 */}
      {/* <MapComponent
      mode="rank"
      answerCoordinate={gameState.scoreState?.answerCoordinate}
      userCoordinates={gameState.scoreState?.submitCoordinates}
    /> */}
      <RankList
        rankData={dummyData[currentRoundData]}
        handleToggle={handleToggle}
        initialActiveButton={
          currentRound >= maxRounds ? 'totalRound' : 'thisRound'
        }
      />
      {/* TODO: ws 연동 시 사용 */}
      {/* <RankList
        rankData={displayRankData}
        handleToggle={handleToggle}
        initialActiveButton={currentRound >= maxRounds ? 'totalRound' : 'thisRound'}
      /> */}
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

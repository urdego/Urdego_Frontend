'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/Common/TopBar/TopBar';
import Timer from '@/components/Layout/Game/Timer';
import { PageWrapper, Footer } from '../game.styles';
import RankList from '@/components/Layout/Game/RankList';
import MapComponent from '@/components/Layout/Game/GoogleMap';
import CountdownButton from '@/components/Layout/Game/CountdownButton';
import InGameWebSocket from '@/lib/websocket/gameWebsocket';
import useWebSocketStore from '@/stores/useWebSocketStore';

interface Coordinate {
  nickname: string;
  lat: number;
  lng: number;
  score: number;
  totalScore: number;
}

interface ScoreDataType {
  answerCoordinate: {
    lat: number;
    lng: number;
  };
  submitCoordinates: Coordinate[];
}

const RoundRank = ({
  params,
}: {
  params: { round: string; roomId: string };
}) => {
  const router = useRouter();
  const currentRound = Number(params.round) || 1;
  const maxRounds = 2;
  const messages = useWebSocketStore((state) => state.messages);
  const [currentRoundData, setCurrentRoundData] = useState<
    'thisRound' | 'totalRound'
  >(currentRound >= maxRounds ? 'totalRound' : 'thisRound');

  const resultMessage = messages[messages.length - 1];
  // console.log('All messages:', messages);
  // console.log('Result message:', resultMessage);
  const scoreData = resultMessage?.data as ScoreDataType;
  // console.log('Score data:', scoreData);

  const rankData = !scoreData?.submitCoordinates
    ? []
    : scoreData.submitCoordinates
        .sort((a, b) =>
          currentRoundData === 'thisRound'
            ? b.score - a.score
            : b.totalScore - a.totalScore
        )
        .map((coord, index) => ({
          rank: index + 1,
          name: coord.nickname,
          score:
            currentRoundData === 'thisRound' ? coord.score : coord.totalScore,
          totalScore: coord.totalScore,
        }));

  const handleToggle = (round: 'thisRound' | 'totalRound') => {
    setCurrentRoundData(round);
  };

  const handleNextRound = useCallback(() => {
    if (currentRound >= maxRounds) {
      const webSocket = InGameWebSocket.getInstance();
      webSocket.disconnect();
      router.push('/home');
    } else {
      router.push(`/game/${params.roomId}/${currentRound + 1}`);
    }
  }, [router, params.roomId, currentRound, maxRounds]);

  return (
    <PageWrapper>
      <TopBar NavType="game" label={`${currentRound} 라운드`} />
      {currentRound < maxRounds && (
        <Timer initialTime={10} onTimeEnd={handleNextRound} />
      )}
      <MapComponent
        mode="rank"
        answerCoordinate={scoreData?.answerCoordinate || null}
        userCoordinates={scoreData?.submitCoordinates || []}
      />
      <RankList
        rankData={rankData}
        handleToggle={handleToggle}
        initialActiveButton={
          currentRound >= maxRounds ? 'totalRound' : 'thisRound'
        }
      />
      {currentRound >= maxRounds && (
        <Footer>
          <CountdownButton initialTime={10} onTimeEnd={handleNextRound} />
        </Footer>
      )}
    </PageWrapper>
  );
};

export default RoundRank;

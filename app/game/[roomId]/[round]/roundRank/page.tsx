'use client';

import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/Common/TopBar/TopBar';
import Timer from '@/components/Layout/Game/Timer';
import {
  PageWrapper,
  Footer,
  AnswerAddress,
  PlaceName,
  PlaceAddress,
} from '../game.styles';
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
  const [currentRoundData] = useState<'thisRound' | 'totalRound'>(
    currentRound >= maxRounds ? 'totalRound' : 'thisRound'
  );

  const resultMessage = messages[messages.length - 1];
  const scoreData = resultMessage?.data as ScoreDataType;
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
          userId: index + 1,
          nickname: coord.nickname,
          score:
            currentRoundData === 'thisRound' ? coord.score : coord.totalScore,
          activeCharacter: 'basic',
        }));

  const currentRoundDataRef = useRef<'thisRound' | 'totalRound'>(
    currentRound >= maxRounds ? 'totalRound' : 'thisRound'
  );
  const handleToggle = (round: 'thisRound' | 'totalRound') => {
    currentRoundDataRef.current = round;
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
        answerCoordinate={
          scoreData?.answerCoordinate || {
            lat: 36.304734757299734,
            lng: 127.3647015379501,
          }
        }
        userCoordinates={
          scoreData?.submitCoordinates || [
            { lat: 36.3040031187549, lng: 127.36495433614975 },
            { lat: 36.303929850851425, lng: 127.36423287774953 },
          ]
        }
      />
      <AnswerAddress>
        <PlaceName>국립현대미술관 서울</PlaceName>
        <PlaceAddress>서울 종로구 삼청로 30</PlaceAddress>
      </AnswerAddress>
      <RankList
        rankData={rankData}
        handleToggle={handleToggle}
        initialActiveButton={
          currentRound >= maxRounds ? 'totalRound' : 'thisRound'
        }
        currentRound={currentRound}
        maxRounds={maxRounds}
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

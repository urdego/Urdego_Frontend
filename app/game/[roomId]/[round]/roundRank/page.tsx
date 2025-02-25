'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
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

import {
  RoundResultPayload,
  ScoreUpdatePayload,
  GameEndPayload,
} from '@/lib/types/inGame';
import useGameStore from '@/stores/useGameStore';
import { WebSocketMessage } from '@/lib/types/websocket';
import { useWebSocketFunctions } from '@/hooks/websocket/useWebsocketFunctions';

const RoundRank = ({
  params,
}: {
  params: { round: string; roomId: string };
}) => {
  const router = useRouter();
  const roomId = useGameStore.getState().roomId;
  const questionId = useGameStore.getState().questionId;
  const currentRound = Number(params.round) || 1;

  const { subscribeToRoom, sendMessage } = useWebSocketFunctions();
  const [scoreData, setScoreData] = useState<ScoreUpdatePayload | null>(null);
  const isLast = scoreData?.isLast || false;
  const [roundResult, setRoundResult] = useState<RoundResultPayload | null>(
    null
  );
  const [currentRoundData, setCurrentRoundData] = useState<
    'thisRound' | 'totalRound'
  >(!isLast ? 'totalRound' : 'thisRound');
  const hasSubscribed = useRef(false);
  const hasSentMessages = useRef(false);

  useEffect(() => {
    if (!hasSubscribed.current) {
      subscribeToRoom(String(roomId), (message: WebSocketMessage) => {
        switch (message.messageType) {
          case 'ROUND_RESULT':
            setRoundResult(message.payload as RoundResultPayload);
            break;
          case 'SCORE_UPDATE':
            setScoreData(message.payload as ScoreUpdatePayload);
            break;
          case 'GAME_END':
            console.log('게임 종료:', message.payload as GameEndPayload);
            break;
          default:
            break;
        }
      });
      hasSubscribed.current = true;
    }
  }, [roomId, subscribeToRoom]);

  useEffect(() => {
    if (!hasSentMessages.current) {
      sendMessage(
        'ROUND_RESULT',
        { roomId, roundNum: currentRound, questionId },
        'game'
      );
      sendMessage(
        'SCORE_UPDATE',
        { gameId: useGameStore.getState().gameId, roundNum: currentRound },
        'game'
      );
      hasSentMessages.current = true;
    }
  }, [roomId, currentRound, questionId, sendMessage]);

  const rankData =
    !scoreData?.roundScore && !scoreData?.totalScore
      ? []
      : (scoreData?.roundScore || [])
          .map((coord) => ({
            rank: coord.rank,
            userId: coord.userId,
            nickname: coord.nickname,
            score:
              currentRoundData === 'thisRound'
                ? coord.score
                : scoreData?.totalScore.find(
                    (item) => item.userId === coord.userId
                  )?.score || 0,
            activeCharacter: coord.characterType,
          }))
          .sort((a, b) => b.score - a.score);

  const handleToggle = (round: 'thisRound' | 'totalRound') => {
    setCurrentRoundData(round);
  };

  const handleNextRound = useCallback(() => {
    if (isLast) {
      sendMessage(
        'GAME_END',
        { gameId: useGameStore.getState().gameId },
        'game'
      );
      router.push('/home');
    } else {
      router.push(`/game/${roomId}/${currentRound + 1}`);
    }
  }, [router, roomId, currentRound, isLast, sendMessage]);

  return (
    <PageWrapper>
      <TopBar NavType="game" label={`${currentRound} 라운드`} />
      <Timer initialTime={10} onTimeEnd={handleNextRound} />
      <MapComponent
        mode="rank"
        answerCoordinate={roundResult?.answerCoordinate || null}
        submitCoordinates={roundResult?.submitCoordinates}
      />
      <AnswerAddress>
        <PlaceName>{roundResult?.placeName}</PlaceName>
        <PlaceAddress>{roundResult?.placeAddress}</PlaceAddress>
      </AnswerAddress>
      <RankList
        rankData={rankData}
        handleToggle={handleToggle}
        initialActiveButton={isLast ? 'totalRound' : 'thisRound'}
        currentRound={currentRound}
        isLast={isLast}
      />
      {isLast && (
        <Footer>
          <CountdownButton initialTime={10} onTimeEnd={handleNextRound} />
        </Footer>
      )}
    </PageWrapper>
  );
};

export default RoundRank;

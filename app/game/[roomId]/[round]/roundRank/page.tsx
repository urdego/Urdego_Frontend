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
  const hasSubscribed = useRef(false); // 구독 여부를 추적

  useEffect(() => {
    if (!hasSubscribed.current) {
      subscribeToRoom(String(roomId), (message: WebSocketMessage) => {
        switch (message.messageType) {
          case 'ROUND_RESULT': {
            const roundMessage = message.payload as RoundResultPayload;
            setRoundResult(roundMessage);
            break;
          }
          case 'SCORE_UPDATE': {
            const scoreUpdate = message.payload as ScoreUpdatePayload;
            setScoreData(scoreUpdate);
            break;
          }
          case 'GAME_END': {
            const gameEnd = message.payload as GameEndPayload;
            console.log('게임 종료:', gameEnd);
            break;
          }
          default:
            break;
        }
      });

      sendMessage(
        'ROUND_RESULT',
        {
          roomId: roomId,
          roundNum: Number(params.round),
          questionId: questionId,
        },
        'game'
      );

      sendMessage(
        'SCORE_UPDATE',
        {
          gameId: useGameStore.getState().gameId,
          roundNum: Number(params.round),
        },
        'game'
      );

      hasSubscribed.current = true; // 구독 완료 표시
    }
  }, [
    roomId,
    params.roomId,
    params.round,
    questionId,
    subscribeToRoom,
    sendMessage,
    roundResult,
  ]);

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
                ? coord.score // 'thisRound'일 경우 RoundScore의 score 사용
                : scoreData?.totalScore.find(
                    (item) => item.userId === coord.userId
                  )?.score || 0, // 'totalRound'일 경우 TotalScore의 score 사용
            activeCharacter: coord.characterType,
          }))
          .sort(
            (a, b) =>
              currentRoundData === 'thisRound'
                ? b.score - a.score // thisRound의 경우 RoundScore의 score 사용
                : b.score - a.score // totalRound의 경우 TotalScore의 score 사용
          );

  const handleToggle = (round: 'thisRound' | 'totalRound') => {
    setCurrentRoundData(round);
  };

  const handleNextRound = useCallback(() => {
    if (isLast) {
      sendMessage(
        'GAME_END',
        {
          gameId: useGameStore.getState().gameId,
        },
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
      {!isLast && <Timer initialTime={10000000} onTimeEnd={handleNextRound} />}
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

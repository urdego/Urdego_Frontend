import React, { useEffect, useState } from 'react';
import {
  InfoRow,
  LevelText,
  UserName,
  ProgressRow,
  ProgressBarContainer,
  ProgressBar,
  ProgressNum,
} from './Level.styles';
import axios from 'axios';
import { useSession } from 'next-auth/react';

interface LevelProps {
  level: number;
  exp: number;
}

export const Level: React.FC<LevelProps> = ({ level, exp }) => {
  const { data: session } = useSession();
  const [nickname, setNickname] = useState('');
  const [progress, setProgress] = useState(0);

  const levelStandards = [
    { level: 9, minExp: 2500 },
    { level: 8, minExp: 2000 },
    { level: 7, minExp: 1600 },
    { level: 6, minExp: 1200 },
    { level: 5, minExp: 900 },
    { level: 4, minExp: 600 },
    { level: 3, minExp: 400 },
    { level: 2, minExp: 200 },
    { level: 1, minExp: 0 }, // 100 미만의 exp는 레벨 1
  ];

  // 현재 레벨의 최소 경험치와 다음 레벨의 최소 경험치 가져오기
  const currentLevelStandard = levelStandards.find(
    (std) => std.level === level
  );
  const nextLevelStandard = levelStandards.find(
    (std) => std.level === level + 1
  );

  // 경험치에 따른 게이지 퍼센트 계산
  const calculatedProgress =
    currentLevelStandard && nextLevelStandard
      ? ((exp - currentLevelStandard.minExp) /
          (nextLevelStandard.minExp - currentLevelStandard.minExp)) *
        100
      : 0;

  useEffect(() => {
    setProgress(calculatedProgress);
  }, [calculatedProgress]);

  useEffect(() => {
    const fetchNickname = async () => {
      if (!session) return;

      try {
        const response = await axios.get('/api/character', {
          headers: {
            'User-Id': session.user.userId,
          },
        });
        setNickname(response.data.nickname);
      } catch (error) {
        console.error('닉네임 가져오기 에러:', error);
      }
    };

    fetchNickname();
  }, [session]);

  return (
    <>
      <InfoRow>
        <LevelText>Lvl.{level}</LevelText>
        <UserName>{nickname}</UserName>
      </InfoRow>
      <ProgressRow>
        <ProgressBarContainer>
          <ProgressBar $progress={progress} />
        </ProgressBarContainer>
        <ProgressNum>{Math.round(progress)}%</ProgressNum>
      </ProgressRow>
    </>
  );
};

export default Level;

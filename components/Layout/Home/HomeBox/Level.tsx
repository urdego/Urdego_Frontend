import {
  InfoRow,
  LevelText,
  UserName,
  ProgressRow,
  ProgressBarContainer,
  ProgressBar,
  ProgressNum,
} from './Level.styles';
import useUserStore from '@/stores/useUserStore';
import useCountUp from '@/hooks/Loading/useCountUp';

export const Level = () => {
  const level = 1;
  const progress = useCountUp(30);

  const nickname = useUserStore((state) => state.nickname);

  return (
    <>
      <InfoRow>
        <LevelText>LV.{level}</LevelText>
        <UserName>{nickname}</UserName>
      </InfoRow>
      <ProgressRow>
        <ProgressBarContainer>
          <ProgressBar $progress={progress} />
        </ProgressBarContainer>
        <ProgressNum>{progress}%</ProgressNum>
      </ProgressRow>
    </>
  );
};

export default Level;

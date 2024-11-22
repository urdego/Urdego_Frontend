import { Container, InfoRow, LevelText, UserName, ProgressBarContainer, ProgressBar } from './Level.styles';

interface LevelProps {
  level: number; // 레벨 
  userName: string; // 유저명
  progress?: number; // 진행도 (0~100%)
}

export const Level: React.FC<LevelProps> = ({ level, userName, progress=30 }) => {
  return (
    <Container>
      <InfoRow>
        <LevelText>레벨 {level}</LevelText>
        <UserName>{userName}</UserName>
      </InfoRow>
      <ProgressBarContainer>
        <ProgressBar progress={progress} />
      </ProgressBarContainer>
    </Container>
  );
};

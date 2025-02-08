interface RankListProps {
  rankData: {
    rank: number;
    name: string;
    score: number;
    totalScore: number;
  }[];
  handleToggle: (round: 'thisRound' | 'totalRound') => void;
  initialActiveButton: 'thisRound' | 'totalRound';
}

const RankList = ({
  rankData,
  handleToggle,
  initialActiveButton,
}: RankListProps) => {
  // ... 컴포넌트 내용
};

export default RankList;

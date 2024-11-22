import { EntranceIcon, LockIcon } from './ChannelButtonIcon';
import { ChannelWrapper, ChannelTitle } from './ChannelButton.styles';

interface ChannelProps {
  title: '그룹 게임' | '랭킹 게임';
}

const ChannelButton = ({ title }: ChannelProps) => {
  return (
    <ChannelWrapper $title={title}>
      <ChannelTitle>{title}</ChannelTitle>
      {title === '그룹 게임' ? <EntranceIcon /> : <LockIcon />}
    </ChannelWrapper>
  );
};

export default ChannelButton;

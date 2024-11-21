import { EntranceIcon, LockIcon } from './ChannelButtonIcon';
import { ChannelWrapper, ChannelTitle } from './ChannelButton.styles';

interface ChannelProps {
  title: '게임1' | '게임2';
}

const Channel = ({ title }: ChannelProps) => {
  return (
    <ChannelWrapper $title={title}>
      <ChannelTitle>{title}</ChannelTitle>
      {title === '게임1' ? <EntranceIcon /> : <LockIcon />}
    </ChannelWrapper>
  );
};

export default Channel;

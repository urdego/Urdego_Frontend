import { EntranceIcon, LockIcon } from './ChannelButtonIcon';
import { ChannelWrapper, ChannelTitle } from './ChannelButton.styles';

interface ChannelProps {
  title: string;
  height?: 'long' | 'short';
}

const Channel = ({ title, height = 'long' }: ChannelProps) => {
  return (
    <ChannelWrapper $height={height}>
      <ChannelTitle>{title}</ChannelTitle>
      {height === 'long' ? <EntranceIcon /> : <LockIcon />}
    </ChannelWrapper>
  );
};

export default Channel;

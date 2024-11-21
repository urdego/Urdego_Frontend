import { EntranceIcon, LockIcon } from './ChannelIcon';
import { ChannelWrapper, ChannelTitle } from './Channerl.styles';

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

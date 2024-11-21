import { EntranceIcon, LockIcon } from './ChannelIcon';
import { ChannelWrapper, Title } from './Channerl.styles';

interface ChannelProps {
  title: string;
  height?: 'long' | 'short';
  background?: 'black' | 'gray';
}

const Channel = ({
  title,
  height = 'long',
  background = 'black',
}: ChannelProps) => {
  return (
    <ChannelWrapper $height={height} $background={background}>
      <Title>{title}</Title>
      {height === 'long' ? <EntranceIcon /> : <LockIcon />}
    </ChannelWrapper>
  );
};

export default Channel;

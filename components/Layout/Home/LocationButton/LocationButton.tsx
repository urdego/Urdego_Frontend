import { LocationWrapper, LocationText } from './LocationButton.styles';
import { ArrowRightSmallIcon } from './LocationButtonIcon';

interface LocationProps {
  title: string;
  count: number;
}

const LoactionButton = ({ title, count }: LocationProps) => {
  return (
    <LocationWrapper>
      <LocationText>
        <div>{title}</div>
        <div>{count}</div>
      </LocationText>
      <ArrowRightSmallIcon />
    </LocationWrapper>
  );
};

export default LoactionButton;

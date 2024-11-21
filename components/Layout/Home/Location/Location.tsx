import { LocationWrapper, LocationText } from './Location.styles';
import { ArrowRightSmallIcon } from './LocationIcon';

interface LocationProps {
  title: string;
  count: number;
}

const Loaction = ({ title, count }: LocationProps) => {
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

export default Loaction;

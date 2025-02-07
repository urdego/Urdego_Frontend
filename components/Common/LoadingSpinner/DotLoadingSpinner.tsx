import { DotContainer, Dot } from './DotLoadingSpinner.styles';

type COLOR = 'white' | 'gray';
interface DotLoadingSpinnerProps {
  color?: COLOR;
}
const DotLoadingSpinner = ({ color = 'gray' }: DotLoadingSpinnerProps) => {
  return (
    <DotContainer>
      <Dot $color={color} />
      <Dot $color={color} />
      <Dot $color={color} />
    </DotContainer>
  );
};

export default DotLoadingSpinner;

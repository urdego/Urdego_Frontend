import { ContentInput, PlaceInputWrapper } from './PlaceInput.styles';
import { ClearIcon } from './PlaceInputIcon';

interface PlaceInputProps {
  placeholder: string;
}

const PlaceInput = ({ placeholder }: PlaceInputProps) => {
  return (
    <PlaceInputWrapper>
      <ContentInput placeholder={placeholder} />
      <ClearIcon />
    </PlaceInputWrapper>
  );
};

export default PlaceInput;

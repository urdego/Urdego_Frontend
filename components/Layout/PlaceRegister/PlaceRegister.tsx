import PlacePreview from './PlacePreview';
import PlaceInput from './PlaceInput';
import PlaceSearchButton from './PlaceSearchButton';
import { DeleteIcon } from './PlaceRegisterIcon';
import {
  PlaceContentResetButton,
  PlaceRegistertext,
  PlaceRegisterWrapper,
} from './PlaceRegister.styles';

import { Place } from '@/stores/placeRegisterStore';
import useControlInput from '@/hooks/placeRegister/useControlInput';

interface PlaceRegisterProps {
  index: number;
  title: string;
  place: Place;
}

const PlaceRegister = ({ index, title, place }: PlaceRegisterProps) => {
  // client state 불러오는 custom hook
  const { handleTitleChange, handleHintChange, handlePlaceRemove } =
    useControlInput({ index });

  return (
    <PlaceRegisterWrapper>
      <PlaceRegistertext>
        <div>{title}</div>
        {index !== 0 && (
          <PlaceContentResetButton onClick={handlePlaceRemove}>
            <DeleteIcon />
          </PlaceContentResetButton>
        )}
      </PlaceRegistertext>
      <PlacePreview index={index} place={place} />
      <PlaceInput
        placeholder="장소명"
        value={place.title}
        onChange={handleTitleChange}
      />
      <PlaceSearchButton index={index} value={place.address} />
      <PlaceInput
        placeholder="(선택) 힌트를 작성해주세요"
        value={place.hint}
        onChange={handleHintChange}
      />
    </PlaceRegisterWrapper>
  );
};

export default PlaceRegister;

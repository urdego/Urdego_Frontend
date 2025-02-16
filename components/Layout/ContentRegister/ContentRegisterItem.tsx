import PlacePreview from './ImagePreview';
import PlaceInput from './InputCard';
import PlaceSearchButton from './LocationSearchButton';
import { DeleteIcon } from './ContentRegisterIcon';
import {
  PlaceContentResetButton,
  PlaceRegistertext,
  PlaceRegisterWrapper,
} from './ContentRegisterItem.styles';

import { Place } from '@/stores/contentRegisterStore';
import useControlInput from '@/hooks/contentRegister/useControlInput';

interface PlaceRegisterProps {
  index: number;
  title: string;
  place: Place;
}

const ContentRegisterItem = ({ index, title, place }: PlaceRegisterProps) => {
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

export default ContentRegisterItem;

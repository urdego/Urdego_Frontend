import PlacePreview from './PlacePreview';
import PlaceInput from './PlaceInput';
import PlaceSearchButton from './PlaceSearchButton';
import { DeleteIcon } from './PlaceRegisterIcon';
import {
  PlaceContentResetButton,
  PlaceRegistertext,
  PlaceRegisterWrapper,
} from './PlaceRegister.styles';

import usePlaceRegisterStore from '@/stores/placeRegisterStore';
import useControlInput from '@/hooks/placeRegister/useControlInput';

interface PlaceRegisterProps {
  index: number;
  title: string;
}

const PlaceRegister = ({ index, title }: PlaceRegisterProps) => {
  // client state 불러오는 custom hook
  const { handleTitleChange, handleHintChange, handlePlaceRemove } =
    useControlInput({ index });

  // store state 불러오는 로직
  const { placeList } = usePlaceRegisterStore();

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
      <PlacePreview index={index} />
      <PlaceInput
        placeholder="장소명"
        value={placeList[index].title}
        onChange={handleTitleChange}
      />
      <PlaceSearchButton index={index} value={placeList[index].address} />
      <PlaceInput
        placeholder="(선택) 힌트를 작성해주세요"
        value={placeList[index].hint}
        onChange={handleHintChange}
      />
    </PlaceRegisterWrapper>
  );
};

export default PlaceRegister;

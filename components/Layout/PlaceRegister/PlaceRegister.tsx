import Button from '@/components/Common/Button/Button';
import ImageUpload from './ImageUpload';
import PlaceInput from './PlaceInput';
import {
  PlaceRegistertext,
  PlaceRegisterWrapper,
} from './PlaceRegister.styles';
import { TrashIcon } from './PlaceRegisterIcon';
import PlaceSearchButton from './PlaceSearchButton';
import PulsIconSrc from '@styles/Icon/Plus.svg';

interface PlaceRegisterProps {
  title: string;
  currCount: number;
  totalCount: number;
  handleClick?: () => void;
}

const PlaceRegister = ({
  title,
  currCount,
  totalCount,
}: PlaceRegisterProps) => {
  return (
    <PlaceRegisterWrapper>
      <PlaceRegistertext>
        <div>{title}</div>
        <TrashIcon />
      </PlaceRegistertext>
      <ImageUpload currCount={currCount} totalCount={totalCount} />
      <PlaceInput placeholder="장소명" />
      <PlaceSearchButton />
      <PlaceInput placeholder="(선택) 힌트를 작성해주세요" />
      <Button buttonType="gray" label="장소추가" icon={PulsIconSrc} />
    </PlaceRegisterWrapper>
  );
};

export default PlaceRegister;

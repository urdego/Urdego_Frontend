import {
  RoomButtonLayout,
  RoomButtonWrapper,
  RoomCount,
  RoomPerson,
  RoomTitle,
} from './RoomButton.styles';
import { PersonIcon } from './RoomButtonIcon';

interface RoomButtonProps {
  title: string;
  userName: string;
  currCount: number;
  totalCount: number;
}

const RoomButton = ({
  title,
  userName,
  currCount,
  totalCount,
}: RoomButtonProps) => {
  return (
    <RoomButtonWrapper>
      <RoomButtonLayout>
        <div>
          <RoomTitle>{title}</RoomTitle>
          <RoomPerson>
            <PersonIcon />
            <div>{userName}</div>
          </RoomPerson>
        </div>
        <RoomCount>
          ({currCount}/{totalCount})
        </RoomCount>
      </RoomButtonLayout>
    </RoomButtonWrapper>
  );
};

export default RoomButton;

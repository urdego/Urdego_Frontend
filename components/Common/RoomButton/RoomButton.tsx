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
  hostUser: string;
  groupMemberCount: number;
  maxMemberCount: number;
}

const RoomButton = ({
  title,
  hostUser,
  groupMemberCount,
  maxMemberCount,
}: RoomButtonProps) => {
  return (
    <RoomButtonWrapper>
      <RoomButtonLayout>
        <div>
          <RoomTitle>{title}</RoomTitle>
          <RoomPerson>
            <PersonIcon />
            <div>
              {hostUser}외 {groupMemberCount - 1}명
            </div>
          </RoomPerson>
        </div>
        <RoomCount>
          ({groupMemberCount}/{maxMemberCount})
        </RoomCount>
      </RoomButtonLayout>
    </RoomButtonWrapper>
  );
};

export default RoomButton;

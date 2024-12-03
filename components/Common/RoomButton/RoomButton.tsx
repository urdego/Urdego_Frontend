import {
  PersonBox,
  PersonCount,
  RoomButtonLayout,
  RoomButtonWrapper,
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
    // TODO: 이미지 로딩 추가
    <RoomButtonWrapper>
      <RoomButtonLayout>
        <RoomTitle>{title}</RoomTitle>
        <RoomPerson>
          <PersonIcon />
          <PersonBox>
            {hostUser}외 {groupMemberCount - 1}명
          </PersonBox>
        </RoomPerson>
        <PersonCount>
          ({groupMemberCount}/{maxMemberCount})
        </PersonCount>
      </RoomButtonLayout>
    </RoomButtonWrapper>
  );
};

export default RoomButton;

import {
  PersonBox,
  RoomBottomContainer,
  RoomButtonLayout,
  RoomButtonWrapper,
  RoomPerson,
  RoomTitle,
  RoomTopContainer,
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
        <RoomTopContainer>
          <RoomTitle>{title}</RoomTitle>
          <RoomPerson>
            <PersonIcon />
            <PersonBox>
              {hostUser}외 {groupMemberCount - 1}명
            </PersonBox>
          </RoomPerson>
        </RoomTopContainer>
        <RoomBottomContainer>
          ({groupMemberCount}/{maxMemberCount})
        </RoomBottomContainer>
      </RoomButtonLayout>
    </RoomButtonWrapper>
  );
};

export default RoomButton;

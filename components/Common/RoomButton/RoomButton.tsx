import {
  Participant,
  RoomButtonContainer,
  RoomButtonWrapper,
  Round,
} from './RoomButton.styles';
import { PersonIcon } from './WaitingRoomListIcon';

interface RoomButtonProps {
  title: string;
  round: number;
  currMemberCount: number;
  maxMemberCount: number;
}

const RoomButton = ({
  title,
  round,
  currMemberCount,
  maxMemberCount,
}: RoomButtonProps) => {
  return (
    <RoomButtonWrapper>
      <p>{title}</p>
      <RoomButtonContainer>
        <Round round={round}>{round}R</Round>
        <Participant>
          <PersonIcon />
          <p>
            {currMemberCount}/{maxMemberCount}
          </p>
        </Participant>
      </RoomButtonContainer>
    </RoomButtonWrapper>
  );
};

export default RoomButton;

import { Character } from '@/lib/types/character';
import {
  Participant,
  RoomButtonHeader,
  RoomButtonContainer,
  RoomButtonWrapper,
  Round,
} from './RoomButton.styles';
import { CharacterIcon, PersonIcon } from './WaitingRoomListIcon';

interface RoomButtonProps {
  hostType: Character;
  title: string;
  round: number;
  currMemberCount: number;
  maxMemberCount: number;
  onClick: () => void;
}

const RoomButton = ({
  hostType,
  title,
  round,
  currMemberCount,
  maxMemberCount,
  onClick,
}: RoomButtonProps) => {
  return (
    <RoomButtonWrapper onClick={onClick} style={{ cursor: 'pointer' }}>
      <RoomButtonHeader>
        <CharacterIcon hostType={hostType} />
        <p>{title}</p>
      </RoomButtonHeader>
      <RoomButtonContainer>
        <Round $round={round}>{round}R</Round>
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

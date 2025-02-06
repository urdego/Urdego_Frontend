import {
  Participant,
  RoomButtonContainer,
  RoomButtonWrapper,
  Round,
} from './RoomButton.styles';
import { CharacterIcon, PersonIcon } from './WaitingRoomListIcon';

import BasicIcon from '@styles/Icon/Character/basic.png';
import AngularIcon from '@styles/Icon/waitingRoomList/angular.png';
import BumpyIcon from '@styles/Icon/waitingRoomList/bumpy.png';
import DotIcon from '@styles/Icon/waitingRoomList/dot.png';
import WoolIcon from '@styles/Icon/waitingRoomList/wool.png';
import { StaticImageData } from 'next/image';

interface RoomButtonProps {
  hostType: string;
  title: string;
  round: number;
  currMemberCount: number;
  maxMemberCount: number;
}

const RoomButton = ({
  hostType,
  title,
  round,
  currMemberCount,
  maxMemberCount,
}: RoomButtonProps) => {
  const handleHostCharacter = (): StaticImageData => {
    switch (hostType) {
      case 'basic':
        return BasicIcon;
      case 'angular':
        return AngularIcon;
      case 'bumpy':
        return BumpyIcon;
      case 'dot':
        return DotIcon;
      case 'wool':
        return WoolIcon;
      default:
        return BasicIcon;
    }
  };

  return (
    <RoomButtonWrapper $hostCharacter={handleHostCharacter()}>
      <CharacterIcon />
      <p>{title}</p>
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

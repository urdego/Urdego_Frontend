import {
  PersonBox,
  PersonCount,
  RoomButtonLayout,
  RoomButtonWrapper,
  RoomPerson,
  RoomTitle,
} from './RoomButton.styles';
import { PersonIcon } from './RoomButtonIcon';
import Artboard1 from '@/styles/Icon/GroupCard/Artboard1.svg';
import Artboard2 from '@/styles/Icon/GroupCard/Artboard2.svg';
import Artboard3 from '@/styles/Icon/GroupCard/Artboard3.svg';
import Artboard4 from '@/styles/Icon/GroupCard/Artboard4.svg';
import Artboard5 from '@/styles/Icon/GroupCard/Artboard5.svg';

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
  // 랜덤 배경 이미지 선택
  const artboards = [Artboard1, Artboard2, Artboard3, Artboard4, Artboard5];
  const randomArtboard =
    artboards[Math.floor(Math.random() * artboards.length)];

  return (
    <RoomButtonWrapper backgroundImage={randomArtboard.src}>
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

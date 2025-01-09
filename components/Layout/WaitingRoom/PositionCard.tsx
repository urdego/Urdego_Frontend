import React from 'react';
import Image from 'next/image';
import SnowMan0 from '@/styles/Icon/Character/character-0.svg';
// import SnowMan1 from '@/styles/Icon/Character/character-1.svg';
// import SnowMan2 from '@/styles/Icon/Character/character-2.svg';
// import SnowMan3 from '@/styles/Icon/Character/character-3.svg';
// import SnowMan4 from '@/styles/Icon/Character/character-4.svg';

import {
  Card,
  Level,
  Username,
  Character,
  HostLabel,
  EmptyCardIcon,
} from './PositionCard.styles';

interface PositionCardProps {
  level?: number;
  username?: string;
  isHost?: boolean;
  isReady?: boolean;
  isEmpty?: boolean;
}

const PositionCard = ({
  level = 1,
  username = '어데고',
  isHost = false,
  isReady = false,
  isEmpty = false,
}: PositionCardProps) => {
  return (
    <>
      <Card $isEmpty={isEmpty}>
        {!isEmpty ? (
          <>
            <Level>Lv.{level}</Level>
            <Username>{username}</Username>
            <Character>
              <Image src={SnowMan0} alt="snowman" />
            </Character>
            {isHost ? (
              <HostLabel $isHost={true}>방장</HostLabel>
            ) : (
              isReady && <HostLabel $isHost={false}>준비완료</HostLabel>
            )}
          </>
        ) : (
          <EmptyCardIcon />
        )}
      </Card>
    </>
  );
};

export default PositionCard;

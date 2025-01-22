import React from 'react';
import Image from 'next/image';
import Basic from '@/styles/Icon/Character/basic.png';
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
  onClick?: () => void; // onClick 속성 추가
}

const PositionCard = ({
  level = 1,
  username = '어데고',
  isHost = false,
  isReady = false,
  isEmpty = false,
  onClick,
}: PositionCardProps) => {
  return (
    <Card $isEmpty={isEmpty} onClick={isEmpty ? onClick : undefined}>
      {!isEmpty ? (
        <>
          <Level>Lv.{level}</Level>
          <Username>{username}</Username>
          <Character>
            <Image src={Basic} alt="Basic" width={70} height={70} />
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
  );
};

export default PositionCard;

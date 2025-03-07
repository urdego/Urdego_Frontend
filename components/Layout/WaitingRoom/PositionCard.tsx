import React from 'react';
import Image from 'next/image';
import useCharacterData from '@/hooks/character/useCharacterData';
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
  activeCharacter?: string;
  isHost?: boolean;
  isReady?: boolean;
  isEmpty?: boolean;
  onClick?: () => void;
  isDisabled?: boolean;
}

const PositionCard = ({
  level = 1,
  username = '어데고',
  activeCharacter = 'BASIC',
  isHost = false,
  isReady = false,
  isEmpty = false,
  onClick,
  isDisabled = false,
}: PositionCardProps) => {
  const characterData = useCharacterData({ ownCharacters: [activeCharacter] });
  const selectedCharacter = characterData.find(
    (character) => character.key === activeCharacter
  );

  return (
    <Card
      $isEmpty={isEmpty}
      $isDisabled={isDisabled}
      onClick={isEmpty && !isDisabled ? onClick : undefined}
    >
      {!isEmpty ? (
        <>
          <Level>Lvl.{level}</Level>
          <Username>{username}</Username>
          <Character>
            {selectedCharacter ? (
              <Image
                src={selectedCharacter.displayImage.src}
                alt={activeCharacter}
                width={180}
                height={180}
              />
            ) : (
              <div>No Image</div>
            )}
          </Character>
          {isHost ? (
            <HostLabel $isHost={true}>방장</HostLabel>
          ) : (
            isReady && <HostLabel $isHost={false}>준비완료</HostLabel>
          )}
        </>
      ) : (
        !isDisabled && <EmptyCardIcon />
      )}
    </Card>
  );
};

export default PositionCard;

import React from 'react';
import Image from 'next/image';
import useCharacterData from '@/hooks/character/useCharacterData'; // useCharacterData 훅 import
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
  activeCharacter?: string; // activeCharacter prop 추가
  isHost?: boolean;
  isReady?: boolean;
  isEmpty?: boolean;
  onClick?: () => void; // onClick 추가
}

const PositionCard = ({
  level = 1,
  username = '어데고',
  activeCharacter = 'BASIC', // 기본값 설정
  isHost = false,
  isReady = false,
  isEmpty = false,
  onClick, // onClick 추가
}: PositionCardProps) => {
  // useCharacterData 훅을 사용하여 해당 캐릭터의 이미지 정보를 가져옴
  // activeCharacter를 보유 캐릭터 리스트에 전달하여 true인 경우 실제 캐릭터 이미지를, 그렇지 않으면 LockIcon 이미지를 반환
  const characterData = useCharacterData({ ownCharacters: [activeCharacter] });
  const selectedCharacter = characterData.find(
    (character) => character.key === activeCharacter
  );

  return (
    <Card $isEmpty={isEmpty} onClick={isEmpty ? onClick : undefined}>
      {!isEmpty ? (
        <>
          <Level>Lv.{level}</Level>
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
        <EmptyCardIcon />
      )}
    </Card>
  );
};

export default PositionCard;

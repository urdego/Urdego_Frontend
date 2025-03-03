import { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axios';
import useUserStore from '@/stores/useUserStore';

// 마커 타입을 반환하는 훅으로 변경
const useCharacterGame = () => {
  // 내 캐릭터 타입과 닉네임 저장
  const [characterType, setCharacterType] = useState<string>('basic');
  const { nickname: myNickname } = useUserStore();

  useEffect(() => {
    const fetchCharacterType = async () => {
      try {
        const response = await axiosInstance.get('/api/character');
        const activeCharacter = response.data.activeCharacter || 'basic';
        setCharacterType(activeCharacter.toLowerCase());
        console.log('캐릭터 타입:', activeCharacter);
      } catch (error) {
        console.error('캐릭터 타입 가져오기 실패:', error);
        setCharacterType('basic'); // 실패 시 기본값 설정
      }
    };

    fetchCharacterType();
  }, []);

  // 닉네임을 기준으로 내 마커인지 다른 사용자의 마커인지 구분하는 함수 반환
  const getMarkerIcon = (nickname: string | undefined) => {
    // 닉네임이 없거나 내 닉네임과 다르면 other 마커 사용
    const isMyMarker = nickname && nickname === myNickname;
    return isMyMarker
      ? `/Character/Marker/pin-mine-${characterType}.png`
      : `/Character/Marker/pin-others-${characterType}.png`;
  };

  return { characterType, getMarkerIcon };
};

export default useCharacterGame;

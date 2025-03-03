import { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axios';
import useUserStore from '@/stores/useUserStore';

/**
 * 캐릭터 마커 관련 기능을 제공하는 훅
 * - 캐릭터 타입 정보 가져오기
 * - 사용자 구분에 따른 마커 아이콘 URL 반환
 */
const useCharacterMarker = () => {
  // 캐릭터 타입 상태 관리
  const [characterType, setCharacterType] = useState<string>('basic');
  const { nickname: myNickname } = useUserStore();

  // 캐릭터 타입 정보 가져오기
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

  /**
   * 닉네임을 기준으로 적절한 마커 아이콘 URL을 반환하는 함수
   * 파라미터 : nickname 사용자 닉네임 (없으면 다른 사용자로 간주)
   * 반환값 : 마커 아이콘 URL
   */
  const getMarkerIcon = (nickname: string | undefined) => {
    // 닉네임이 없거나 내 닉네임과 다르면 other 마커 사용
    const isMyMarker = nickname && nickname === myNickname;
    return isMyMarker
      ? `/Character/Marker/pin-mine-${characterType}.png`
      : `/Character/Marker/pin-others-${characterType}.png`;
  };

  /**
   * 내 마커 아이콘 URL만 필요한 경우를 위한 편의 함수
   * 반환값 : 내 마커 아이콘 URL
   */
  const getMyMarkerIcon = () => {
    return `/Character/Marker/pin-mine-${characterType}.png`;
  };

  /**
   * 다른 사용자 마커 아이콘 URL만 필요한 경우를 위한 편의 함수
   * 반환값 : 다른 사용자 마커 아이콘 URL
   */
  const getOtherMarkerIcon = () => {
    return `/Character/Marker/pin-others-${characterType}.png`;
  };

  return {
    characterType,
    getMarkerIcon,
    getMyMarkerIcon,
    getOtherMarkerIcon,
  };
};

export default useCharacterMarker;

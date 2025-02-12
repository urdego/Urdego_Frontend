import { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axios';

const useCharacterType = () => {
  const [markerIcon, setMarkerIcon] = useState<string>(
    '/Character/Marker/pin-mine-basic.png'
  );

  useEffect(() => {
    const fetchCharacterType = async () => {
      try {
        const response = await axiosInstance.get('/api/character');
        const activeCharacter = response.data.activeCharacter || 'basic';
        setMarkerIcon(
          `/Character/Marker/pin-mine-${activeCharacter.toLowerCase()}.png`
        );
        console.log('markerIcon', activeCharacter);
      } catch (error) {
        console.error('캐릭터 타입 가져오기 실패:', error);
        setMarkerIcon('/Character/Marker/pin-mine-basic.png'); // 실패 시 기본값 설정
      }
    };

    fetchCharacterType();
  }, []);

  return markerIcon;
};

export default useCharacterType;

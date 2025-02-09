import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import axiosInstance from '@/lib/axios';

interface UseCharacterStateReturn {
  character: string | null;
  ownCharacters: string[]; // 사용자별 보유 캐릭터 목록
  setCharacter: Dispatch<SetStateAction<string | null>>;
  isLoading: boolean;
}

interface UseCharacterStateProps {
  onCharacterLoad?: (activeCharacter: string | null) => void;
}

export const useCharacterState = ({
  onCharacterLoad,
}: UseCharacterStateProps = {}): UseCharacterStateReturn => {
  const [character, setCharacter] = useState<string | null>('BASIC');
  const [ownCharacters, setOwnCharacters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axiosInstance.get('/api/character');
        const activeCharacter = response.data.activeCharacter;
        const ownCharacters = response.data.ownedCharacters;
        console.log('가져온 캐릭터 정보:', response.data);

        setCharacter(activeCharacter);
        setOwnCharacters(ownCharacters);
        onCharacterLoad?.(activeCharacter);
      } catch (error) {
        console.error('캐릭터 정보 조회 에러:', error);
        setCharacter('BASIC');
        setOwnCharacters([]);
        onCharacterLoad?.('BASIC');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacter();
  }, [onCharacterLoad]);

  return { character, setCharacter, isLoading, ownCharacters };
};

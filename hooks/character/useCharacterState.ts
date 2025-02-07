import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import axiosInstance from '@/lib/axios';

interface UseCharacterStateReturn {
  character: string | null;
  setCharacter: Dispatch<SetStateAction<string | null>>;
  isLoading: boolean;
}

interface UseCharacterStateProps {
  onCharacterLoad?: (characterType: string | null) => void;
}

export const useCharacterState = ({
  onCharacterLoad,
}: UseCharacterStateProps = {}): UseCharacterStateReturn => {
  const [character, setCharacter] = useState<string | null>('BASIC');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axiosInstance.get('/api/character');
        const characterType = response.data.characterType;
        setCharacter(characterType);
        onCharacterLoad?.(characterType);
      } catch (error) {
        console.error('캐릭터 정보 조회 에러:', error);
        setCharacter('BASIC');
        onCharacterLoad?.('BASIC');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacter();
  }, [onCharacterLoad]);

  return { character, setCharacter, isLoading };
};

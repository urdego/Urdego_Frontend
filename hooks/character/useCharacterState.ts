import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import axiosInstance from '@/lib/axios';

interface UseCharacterStateReturn {
  character: string | null;
  ownCharacters: string[];
  level: number;
  exp: number;
  setCharacter: Dispatch<SetStateAction<string | null>>;
  isLoading: boolean;
}

interface UseCharacterStateProps {
  onCharacterLoad?: (activeCharacter: string | null) => void;
}

export const useCharacterState = ({
  onCharacterLoad,
}: UseCharacterStateProps = {}): UseCharacterStateReturn => {
  const [character, setCharacter] = useState<string | null>('');
  const [ownCharacters, setOwnCharacters] = useState<string[]>([]);
  const [level, setLevel] = useState<number | null>(null);
  const [exp, setExp] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axiosInstance.get('/api/character');
        const activeCharacter = response.data.activeCharacter;
        const ownCharacters = response.data.ownedCharacters;
        const userLevel = response.data.level;
        const userExp = response.data.exp;

        setCharacter(activeCharacter);
        setOwnCharacters(ownCharacters);
        setLevel(userLevel);
        setExp(userExp);
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

  return {
    character,
    setCharacter,
    isLoading,
    ownCharacters,
    level: level || 1,
    exp,
  };
};

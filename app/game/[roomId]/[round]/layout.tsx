'use client';

import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import SoundOn from '@/styles/Icon/SoundOn.svg';
import SoundOff from '@/styles/Icon/SoundOff.svg';
import { useAudioStore } from '@/stores/useAudioStore';

const InGameLayout = ({ children }: { children: React.ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { isPlaying, setIsPlaying } = useAudioStore();

  useEffect(() => {
    audioRef.current = new Audio('/music/InGameMusic.mp3');

    // 초기 오디오 설정
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.1;
      // 기본적으로 오디오는 비활성화 상태로 시작
      setIsPlaying(false);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [setIsPlaying]);

  // 오디오 상태가 변경될 때마다 실행
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current
        .play()
        .catch((err) => console.error('Audio Play Error:', err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            console.log('Audio Playing');
          })
          .catch((err) => console.error('Audio Play Error:', err));
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
        console.log('Audio Paused');
      }
    }
  };

  return (
    <Container>
      <MusicSwitch isOn={isPlaying} onClick={toggleMusic} />
      {children}
    </Container>
  );
};

const MusicSwitch = ({
  isOn,
  onClick,
}: {
  isOn: boolean;
  onClick: () => void;
}) => {
  return (
    <SwitchContainer
      onClick={() => {
        console.log('Switch clicked');
        onClick();
      }}
    >
      {isOn ? <SoundOnIcon /> : <SoundOffIcon />}
    </SwitchContainer>
  );
};

const Container = styled.div`
  position: relative;
`;

const SwitchContainer = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 1rem;
  cursor: pointer;
  margin: 0 auto;
  z-index: 300;
`;

const SoundOnIcon = styled.img.attrs({
  src: SoundOn.src,
  alt: 'Sound On',
})`
  width: 24px;
  height: 24px;
`;

const SoundOffIcon = styled.img.attrs({
  src: SoundOff.src,
  alt: 'Sound Off',
})`
  width: 24px;
  height: 24px;
`;

export default InGameLayout;

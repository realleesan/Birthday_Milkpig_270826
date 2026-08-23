'use client';

import React, { useEffect, useRef } from 'react';

interface MusicPlayerProps {
  audioUrl: string;
  songTitle?: string;
  autoPlayTrigger?: boolean;
}

export default function MusicPlayer({ audioUrl, autoPlayTrigger = false }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef<boolean>(false);

  const startPlayback = () => {
    if (audioRef.current && !isPlayingRef.current) {
      audioRef.current.play().then(() => {
        isPlayingRef.current = true;
      }).catch(err => {
        // Suppress browser autoplay warning logs
      });
    }
  };

  // Trigger when autoPlayTrigger prop updates
  useEffect(() => {
    if (autoPlayTrigger) {
      startPlayback();
    }
  }, [autoPlayTrigger]);

  // Attach immediate user gesture listeners (click, touchstart, pointerdown) to unlock audio
  useEffect(() => {
    const handleGesture = () => {
      startPlayback();
      if (isPlayingRef.current) {
        window.removeEventListener('pointerdown', handleGesture);
        window.removeEventListener('click', handleGesture);
        window.removeEventListener('touchstart', handleGesture);
      }
    };

    window.addEventListener('pointerdown', handleGesture, { once: false });
    window.addEventListener('click', handleGesture, { once: false });
    window.addEventListener('touchstart', handleGesture, { once: false });

    return () => {
      window.removeEventListener('pointerdown', handleGesture);
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
    };
  }, []);

  return (
    <audio ref={audioRef} src={audioUrl} loop preload="auto" />
  );
}

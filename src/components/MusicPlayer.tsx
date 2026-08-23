'use client';

import React, { useEffect, useRef } from 'react';

interface MusicPlayerProps {
  audioUrl: string;
  autoPlayTrigger?: boolean;
}

export default function MusicPlayer({ audioUrl, autoPlayTrigger = false }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayedRef = useRef<boolean>(false);

  const playAudio = () => {
    if (audioRef.current && !hasPlayedRef.current) {
      audioRef.current.play().then(() => {
        hasPlayedRef.current = true;
      }).catch(err => {
        console.log('Autoplay waiting for user interaction:', err);
      });
    }
  };

  // 1. Trigger when autoPlayTrigger prop is activated (e.g. scrolling past 80 frames or clicking button)
  useEffect(() => {
    if (autoPlayTrigger) {
      playAudio();
    }
  }, [autoPlayTrigger]);

  // 2. Global user interaction listener to unlock audio on first scroll / click / touch
  useEffect(() => {
    const handleFirstUserInteraction = () => {
      if (audioRef.current && hasPlayedRef.current) return;
      
      // Attempt play on any scroll or touch
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          hasPlayedRef.current = true;
          // Remove event listeners once playing
          window.removeEventListener('scroll', handleFirstUserInteraction);
          window.removeEventListener('click', handleFirstUserInteraction);
          window.removeEventListener('touchstart', handleFirstUserInteraction);
        }).catch(() => {
          // Keep listening until browser allows play
        });
      }
    };

    window.addEventListener('scroll', handleFirstUserInteraction, { passive: true });
    window.addEventListener('click', handleFirstUserInteraction);
    window.addEventListener('touchstart', handleFirstUserInteraction);

    return () => {
      window.removeEventListener('scroll', handleFirstUserInteraction);
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
    };
  }, []);

  return (
    <audio ref={audioRef} src={audioUrl} loop preload="auto" />
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX, Disc } from 'lucide-react';
import { motion } from 'framer-motion';

interface MusicPlayerProps {
  audioUrl: string;
  songTitle?: string;
  autoPlayTrigger?: boolean;
}

export default function MusicPlayer({ audioUrl, autoPlayTrigger = false }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log('Autoplay prevented by browser:', err);
      });
    }
  }, [autoPlayTrigger, isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log('Play error:', err);
      });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio ref={audioRef} src={audioUrl} loop preload="auto" />

      {/* Minimal Floating Vinyl Player (No Text Tooltips) */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <motion.div 
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center p-2 rounded-full glass-card border border-romantic-300/60 shadow-romantic-glow cursor-pointer"
          onClick={togglePlay}
        >
          {/* Vinyl Record */}
          <div className={`relative w-11 h-11 rounded-full bg-darkWine flex items-center justify-center shadow-inner overflow-hidden ${isPlaying ? 'animate-spin-slow' : ''}`}>
            <div className="absolute inset-1 rounded-full border border-white/10"></div>
            <div className="absolute inset-3 rounded-full border border-white/10"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-romantic-400 border-2 border-white flex items-center justify-center">
              <Disc className="w-2 h-2 text-white" />
            </div>
          </div>

          {/* Equalizer Bars or Play Icon */}
          <div className="ml-3 mr-1 flex items-center gap-1">
            {isPlaying ? (
              <div className="flex items-end gap-0.5 h-4">
                <span className="w-1 bg-romantic-500 rounded-full animate-wave-1"></span>
                <span className="w-1 bg-romantic-400 rounded-full animate-wave-2"></span>
                <span className="w-1 bg-romantic-500 rounded-full animate-wave-3"></span>
                <span className="w-1 bg-romantic-300 rounded-full animate-wave-4"></span>
              </div>
            ) : (
              <Music className="w-4 h-4 text-romantic-500" />
            )}
          </div>

          {/* Mute toggle option */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMute();
            }}
            className="p-1 text-romantic-600 hover:text-romantic-800 transition-colors ml-1"
            title={isMuted ? 'Bật tiếng' : 'Tắt tiếng'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </motion.div>
      </div>
    </>
  );
}

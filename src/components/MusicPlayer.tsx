'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX, Disc } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MusicPlayerProps {
  audioUrl: string;
  songTitle?: string;
  autoPlayTrigger?: boolean;
}

export default function MusicPlayer({ audioUrl, songTitle = 'Romantic Birthday Song', autoPlayTrigger = false }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Hide tooltip after 6 seconds
    const timer = setTimeout(() => setShowTooltip(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log('Autoplay prevented by browser:', err);
      });
    }
  }, [autoPlayTrigger]);

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

      {/* Floating Vinyl Music Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="hidden sm:flex items-center gap-2 bg-darkWine/90 text-white text-xs px-3 py-1.5 rounded-full shadow-lg border border-romantic-300/30"
            >
              <Music className="w-3.5 h-3.5 text-romantic-300 animate-bounce" />
              <span>{isPlaying ? 'Đang phát nhạc lãng mạn ♪' : 'Bấm để bật nhạc sinh nhật ♪'}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center p-2 rounded-full glass-card border border-romantic-300/60 shadow-romantic-glow cursor-pointer"
          onClick={togglePlay}
        >
          {/* Vinyl Record */}
          <div className={`relative w-12 h-12 rounded-full bg-darkWine flex items-center justify-center shadow-inner overflow-hidden ${isPlaying ? 'animate-spin-slow' : ''}`}>
            <div className="absolute inset-1 rounded-full border border-white/10"></div>
            <div className="absolute inset-3 rounded-full border border-white/10"></div>
            <div className="w-4 h-4 rounded-full bg-romantic-400 border-2 border-white flex items-center justify-center">
              <Disc className="w-2.5 h-2.5 text-white" />
            </div>
          </div>

          {/* Equalizer Bars or Play Icon */}
          <div className="ml-3 mr-2 flex items-center gap-1">
            {isPlaying ? (
              <div className="flex items-end gap-0.5 h-4">
                <span className="w-1 bg-romantic-500 rounded-full animate-wave-1"></span>
                <span className="w-1 bg-romantic-400 rounded-full animate-wave-2"></span>
                <span className="w-1 bg-romantic-500 rounded-full animate-wave-3"></span>
                <span className="w-1 bg-romantic-300 rounded-full animate-wave-4"></span>
              </div>
            ) : (
              <Music className="w-5 h-5 text-romantic-500" />
            )}
          </div>

          {/* Mute button option */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMute();
            }}
            className="p-1.5 text-romantic-600 hover:text-romantic-800 transition-colors"
            title={isMuted ? 'Bật tiếng' : 'Tắt tiếng'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </motion.div>
      </div>
    </>
  );
}

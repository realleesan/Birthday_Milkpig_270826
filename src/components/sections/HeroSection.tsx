'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Heart, ChevronDown, Calendar, Cake } from 'lucide-react';
import { HERO_DATA } from '@/data/birthdayData';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroSectionProps {
  onExploreClick: () => void;
}

const TOTAL_FRAMES = 80;

export default function HeroSection({ onExploreClick }: HeroSectionProps) {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const pinnedRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const hasTriggeredMusicRef = useRef<boolean>(false);

  // Get Frame URL pattern
  const getFrameUrl = (index: number) => {
    const frameNum = String(index + 1).padStart(3, '0');
    return `/frames/ezgif-frame-${frameNum}.jpg`;
  };

  // Render a specific frame on canvas filling full screen (object-fit: cover)
  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Calculate aspect-fill (object-fit: cover) so it covers full screen
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (imgAspect > canvasAspect) {
      drawWidth = canvasHeight * imgAspect;
      offsetX = (canvasWidth - drawWidth) / 2;
    } else {
      drawHeight = canvasWidth / imgAspect;
      offsetY = (canvasHeight - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Update canvas resolution dynamically on window resize
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    renderFrame(currentFrameRef.current);
  }, [renderFrame]);

  // 1. Preload 80 images into RAM array silently
  useEffect(() => {
    const images: HTMLImageElement[] = [];

    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      
      img.onload = () => {
        if (i === 0) {
          renderFrame(0);
        }
      };

      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      imagesRef.current = [];
    };
  }, [renderFrame]);

  // 2. Setup GSAP ScrollTrigger & auto play music when scrolled near end
  useEffect(() => {
    if (!triggerRef.current || !pinnedRef.current) return;

    updateCanvasSize();

    const st = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: pinnedRef.current,
      scrub: 0.5,
      onUpdate: (self) => {
        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(self.progress * (TOTAL_FRAMES - 1))
        );
        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          renderFrame(frameIndex);
        }

        // Auto trigger music play when user scrolls near the end of 80 frames
        if (self.progress >= 0.75 && !hasTriggeredMusicRef.current) {
          hasTriggeredMusicRef.current = true;
          onExploreClick();
        }
      },
    });

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateCanvasSize();
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      st.kill();
    };
  }, [renderFrame, updateCanvasSize, onExploreClick]);

  return (
    <div ref={triggerRef} className="relative w-full h-[300vh] bg-darkWine">
      {/* Pinned Fullscreen Sticky Hero Container */}
      <div
        ref={pinnedRef}
        className="w-full h-screen sticky top-0 left-0 flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Fullscreen 2D Canvas Image Sequence Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
        />

        {/* Gradient Overlay Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-darkWine/60 via-darkWine/35 to-darkWine/70 z-10 pointer-events-none"></div>

        {/* Floating Heart Decor */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          <motion.div
            animate={{ y: [-10, 15, -10], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-16 left-[8%] text-romantic-200/50"
          >
            <Heart className="w-12 h-12 fill-current" />
          </motion.div>
          <motion.div
            animate={{ y: [15, -10, 15], rotate: [0, -8, 8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-28 right-[10%] text-romantic-300/40"
          >
            <Heart className="w-16 h-16 fill-current" />
          </motion.div>
        </div>

        {/* Hero Overlay Content (Centered Over Canvas) */}
        <div className="relative z-20 max-w-4xl w-full mx-auto px-4 text-center flex flex-col items-center justify-center my-auto">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card-dark text-romantic-200 text-xs sm:text-sm font-semibold mb-6 shadow-2xl backdrop-blur-md border border-white/20"
          >
            <Sparkles className="w-4 h-4 text-romantic-400 animate-pulse" />
            <span>{HERO_DATA.ageTitle}</span>
            <Sparkles className="w-4 h-4 text-romantic-400 animate-pulse" />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-bold leading-tight tracking-tight mb-6 drop-shadow-2xl"
          >
            Happy Birthday <br />
            <span className="bg-gradient-to-r from-romantic-300 via-romantic-200 to-champagne-gold bg-clip-text text-transparent italic font-cursive font-normal text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
              {HERO_DATA.recipientName}
            </span>
          </motion.h1>

          {/* Date Badges Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-8 text-xs sm:text-base"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl glass-card-dark text-white shadow-lg border border-romantic-300/30">
              <Cake className="w-4 h-4 text-romantic-400" />
              <span className="font-semibold text-romantic-200">Sinh Nhật:</span>
              <span className="text-romantic-300 font-bold">{HERO_DATA.birthDateDisplay}</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl glass-card-dark text-white shadow-lg border border-champagne-gold/40">
              <Calendar className="w-4 h-4 text-champagne-gold" />
              <span className="font-semibold text-romantic-200">Hẹn Hò Sớm:</span>
              <span className="text-champagne-gold font-bold">{HERO_DATA.dateEventDisplay}</span>
            </div>
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-romantic-100/90 text-sm sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-sans drop-shadow"
          >
            {HERO_DATA.subheading}
          </motion.p>

          {/* Explore Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center"
          >
            <motion.button
              whileHover={{ scale: 1.06, boxShadow: '0 20px 40px rgba(255, 59, 102, 0.5)' }}
              whileTap={{ scale: 0.96 }}
              onClick={onExploreClick}
              className="group relative px-9 py-4 rounded-full bg-gradient-to-r from-romantic-500 via-romantic-600 to-roseGold text-white font-bold text-base sm:text-lg shadow-romantic-glow flex items-center gap-3 overflow-hidden border border-white/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                Khám Phá Bí Mật
                <Heart className="w-5 h-5 fill-white text-white group-hover:scale-125 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-romantic-600 to-champagne-gold opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </motion.button>
          </motion.div>
        </div>

        {/* Down Arrow */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-auto">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-romantic-300 cursor-pointer p-1"
            onClick={onExploreClick}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </div>

      </div>
    </div>
  );
}

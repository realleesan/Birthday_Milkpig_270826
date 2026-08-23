'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Heart, ChevronDown, Calendar, Cake, Loader2 } from 'lucide-react';
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
  
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Get Frame URL pattern
  const getFrameUrl = (index: number) => {
    const frameNum = String(index + 1).padStart(3, '0');
    return `/frames/ezgif-frame-${frameNum}.jpg`;
  };

  // Render a specific frame on canvas with contain fit
  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Set high-DPI canvas dimensions
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Calculate aspect-fit (object-fit: contain) centering
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (imgAspect > canvasAspect) {
      drawHeight = canvasWidth / imgAspect;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * imgAspect;
      offsetX = (canvasWidth - drawWidth) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // 1. Preload 80 images into RAM array
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      
      img.onload = () => {
        loadedCount++;
        const progress = Math.round((loadedCount / TOTAL_FRAMES) * 100);
        setLoadingProgress(progress);

        // Immediately render frame 0 as soon as it loads
        if (i === 0) {
          renderFrame(0);
        }

        if (loadedCount === TOTAL_FRAMES) {
          setIsLoaded(true);
          renderFrame(currentFrameRef.current);
        }
      };

      img.onerror = () => {
        loadedCount++;
        const progress = Math.round((loadedCount / TOTAL_FRAMES) * 100);
        setLoadingProgress(progress);
        if (loadedCount === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };

      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      // Memory cleanup: release image references
      imagesRef.current = [];
    };
  }, [renderFrame]);

  // 2. Setup GSAP ScrollTrigger
  useEffect(() => {
    if (!triggerRef.current || !pinnedRef.current) return;

    const frameObj = { frame: 0 };

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
      },
    });

    // Handle Window Resize Debounced
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        renderFrame(currentFrameRef.current);
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      st.kill(); // Kill ScrollTrigger instance on unmount
    };
  }, [renderFrame]);

  return (
    <div ref={triggerRef} className="relative w-full h-[300vh] bg-romantic-gradient">
      {/* Pinned Sticky Hero Section Container */}
      <div
        ref={pinnedRef}
        className="w-full h-screen sticky top-0 left-0 flex flex-col justify-center items-center overflow-hidden px-4 py-8"
      >
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-hero-glow rounded-full blur-3xl pointer-events-none"></div>

        {/* Floating Heart Decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ y: [-10, 15, -10], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-12 left-[8%] text-romantic-300/40"
          >
            <Heart className="w-10 h-10 fill-current" />
          </motion.div>
          <motion.div
            animate={{ y: [15, -10, 15], rotate: [0, -8, 8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-28 right-[10%] text-romantic-400/30"
          >
            <Heart className="w-14 h-14 fill-current" />
          </motion.div>
        </div>

        {/* Loading Progress Bar Overlay (While Preloading Images) */}
        <AnimatePresence>
          {!isLoaded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-4 right-4 z-50 flex items-center gap-2 bg-darkWine/80 backdrop-blur-md text-white text-xs px-4 py-2 rounded-full border border-romantic-300/30 shadow-lg"
            >
              <Loader2 className="w-3.5 h-3.5 text-romantic-400 animate-spin" />
              <span>Đang tải mượt 80 frames ({loadingProgress}%)</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Layout: 2 Columns on Desktop, Stacked on Mobile */}
        <div className="relative z-10 max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
          
          {/* Left Column: Hero Typography & CTA */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left justify-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-romantic-200 text-romantic-700 text-xs sm:text-sm font-semibold mb-4 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-romantic-500 animate-pulse" />
              <span>{HERO_DATA.ageTitle}</span>
              <Sparkles className="w-4 h-4 text-romantic-500 animate-pulse" />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl text-darkWine font-bold leading-tight tracking-tight mb-4"
            >
              Happy Birthday <br />
              <span className="bg-gradient-to-r from-romantic-600 via-romantic-500 to-roseGold bg-clip-text text-transparent italic font-cursive font-normal text-4xl sm:text-6xl lg:text-7xl">
                {HERO_DATA.recipientName}
              </span>
            </motion.h1>

            {/* Date Badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6 text-xs sm:text-sm"
            >
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl glass-card text-romantic-800 shadow-sm border border-romantic-200">
                <Cake className="w-4 h-4 text-romantic-500" />
                <span className="font-semibold">Sinh Nhật:</span>
                <span className="text-romantic-600 font-bold">{HERO_DATA.birthDateDisplay}</span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl glass-card text-darkWine shadow-sm border border-champagne/40 bg-champagne-light/50">
                <Calendar className="w-4 h-4 text-champagne-gold" />
                <span className="font-semibold">Hẹn Hò Sớm:</span>
                <span className="text-romantic-700 font-bold">{HERO_DATA.dateEventDisplay}</span>
              </div>
            </motion.div>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-romantic-800 text-sm sm:text-base max-w-md mb-8 leading-relaxed font-sans"
            >
              {HERO_DATA.subheading}
            </motion.p>

            {/* Explore Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col items-center md:items-start"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 15px 30px rgba(230, 30, 78, 0.35)' }}
                whileTap={{ scale: 0.98 }}
                onClick={onExploreClick}
                className="group relative px-7 py-3.5 rounded-full bg-gradient-to-r from-romantic-500 to-romantic-600 text-white font-semibold text-sm sm:text-base shadow-romantic-glow flex items-center gap-3 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Khám Phá Bí Mật
                  <Heart className="w-4 h-4 fill-white text-white group-hover:scale-125 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-romantic-600 to-roseGold opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </motion.button>

              <p className="mt-2.5 text-[11px] text-romantic-500 italic">
                *Cuộn trang hoặc bấm nút để quay mượt 80 frame & mở nhạc
              </p>
            </motion.div>
          </div>

          {/* Right Column: Interactive Apple AirPods-Style 2D Canvas Image Sequence */}
          <div className="flex items-center justify-center relative w-full h-[280px] sm:h-[380px] md:h-[480px]">
            <div className="relative w-full h-full max-w-[480px] max-h-[480px] rounded-3xl glass-card border border-romantic-200/80 shadow-2xl p-3 flex items-center justify-center overflow-hidden">
              <canvas
                ref={canvasRef}
                width={1080}
                height={1080}
                className="w-full h-full object-contain rounded-2xl"
              />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-darkWine/75 backdrop-blur-md text-white text-[10px] font-mono tracking-wider">
                SCROLL TO ANIMATE • FRAME {currentFrameRef.current + 1}/80
              </div>
            </div>
          </div>

        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-romantic-400 cursor-pointer flex flex-col items-center gap-1"
          onClick={onExploreClick}
        >
          <span className="text-[10px] uppercase font-bold tracking-widest text-romantic-500">Cuộn Chuột</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </div>
    </div>
  );
}

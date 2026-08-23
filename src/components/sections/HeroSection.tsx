'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ChevronDown, Calendar, Cake } from 'lucide-react';
import { HERO_DATA } from '@/data/birthdayData';

interface HeroSectionProps {
  onExploreClick: () => void;
}

export default function HeroSection({ onExploreClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 pb-12 px-4 bg-romantic-gradient overflow-hidden">
      {/* Background Glows & Floating Sparkles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-hero-glow rounded-full blur-3xl pointer-events-none"></div>

      {/* Floating Hearts in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [-10, 15, -10], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-[10%] text-romantic-300/40"
        >
          <Heart className="w-12 h-12 fill-current" />
        </motion.div>
        <motion.div
          animate={{ y: [15, -10, 15], rotate: [0, -8, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-36 right-[12%] text-romantic-400/30"
        >
          <Heart className="w-16 h-16 fill-current" />
        </motion.div>
        <motion.div
          animate={{ y: [-15, 10, -15] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-32 left-[15%] text-roseGold/30"
        >
          <Cake className="w-10 h-10" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Top Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-romantic-200 text-romantic-700 text-xs sm:text-sm font-semibold mb-6 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-romantic-500 animate-pulse" />
          <span>{HERO_DATA.ageTitle}</span>
          <Sparkles className="w-4 h-4 text-romantic-500 animate-pulse" />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl text-darkWine font-bold leading-tight tracking-tight mb-6"
        >
          Happy Birthday <br />
          <span className="bg-gradient-to-r from-romantic-600 via-romantic-500 to-roseGold bg-clip-text text-transparent italic font-cursive font-normal text-5xl sm:text-7xl md:text-8xl">
            {HERO_DATA.recipientName}
          </span>
        </motion.h1>

        {/* Date Badges Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-8 text-sm sm:text-base"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl glass-card text-romantic-800 shadow-sm border border-romantic-200">
            <Cake className="w-4 h-4 text-romantic-500" />
            <span className="font-semibold">Sinh Nhật:</span>
            <span className="text-romantic-600 font-bold">{HERO_DATA.birthDateDisplay}</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl glass-card text-darkWine shadow-sm border border-champagne/40 bg-champagne-light/50">
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
          className="text-romantic-800 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-sans"
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
            whileHover={{ scale: 1.05, boxShadow: '0 15px 30px rgba(230, 30, 78, 0.35)' }}
            whileTap={{ scale: 0.98 }}
            onClick={onExploreClick}
            className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-romantic-500 to-romantic-600 text-white font-semibold text-base sm:text-lg shadow-romantic-glow flex items-center gap-3 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Khám Phá Bí Mật
              <Heart className="w-5 h-5 fill-white text-white group-hover:scale-125 transition-transform" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-romantic-600 to-roseGold opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </motion.button>

          <p className="mt-3 text-xs text-romantic-500 italic">
            *Bấm nút để mở nhạc và bật mí lịch trình hẹn hò
          </p>
        </motion.div>
      </div>

      {/* Down Arrow */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-romantic-400 cursor-pointer"
        onClick={onExploreClick}
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}

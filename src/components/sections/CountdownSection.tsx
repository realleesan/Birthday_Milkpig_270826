'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, CalendarHeart, Sparkles, CloudSun, MapPin, Thermometer, Droplets, Wind, Umbrella, Heart } from 'lucide-react';
import { COUNTDOWN_TARGET } from '@/data/birthdayData';
import { CountdownTime } from '@/types';

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const targetDate = new Date(COUNTDOWN_TARGET).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: 'Ngày', value: timeLeft.days },
    { label: 'Giờ', value: timeLeft.hours },
    { label: 'Phút', value: timeLeft.minutes },
    { label: 'Giây', value: timeLeft.seconds },
  ];

  return (
    <section id="countdown-section" className="py-20 px-4 bg-cream relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-romantic-100 text-romantic-700 text-xs sm:text-sm font-semibold mb-4"
          >
            <CalendarHeart className="w-4 h-4 text-romantic-500" />
            <span>The Special Date: 25/8/2026</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl text-darkWine font-bold mb-4"
          >
            Đếm Ngược & Thời Tiết Ngày Hẹn Hò
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-romantic-800 text-sm sm:text-base max-w-xl mx-auto font-sans"
          >
            Mọi thứ đã sẵn sàng cho một buổi tối thu Hà Nội dịu mát và tràn ngập niềm vui.
          </motion.p>
        </div>

        {/* 2 Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Column: Real-time Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card rounded-3xl p-6 sm:p-8 border border-romantic-200 shadow-romantic-glow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-romantic-200">
                <span className="font-serif text-xl text-darkWine font-bold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-romantic-500" />
                  Đồng Hồ Đếm Ngược
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-romantic-100 text-romantic-700">
                  Target: 25.08.2026
                </span>
              </div>

              {/* Countdown Number Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-6">
                {timeBlocks.map((block, index) => (
                  <div
                    key={index}
                    className="relative p-4 rounded-2xl bg-white/80 border border-romantic-200 shadow-sm flex flex-col items-center justify-center group hover:-translate-y-1 transition-transform"
                  >
                    <span className="font-serif text-3xl sm:text-4xl font-bold text-romantic-600 mb-1 tracking-tight">
                      {String(block.value).padStart(2, '0')}
                    </span>
                    <span className="text-[11px] sm:text-xs font-semibold text-romantic-800 uppercase tracking-wider">
                      {block.label}
                    </span>
                    <div className="absolute top-1.5 right-1.5 text-romantic-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Sparkles className="w-3 h-3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Note Footer */}
            <div className="pt-4 border-t border-romantic-200 flex items-center justify-center gap-2 text-xs text-romantic-600 font-semibold bg-romantic-50/50 p-3 rounded-xl">
              <Clock className="w-4 h-4 text-romantic-500 animate-pulse" />
              <span>Hẹn gặp Milkpig đúng 17:00 ngày 25.08.2026 💖</span>
            </div>
          </motion.div>

          {/* Right Column: Hanoi Weather Forecast (25/8) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card rounded-3xl p-6 sm:p-8 border border-romantic-200 shadow-romantic-glow flex flex-col justify-between bg-gradient-to-br from-white/90 to-romantic-50/70"
          >
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-romantic-200">
                <span className="font-serif text-xl text-darkWine font-bold flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-romantic-500" />
                  Dự Báo Thời Tiết Hà Nội
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-champagne-light text-roseGold-dark border border-champagne/40">
                  25/08/2026
                </span>
              </div>

              {/* Weather Main Info Card */}
              <div className="flex items-center gap-6 p-4 rounded-2xl bg-white/90 border border-romantic-200 shadow-sm mb-6">
                <div className="p-3.5 rounded-2xl bg-romantic-100 text-romantic-600 flex items-center justify-center">
                  <CloudSun className="w-12 h-12 text-romantic-500 animate-float-slow" />
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-4xl font-bold text-darkWine">28°C</span>
                    <span className="text-xs text-romantic-500 font-semibold">(Cảm giác như 27°C)</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-romantic-700 mt-1">
                    Nắng nhẹ mùa thu, gió dịu mát về đêm 🍃
                  </p>
                </div>
              </div>

              {/* Detailed Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                <div className="p-3 rounded-xl bg-white/70 border border-romantic-100 flex items-center gap-2.5">
                  <Thermometer className="w-4 h-4 text-romantic-500" />
                  <div>
                    <p className="text-romantic-400 font-medium text-[10px]">Nhiệt độ ngày</p>
                    <p className="font-bold text-darkWine">26°C - 30°C</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/70 border border-romantic-100 flex items-center gap-2.5">
                  <Droplets className="w-4 h-4 text-romantic-500" />
                  <div>
                    <p className="text-romantic-400 font-medium text-[10px]">Độ ẩm</p>
                    <p className="font-bold text-darkWine">68% (Thoáng mát)</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/70 border border-romantic-100 flex items-center gap-2.5">
                  <Wind className="w-4 h-4 text-romantic-500" />
                  <div>
                    <p className="text-romantic-400 font-medium text-[10px]">Gió thu</p>
                    <p className="font-bold text-darkWine">12 km/h (Nhẹ nhàng)</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/70 border border-romantic-100 flex items-center gap-2.5">
                  <Umbrella className="w-4 h-4 text-romantic-500" />
                  <div>
                    <p className="text-romantic-400 font-medium text-[10px]">Khả năng mưa</p>
                    <p className="font-bold text-darkWine">10% (Khô ráo)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Note Footer */}
            <div className="pt-4 border-t border-romantic-200 flex items-center justify-center gap-2 text-xs text-romantic-600 font-semibold bg-romantic-100/50 p-3 rounded-xl">
              <Heart className="w-4 h-4 text-romantic-500 fill-romantic-400" />
              <span>Thời tiết lý tưởng cho bữa tối lãng mạn & ngắm view phố 🍷</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

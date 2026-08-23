'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, CalendarHeart, Sparkles } from 'lucide-react';
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
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Title */}
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
          Đếm Ngược Đến Giờ Hẹn Hò
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-romantic-800 text-sm sm:text-base max-w-xl mx-auto mb-10 font-sans"
        >
          {timeLeft.isPast
            ? 'Giờ hẹn hò đã đến! Hãy chuẩn bị cho một ngày ngọt ngào nào 💖'
            : 'Mọi thứ đã được chuẩn bị sẵn sàng, chỉ còn đợi đến khoảnh khắc ta gặp nhau...'}
        </motion.p>

        {/* Countdown Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto"
        >
          {timeBlocks.map((block, index) => (
            <div
              key={index}
              className="relative p-6 rounded-2xl glass-card border border-romantic-200 shadow-romantic-glow flex flex-col items-center justify-center group hover:-translate-y-1 transition-transform"
            >
              <span className="font-serif text-4xl sm:text-5xl font-bold text-romantic-600 mb-1 tracking-tight">
                {String(block.value).padStart(2, '0')}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-romantic-800 uppercase tracking-wider">
                {block.label}
              </span>
              <div className="absolute top-2 right-2 text-romantic-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Bottom Note */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-romantic-600 font-medium">
          <Clock className="w-3.5 h-3.5" />
          <span>Hẹn gặp Milkpig vào lúc 17:00 ngày 25.08.2026</span>
        </div>
      </div>
    </section>
  );
}

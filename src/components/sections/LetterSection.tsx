'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LETTER_DATA } from '@/data/birthdayData';
import { Mail, Heart, Sparkles, Feather } from 'lucide-react';

export default function LetterSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="letter-section" className="py-24 px-4 bg-romantic-gradient relative">
      <div className="max-w-3xl mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-romantic-200 text-romantic-800 text-xs sm:text-sm font-semibold mb-4"
        >
          <Mail className="w-4 h-4 text-romantic-600" />
          <span>Letter From Heart</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl text-darkWine font-bold mb-4"
        >
          Bức Thư Gửi Tuổi 27
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-romantic-800 text-sm sm:text-base max-w-lg mx-auto mb-12 font-sans"
        >
          Chạm nhẹ vào phong bì bên dưới để mở lời nhắn chân thành dành riêng cho Milkpig.
        </motion.p>

        {/* Digital Interactive Envelope Container */}
        <div className="relative flex justify-center">
          {!isOpen ? (
            /* Closed Envelope Card */
            <motion.div
              initial={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsOpen(true)}
              className="relative w-full max-w-md bg-cream p-8 rounded-3xl border-2 border-romantic-300 shadow-romantic-glow cursor-pointer overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-romantic-400 via-roseGold to-romantic-500"></div>

              {/* Envelope Flap Icon */}
              <div className="my-6 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-romantic-100 flex items-center justify-center border-2 border-romantic-300 shadow-md group-hover:scale-110 transition-transform">
                  <Heart className="w-10 h-10 text-romantic-600 fill-romantic-500 animate-pulse" />
                </div>
              </div>

              <h3 className="font-cursive text-2xl text-darkWine font-bold mb-2">
                Gửi: Milkpig 💖
              </h3>
              <p className="text-xs text-romantic-500 italic">
                (Bấm để mở thư)
              </p>

              {/* Stamp */}
              <div className="absolute bottom-4 right-4 p-2 rounded-xl bg-romantic-100 border border-romantic-300 flex items-center gap-1 text-[10px] text-romantic-700 font-bold uppercase tracking-wider">
                <Feather className="w-3 h-3 text-romantic-500" />
                27.08.2026
              </div>
            </motion.div>
          ) : (
            /* Opened Letter Card */
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full bg-cream rounded-3xl p-8 sm:p-12 border-2 border-romantic-300 shadow-2xl text-left"
            >
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-romantic-200">
                <div className="flex items-center gap-2 text-romantic-600 font-bold font-cursive text-2xl">
                  <Sparkles className="w-5 h-5 text-romantic-500" />
                  {LETTER_DATA.salutation}
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-xs text-romantic-500 hover:text-romantic-800 underline font-semibold"
                >
                  Đóng thư
                </button>
              </div>

              {/* Letter Paragraphs */}
              <div className="space-y-4 font-serif text-darkWine text-base sm:text-lg leading-relaxed">
                {LETTER_DATA.paragraphs.map((p, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.3 }}
                  >
                    {p}
                  </motion.p>
                ))}
              </div>

              {/* Sender Sign-off */}
              <div className="mt-8 pt-6 border-t border-romantic-200 text-right">
                <p className="text-xs text-romantic-500 italic mb-1">
                  {LETTER_DATA.closing}
                </p>
                <p className="font-cursive text-2xl text-romantic-600 font-bold">
                  {LETTER_DATA.sender}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

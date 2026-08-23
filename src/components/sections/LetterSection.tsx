'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { LETTER_DATA } from '@/data/birthdayData';
import { Mail, Heart, Sparkles, Feather, PartyPopper, CheckCircle2, X } from 'lucide-react';

export default function LetterSection() {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });

  const triggerConfetti = () => {
    const count = 250;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#FF3B66', '#FFA3B3', '#E07A5F', '#F4A261', '#FFFFFF'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    setShowCelebration(true);
  };

  const handleDodgeNo = () => {
    const randomX = (Math.random() - 0.5) * 160;
    const randomY = (Math.random() - 0.5) * 80;
    setNoButtonPosition({ x: randomX, y: randomY });
  };

  return (
    <section id="letter-section" className="py-24 px-4 bg-romantic-gradient relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-romantic-200 text-romantic-800 text-xs sm:text-sm font-sans font-bold mb-4"
          >
            <Mail className="w-4 h-4 text-romantic-600" />
            <span>Letter From Heart & RSVP</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl text-darkWine font-bold mb-4"
          >
            Lời Nhắn Nhủ & Lời Hẹn Hò
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-romantic-800 text-sm sm:text-base max-w-xl mx-auto font-sans font-medium"
          >
            Mở bức thư tay dành riêng cho Milkpig và phản hồi cho buổi hẹn hò lãng mạn ngày 25/8 nhé!
          </motion.p>
        </div>

        {/* 2 Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Digital Interactive Letter */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            {!isLetterOpen ? (
              /* Closed Envelope Card */
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsLetterOpen(true)}
                className="relative w-full bg-cream p-8 rounded-3xl border-2 border-romantic-300 shadow-romantic-glow cursor-pointer overflow-hidden group min-h-[360px] flex flex-col justify-between"
              >
                <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-romantic-400 via-roseGold to-romantic-500"></div>

                <div className="my-auto text-center">
                  <div className="w-20 h-20 rounded-full bg-romantic-100 flex items-center justify-center border-2 border-romantic-300 shadow-md mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Heart className="w-10 h-10 text-romantic-600 fill-romantic-500 animate-pulse" />
                  </div>

                  <h3 className="font-cursive text-3xl text-darkWine font-bold mb-2">
                    Gửi: Milkpig 💖
                  </h3>
                  <p className="text-xs font-sans text-romantic-500 italic">
                    (Bấm vào đây để mở thư tay)
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs font-sans text-romantic-600 font-bold pt-4 border-t border-romantic-200">
                  <span className="flex items-center gap-1 font-sans font-bold">
                    <Feather className="w-3.5 h-3.5 text-romantic-500" /> Letter 27.08.2026
                  </span>
                  <span className="underline">Mở phong bì ✨</span>
                </div>
              </motion.div>
            ) : (
              /* Opened Letter Card */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative w-full bg-cream rounded-3xl p-6 sm:p-8 border-2 border-romantic-300 shadow-2xl text-left min-h-[360px] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-romantic-200">
                    <div className="flex items-center gap-2 text-romantic-600 font-bold font-cursive text-2xl">
                      <Sparkles className="w-5 h-5 text-romantic-500" />
                      {LETTER_DATA.salutation}
                    </div>
                    <button
                      onClick={() => setIsLetterOpen(false)}
                      className="text-xs font-sans text-romantic-500 hover:text-romantic-800 underline font-bold"
                    >
                      Đóng thư
                    </button>
                  </div>

                  <div className="space-y-3 font-serif text-darkWine text-sm sm:text-base leading-relaxed">
                    {LETTER_DATA.paragraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-romantic-200 text-right">
                  <p className="text-xs font-sans text-romantic-500 italic mb-0.5">
                    {LETTER_DATA.closing}
                  </p>
                  <p className="font-cursive text-2xl text-romantic-600 font-bold">
                    {LETTER_DATA.sender}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column: RSVP "Em Đồng Ý Đi Hẹn Hò Chứ?" */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card rounded-3xl p-8 border-2 border-romantic-300 shadow-romantic-glow flex flex-col items-center text-center justify-between min-h-[360px] bg-gradient-to-br from-white/90 to-romantic-50/70"
          >
            <div className="w-full">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-romantic-100 text-romantic-700 text-xs font-sans font-bold mb-4">
                <PartyPopper className="w-3.5 h-3.5 text-romantic-500" />
                <span>Xác Nhận Hẹn Hò</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-4xl text-darkWine font-bold mb-4">
                Em Đồng Ý Đi Hẹn Hò Chứ?
              </h3>

              <p className="text-romantic-800 text-sm sm:text-base font-sans leading-relaxed mb-8 max-w-md mx-auto">
                Một buổi tối lãng mạn ngày 25/8 đang chờ đợi Milkpig. Hãy bấm nút xác nhận bên dưới nhé! ✨
              </p>
            </div>

            {/* Interactive Buttons */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 relative min-h-[90px]">
              {/* YES Button */}
              <motion.button
                whileHover={{ scale: 1.06, boxShadow: '0 20px 40px rgba(255, 59, 102, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                onClick={triggerConfetti}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-romantic-500 via-romantic-600 to-roseGold text-white font-sans font-bold text-base shadow-romantic-glow flex items-center justify-center gap-3"
              >
                <Heart className="w-5 h-5 fill-white text-white animate-bounce" />
                <span>Đồng Ý Ngay! 💖</span>
              </motion.button>

              {/* NO Button (Playfully Dodges) */}
              <motion.button
                animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onMouseEnter={handleDodgeNo}
                onClick={handleDodgeNo}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full glass-card text-romantic-600 font-sans font-bold text-sm border border-romantic-300 shadow-sm"
              >
                Để xem đã 😜
              </motion.button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Celebration Modal */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-darkWine/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-md w-full bg-cream rounded-3xl p-8 text-center shadow-2xl border-2 border-romantic-300"
            >
              <button
                onClick={() => setShowCelebration(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-romantic-100 text-romantic-700 hover:bg-romantic-200"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-16 h-16 rounded-full bg-romantic-100 text-romantic-600 flex items-center justify-center mx-auto mb-4 border border-romantic-200 shadow-inner">
                <CheckCircle2 className="w-10 h-10 text-romantic-500" />
              </div>

              <h3 className="font-serif text-3xl text-darkWine font-bold mb-3">
                Tuyệt Vời Quá! 🎉
              </h3>

              <p className="text-romantic-800 text-base font-sans leading-relaxed mb-6">
                Hẹn gặp Milkpig vào lúc <strong className="text-romantic-600 font-bold">17:00 ngày 25/8/2026</strong>. Chuyến xe lãng mạn sẽ đón công chúa đúng giờ! 💖
              </p>

              <button
                onClick={() => setShowCelebration(false)}
                className="px-6 py-3 rounded-full bg-romantic-500 text-white font-sans font-bold text-sm shadow-md hover:bg-romantic-600 transition-colors inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Đóng cửa sổ
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

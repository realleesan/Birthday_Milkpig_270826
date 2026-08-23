'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, PartyPopper, CheckCircle2, X } from 'lucide-react';

export default function RsvpSection() {
  const [showCelebration, setShowCelebration] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });

  const triggerConfetti = () => {
    // Canvas Confetti explosive blast
    const count = 200;
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
    // Playfully move No button randomly
    const randomX = (Math.random() - 0.5) * 160;
    const randomY = (Math.random() - 0.5) * 80;
    setNoButtonPosition({ x: randomX, y: randomY });
  };

  return (
    <section id="rsvp-section" className="py-24 px-4 bg-cream relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-romantic-100 text-romantic-700 text-xs sm:text-sm font-semibold mb-4"
        >
          <PartyPopper className="w-4 h-4 text-romantic-500" />
          <span>Call To Action</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl text-darkWine font-bold mb-6"
        >
          Em Đồng Ý Đi Hẹn Hò Chứ?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-romantic-800 text-base sm:text-lg max-w-xl mx-auto mb-10 font-sans"
        >
          Một buổi tối lãng mạn ngày 25/8 đang chờ đợi Milkpig. Hãy bấm nút xác nhận bên dưới nhé! ✨
        </motion.p>

        {/* Buttons Group */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 relative min-h-[100px]"
        >
          {/* YES Button */}
          <motion.button
            whileHover={{ scale: 1.08, boxShadow: '0 20px 40px rgba(255, 59, 102, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={triggerConfetti}
            className="px-10 py-5 rounded-full bg-gradient-to-r from-romantic-500 via-romantic-600 to-roseGold text-white font-bold text-lg shadow-romantic-glow flex items-center gap-3"
          >
            <Heart className="w-6 h-6 fill-white text-white animate-bounce" />
            <span>Đồng Ý Ngay! 💖</span>
          </motion.button>

          {/* NO Button (Playfully dodges) */}
          <motion.button
            animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onMouseEnter={handleDodgeNo}
            onClick={handleDodgeNo}
            className="px-8 py-4 rounded-full glass-card text-romantic-600 font-semibold text-base border border-romantic-300 shadow-sm"
          >
            Để xem đã 😜
          </motion.button>
        </motion.div>
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

              <p className="text-romantic-800 text-base leading-relaxed mb-6 font-sans">
                Hẹn gặp Milkpig vào lúc <strong className="text-romantic-600 font-bold">17:00 ngày 25/8/2026</strong>. Chuyến xe lãng mạn sẽ đón công chúa đúng giờ! 💖
              </p>

              <button
                onClick={() => setShowCelebration(false)}
                className="px-6 py-3 rounded-full bg-romantic-500 text-white font-bold text-sm shadow-md hover:bg-romantic-600 transition-colors inline-flex items-center gap-2"
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

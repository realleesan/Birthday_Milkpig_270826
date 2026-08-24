'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GALLERY_DATA } from '@/data/birthdayData';
import { GalleryPhoto } from '@/types';
import LightboxModal from '@/components/LightboxModal';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export default function GallerySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const total = GALLERY_DATA.length;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  // Auto-play circular rotary effect
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3500);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <section id="gallery-section" className="py-24 px-4 bg-cream relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-cursive text-4xl sm:text-6xl text-romantic-600 font-bold mb-3"
          >
            Những Khoảnh Khắc Đẹp Nhất
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-romantic-800 text-sm sm:text-base font-sans font-medium max-w-xl mx-auto"
          >
            Bộ sưu tập hình ảnh kỷ niệm rạng rỡ của Milkpig.
          </motion.p>
        </div>

        {/* 3D Stacked Layered Circular Rotary Carousel Container */}
        <div className="relative w-full h-[380px] sm:h-[460px] flex items-center justify-center">
          
          {/* Previous Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 z-40 p-3 sm:p-4 rounded-full bg-white/80 hover:bg-white text-darkWine shadow-lg border border-romantic-200 transition-all hover:scale-110 backdrop-blur-md"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-6 z-40 p-3 sm:p-4 rounded-full bg-white/80 hover:bg-white text-darkWine shadow-lg border border-romantic-200 transition-all hover:scale-110 backdrop-blur-md"
            aria-label="Next photo"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Rotary Carousel Stack */}
          <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
            {GALLERY_DATA.map((photo: GalleryPhoto, index: number) => {
              // Calculate circular offset
              let offset = (index - activeIndex + total) % total;
              if (offset > total / 2) offset -= total;

              // Display 5 active visible positions (-2, -1, 0, 1, 2)
              const isVisible = Math.abs(offset) <= 2;

              if (!isVisible) return null;

              // 3D positioning parameters
              const xPos = offset * 180; // Horizontal offset in px
              const scale = 1 - Math.abs(offset) * 0.18; // Scale down side cards
              const rotateY = offset * -15; // 3D rotation
              const zIndex = 30 - Math.abs(offset) * 10; // Layering depth
              const opacity = 1 - Math.abs(offset) * 0.35; // Fade side cards

              return (
                <motion.div
                  key={photo.id}
                  animate={{
                    x: xPos,
                    scale: scale,
                    rotateY: rotateY,
                    zIndex: zIndex,
                    opacity: opacity,
                  }}
                  transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                  onClick={() => {
                    if (offset === 0) {
                      setSelectedPhoto(photo);
                    } else {
                      setActiveIndex(index);
                    }
                  }}
                  className="absolute w-[240px] sm:w-[320px] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white cursor-pointer group select-none bg-white"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Zoom Overlay on Hover for Center Slide */}
                  {offset === 0 && (
                    <div className="absolute inset-0 bg-darkWine/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="p-3.5 rounded-full bg-white/90 text-romantic-600 shadow-xl backdrop-blur-sm">
                        <ZoomIn className="w-6 h-6" />
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Rotary Navigation Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {GALLERY_DATA.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? 'w-8 bg-romantic-600'
                  : 'w-2.5 bg-romantic-300 hover:bg-romantic-400'
              }`}
              aria-label={`Go to photo ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </section>
  );
}

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Heart } from 'lucide-react';
import { GalleryPhoto } from '@/types';

interface LightboxModalProps {
  photo: GalleryPhoto | null;
  onClose: () => void;
}

export default function LightboxModal({ photo, onClose }: LightboxModalProps) {
  if (!photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-darkWine/80 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-xl w-full bg-cream rounded-2xl overflow-hidden shadow-2xl border border-romantic-200"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-darkWine/60 text-white hover:bg-darkWine transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Photo Container */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-romantic-50">
            <img
              src={photo.image}
              alt={photo.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Caption Details */}
          <div className="p-6">
            <div className="flex items-center justify-between text-xs text-romantic-500 font-semibold mb-2">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {photo.date}
              </span>
              <span className="flex items-center gap-1 text-romantic-400">
                <Heart className="w-3.5 h-3.5 fill-romantic-400" /> Memory
              </span>
            </div>
            <h3 className="font-serif text-2xl text-darkWine font-bold mb-2">
              {photo.title}
            </h3>
            <p className="text-romantic-800 text-sm leading-relaxed font-sans">
              {photo.caption}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

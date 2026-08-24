'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
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
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-darkWine/90 backdrop-blur-md cursor-pointer"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-[92vw] max-h-[92vh] flex items-center justify-center border-none rounded-none overflow-hidden shadow-2xl bg-black"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
            aria-label="Close full view"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Pure Image - Sharp corners, no border, no captions */}
          <img
            src={photo.image}
            alt={photo.title || 'Photo'}
            className="max-w-[92vw] max-h-[92vh] w-auto h-auto object-contain rounded-none border-none shadow-2xl block"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

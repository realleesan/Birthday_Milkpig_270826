'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GALLERY_DATA } from '@/data/birthdayData';
import { GalleryPhoto } from '@/types';
import LightboxModal from '@/components/LightboxModal';
import { Heart, ZoomIn } from 'lucide-react';

export default function GallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  return (
    <section id="gallery-section" className="py-24 px-4 bg-cream relative">
      <div className="max-w-6xl mx-auto">
        {/* Header (Dancing Script Heading) */}
        <div className="text-center mb-16">
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
            Mỗi bức ảnh Polaroid lưu giữ một mảnh ký ức ngọt ngào mà chúng ta đã cùng viết nên.
          </motion.p>
        </div>

        {/* Polaroid Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {GALLERY_DATA.map((photo: GalleryPhoto, index: number) => {
            const rotation = photo.rotationAngle || (index % 2 === 0 ? -2 : 3);

            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{ transform: `rotate(${rotation}deg)` }}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
                onClick={() => setSelectedPhoto(photo)}
                className="bg-white p-4 rounded-xl shadow-polaroid border border-romantic-200 cursor-pointer group transition-all"
              >
                {/* Photo Frame */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-romantic-100 mb-3">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-darkWine/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-3 rounded-full bg-white/90 text-romantic-600 shadow-md">
                      <ZoomIn className="w-5 h-5" />
                    </span>
                  </div>
                </div>

                {/* Polaroid Bottom Text */}
                <div className="text-center pt-2">
                  <h3 className="font-cursive text-2xl text-darkWine font-bold truncate">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-romantic-500 font-sans font-bold mt-0.5 flex items-center justify-center gap-1">
                    <Heart className="w-3 h-3 fill-romantic-300 text-romantic-300" />
                    {photo.date}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </section>
  );
}

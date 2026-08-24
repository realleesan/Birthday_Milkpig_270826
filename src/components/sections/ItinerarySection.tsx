'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ITINERARY_DATA } from '@/data/birthdayData';
import { MapPin, ExternalLink, Clock, Car, Utensils, Coffee, Gift, Camera, Sparkles } from 'lucide-react';
import { ItineraryItem } from '@/types';

export default function ItinerarySection() {
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Car':
        return <Car className="w-4 h-4" />;
      case 'Camera':
        return <Camera className="w-4 h-4" />;
      case 'Utensils':
        return <Utensils className="w-4 h-4" />;
      case 'Coffee':
        return <Coffee className="w-4 h-4" />;
      case 'Gift':
        return <Gift className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <section id="itinerary-section" className="py-24 px-4 bg-romantic-gradient relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-cursive text-4xl sm:text-6xl text-romantic-600 font-bold mb-3"
          >
            Hành Trình Ngọt Ngào Dành Cho Milkpig
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-romantic-800 text-sm sm:text-base font-sans font-medium max-w-xl mx-auto"
          >
            Một buổi tối trọn vẹn với từng khoảnh khắc được chuẩn bị tỉ mỉ để tạo nên ký ức đáng nhớ nhất.
          </motion.p>
        </div>

        {/* Clean 5-Step Responsive Grid Layout - No text cutoff, Dancing Script for step titles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 items-stretch">
          {ITINERARY_DATA.map((item: ItineraryItem, index: number) => {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card rounded-2xl p-5 border border-romantic-200 shadow-romantic-glow hover:-translate-y-1.5 transition-all flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  {/* Step Image */}
                  <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3 bg-romantic-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 px-3 py-1 rounded-full bg-darkWine/85 backdrop-blur-md text-white text-xs font-sans font-bold flex items-center gap-1.5 shadow-sm">
                      {getIcon(item.iconName)}
                      <span>Step {index + 1}</span>
                    </div>
                  </div>

                  {/* Time & Title (Title in Dancing Script font-cursive, no text truncation cutoff) */}
                  <div className="flex items-center gap-1.5 text-romantic-600 text-xs font-sans font-extrabold mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.time}</span>
                  </div>

                  <h3 className="font-cursive text-2xl text-darkWine font-bold mb-2 leading-snug">
                    {item.title}
                  </h3>

                  {/* Full description display - NO line-clamp truncation */}
                  <p className="text-romantic-800 text-xs font-sans leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Location & Map button - Full text display, no truncation cutoff */}
                <div className="pt-3 border-t border-romantic-200 text-xs text-romantic-700 font-sans flex flex-col gap-1.5 mt-auto">
                  <div className="flex items-start gap-1 font-bold text-[11px] text-romantic-700 leading-snug">
                    <MapPin className="w-3.5 h-3.5 text-romantic-500 shrink-0 mt-0.5" />
                    <span>{item.location}</span>
                  </div>

                  {item.googleMapsUrl && (
                    <a
                      href={item.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-romantic-600 hover:text-romantic-800 font-bold hover:underline self-end text-[11px]"
                    >
                      Maps <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

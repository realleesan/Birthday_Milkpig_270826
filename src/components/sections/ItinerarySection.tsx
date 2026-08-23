'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ITINERARY_DATA } from '@/data/birthdayData';
import { MapPin, ExternalLink, Clock, Car, Utensils, Coffee, Gift, Sparkles } from 'lucide-react';
import { ItineraryItem } from '@/types';

export default function ItinerarySection() {
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Car':
        return <Car className="w-5 h-5" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5" />;
      case 'Gift':
        return <Gift className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="itinerary-section" className="py-24 px-4 bg-romantic-gradient relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Header (Dancing Script Heading) */}
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

        {/* Timeline Items */}
        <div className="relative space-y-12 before:absolute before:inset-0 before:left-5 md:before:left-1/2 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-romantic-300 before:via-romantic-400 before:to-roseGold">
          {ITINERARY_DATA.map((item: ItineraryItem, index: number) => {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                {/* Timeline Circle Icon Badge */}
                <div className="absolute left-5 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-romantic-500 to-roseGold text-white flex items-center justify-center shadow-lg border-2 border-white z-10">
                  {getIcon(item.iconName)}
                </div>

                {/* Content Card Wrapper */}
                <div className="w-[calc(100%-3.5rem)] ml-auto md:ml-0 md:w-[calc(50%-2.5rem)] glass-card rounded-2xl p-6 border border-romantic-200 shadow-romantic-glow hover:-translate-y-1 transition-all group overflow-hidden">
                  {/* Image Preview */}
                  <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 bg-romantic-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {item.tag && (
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-darkWine/80 backdrop-blur-md text-white text-xs font-sans font-bold">
                        {item.tag}
                      </span>
                    )}
                  </div>

                  {/* Time & Title */}
                  <div className="flex items-center gap-2 text-romantic-600 text-xs font-sans font-extrabold mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.time}</span>
                  </div>

                  <h3 className="font-sans text-xl sm:text-2xl text-darkWine font-extrabold mb-2 tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-romantic-800 text-xs sm:text-sm font-sans leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Location & Map button */}
                  <div className="flex items-center justify-between pt-3 border-t border-romantic-200 text-xs text-romantic-700 font-sans">
                    <span className="flex items-center gap-1 font-bold">
                      <MapPin className="w-3.5 h-3.5 text-romantic-500" />
                      {item.location}
                    </span>

                    {item.googleMapsUrl && (
                      <a
                        href={item.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-romantic-600 hover:text-romantic-800 font-bold hover:underline"
                      >
                        Google Maps <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

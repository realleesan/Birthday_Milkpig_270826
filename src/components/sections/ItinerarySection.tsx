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
    <section id="itinerary-section" className="py-24 px-4 bg-romantic-gradient relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-romantic-200 text-romantic-800 text-xs sm:text-sm font-sans font-bold mb-4"
          >
            <MapPin className="w-4 h-4 text-romantic-600" />
            <span>Lịch Trình Hẹn Hò 25/8</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl text-darkWine font-bold mb-4"
          >
            Hành Trình Ngọt Ngào Dành Cho Milkpig
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-romantic-800 text-sm sm:text-base max-w-xl mx-auto font-sans font-medium"
          >
            Một buổi tối trọn vẹn với từng khoảnh khắc được chuẩn bị tỉ mỉ để tạo nên ký ức đáng nhớ nhất.
          </motion.p>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l-2 border-romantic-300 ml-4 md:ml-1/2 md:-translate-x-1/2 space-y-12">
          {ITINERARY_DATA.map((item: ItineraryItem, index: number) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="relative pl-8 md:pl-0 flex flex-col md:flex-row items-start"
              >
                {/* Timeline Circle Icon */}
                <div className="absolute -left-4 md:left-1/2 md:-translate-x-1/2 w-9 h-9 rounded-full bg-gradient-to-r from-romantic-500 to-roseGold text-white flex items-center justify-center shadow-lg border-2 border-white z-10">
                  {getIcon(item.iconName)}
                </div>

                {/* Content Card Wrapper */}
                <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'}`}>
                  <div className="glass-card rounded-2xl p-6 border border-romantic-200 shadow-romantic-glow hover:-translate-y-1 transition-all group overflow-hidden">
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

                    {/* Time & Title - Inter Font for step times */}
                    <div className="flex items-center gap-2 text-romantic-600 text-xs font-sans font-extrabold mb-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{item.time}</span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl text-darkWine font-bold mb-2">
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
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

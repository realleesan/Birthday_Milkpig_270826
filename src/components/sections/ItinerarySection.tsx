'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ITINERARY_DATA, SEAFOOD_OPTIONS } from '@/data/birthdayData';
import { MapPin, ExternalLink, Clock, Car, Utensils, Coffee, Gift, Camera, Sparkles, ChevronDown } from 'lucide-react';
import { ItineraryItem } from '@/types';

export default function ItinerarySection() {
  const [showSeafoodDetails, setShowSeafoodDetails] = useState(true);

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
        <div className="text-center mb-14">
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

        {/* 5-Step Balanced Responsive Grid Layout - Uniform Heights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {ITINERARY_DATA.map((item: ItineraryItem, index: number) => {
            const isSeafoodStep = item.id === '3';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card rounded-2xl p-5 border border-romantic-200 shadow-romantic-glow hover:-translate-y-1.5 transition-all flex flex-col justify-between group overflow-hidden bg-white/90"
              >
                <div>
                  {/* Step Image */}
                  <div className="relative w-full h-40 rounded-xl overflow-hidden mb-4 bg-romantic-100">
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

                  {/* Time & Title */}
                  <div className="flex items-center gap-1.5 text-romantic-600 text-xs font-sans font-extrabold mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.time}</span>
                  </div>

                  <h3 className="font-cursive text-2xl text-darkWine font-bold mb-2 leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-romantic-800 text-xs font-sans leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Sleek Seafood Option Badge in Step 3 */}
                  {isSeafoodStep && (
                    <div className="mb-3">
                      <button
                        onClick={() => setShowSeafoodDetails(!showSeafoodDetails)}
                        className="w-full py-2 px-3 rounded-xl bg-romantic-50 hover:bg-romantic-100 border border-romantic-200 text-romantic-600 text-xs font-sans font-bold flex items-center justify-between transition-colors shadow-2xs"
                      >
                        <span className="flex items-center gap-1.5">
                          <Utensils className="w-3.5 h-3.5 text-romantic-500" /> 3 Lựa chọn nhà hàng
                        </span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showSeafoodDetails ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Location & Map Link */}
                <div className="pt-3 border-t border-romantic-200 text-xs text-romantic-700 font-sans flex flex-col gap-1.5 mt-auto">
                  <div className="flex items-start gap-1 font-bold text-[11px] text-romantic-700 leading-snug">
                    <MapPin className="w-3.5 h-3.5 text-romantic-500 shrink-0 mt-0.5" />
                    <span>{item.location}</span>
                  </div>

                  {item.googleMapsUrl && !isSeafoodStep && (
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

        {/* Dedicated 3-Column Seafood Restaurant Options Panel */}
        {showSeafoodDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 glass-card rounded-3xl p-6 sm:p-8 border-2 border-romantic-200/90 shadow-2xl bg-white/95"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 pb-4 border-b border-romantic-100 gap-3">
              <div>
                <h4 className="font-cursive text-3xl sm:text-4xl text-romantic-600 font-bold flex items-center gap-2">
                  <Utensils className="w-6 h-6 text-romantic-500" /> 3 Lựa Chọn Nhà Hàng Buffet Hải Sản Cho Chặng 3
                </h4>
                <p className="text-romantic-800 text-xs sm:text-sm font-sans font-medium mt-1">
                  Vợ yêu thích chọn địa điểm nào thì mình sẽ ghé thưởng thức tiệc hải sản ở đó nhé!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SEAFOOD_OPTIONS.map((opt, i) => (
                <div
                  key={opt.id}
                  className="p-4 sm:p-5 rounded-2xl border border-romantic-200/90 bg-romantic-50/50 hover:bg-white hover:border-romantic-400 hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="inline-block px-3 py-1 rounded-full bg-romantic-600 text-white text-[11px] font-sans font-bold mb-3 shadow-xs">
                      Lựa chọn {i + 1}
                    </div>
                    <h5 className="font-bold text-darkWine text-base sm:text-lg mb-2 group-hover:text-romantic-600 transition-colors">
                      {opt.name}
                    </h5>
                    <p className="text-xs sm:text-sm text-romantic-700 leading-relaxed font-sans mb-4 flex items-start gap-1.5">
                      <MapPin className="w-4 h-4 text-romantic-500 shrink-0 mt-0.5" />
                      <span>{opt.address}</span>
                    </p>
                  </div>

                  <a
                    href={opt.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-romantic-600 hover:bg-romantic-700 text-white text-xs font-sans font-bold transition-all shadow-sm group-hover:shadow-md"
                  >
                    <span>Mở Google Maps chỉ đường</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ITINERARY_DATA, SEAFOOD_OPTIONS } from '@/data/birthdayData';
import { MapPin, ExternalLink, Clock, Car, Utensils, Coffee, Gift, Camera, Sparkles, Navigation } from 'lucide-react';
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

        {/* Clean 5-Step Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 items-stretch">
          {ITINERARY_DATA.map((item: ItineraryItem, index: number) => {
            const isSeafoodStep = item.id === '3';

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

                  {/* Special 3 Seafood Restaurant Options for Step 3 */}
                  {isSeafoodStep && (
                    <div className="mb-4 bg-romantic-50/90 p-3 rounded-xl border border-romantic-200 flex flex-col gap-2">
                      <div className="text-[11px] font-sans font-extrabold text-romantic-600 uppercase tracking-wider flex items-center gap-1">
                        <Utensils className="w-3 h-3" /> 3 Lựa Chọn Hấp Dẫn:
                      </div>
                      <div className="flex flex-col gap-1.5 text-[11px] font-sans text-darkWine">
                        {SEAFOOD_OPTIONS.map((opt, i) => (
                          <div key={opt.id} className="bg-white p-2 rounded-lg border border-romantic-100 shadow-2xs">
                            <div className="font-bold text-romantic-700 flex items-center justify-between">
                              <span>{i + 1}. {opt.name}</span>
                              <a
                                href={opt.googleMapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-romantic-500 hover:text-romantic-700 underline text-[10px]"
                              >
                                Maps &rarr;
                              </a>
                            </div>
                            <div className="text-[10px] text-romantic-800/80 leading-tight mt-0.5">
                              📍 {opt.address}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Location & Map link */}
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
      </div>
    </section>
  );
}

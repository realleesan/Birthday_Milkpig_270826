'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Sparkles, CloudSun, MapPin, Thermometer, Droplets, Wind, Umbrella, Heart, Loader2 } from 'lucide-react';
import { COUNTDOWN_TARGET } from '@/data/birthdayData';
import { CountdownTime } from '@/types';

interface WeatherData {
  temp: number;
  feelsLike: number;
  tempMax: number;
  tempMin: number;
  humidity: number;
  windSpeed: number;
  rainChance: string;
  description: string;
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState<boolean>(true);

  // 1. Real-time Countdown Timer
  useEffect(() => {
    const calculateTime = () => {
      const targetDate = new Date(COUNTDOWN_TARGET).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. Fetch Pure Live Weather Data for Hanoi from Open-Meteo API
  useEffect(() => {
    const fetchHanoiWeather = async () => {
      try {
        setIsLoadingWeather(true);
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=21.0285&longitude=105.8542&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FBangkok'
        );
        const data = await res.json();

        if (data && data.current) {
          const wCode = data.current.weather_code;
          let desc = 'Thời tiết dịu mát';
          if (wCode === 0) desc = 'Trời quang mây tạnh';
          else if (wCode >= 1 && wCode <= 3) desc = 'Mây dịu nhẹ, thoáng mát';
          else if (wCode >= 51 && wCode <= 67) desc = 'Có mưa phun nhẹ';
          else if (wCode >= 80) desc = 'Mưa rào';

          setWeather({
            temp: Math.round(data.current.temperature_2m),
            feelsLike: Math.round(data.current.apparent_temperature),
            tempMax: Math.round(data.daily.temperature_2m_max[0]),
            tempMin: Math.round(data.daily.temperature_2m_min[0]),
            humidity: data.current.relative_humidity_2m,
            windSpeed: Math.round(data.current.wind_speed_10m),
            rainChance: data.current.precipitation > 0 ? 'Có mưa' : '0% (Khô ráo)',
            description: desc,
          });
        }
      } catch (err) {
        console.error('Weather API Error:', err);
      } finally {
        setIsLoadingWeather(false);
      }
    };

    fetchHanoiWeather();
  }, []);

  const timeBlocks = [
    { label: 'NGÀY', value: timeLeft.days },
    { label: 'GIỜ', value: timeLeft.hours },
    { label: 'PHÚT', value: timeLeft.minutes },
    { label: 'GIÂY', value: timeLeft.seconds },
  ];

  return (
    <section id="countdown-section" className="py-20 px-4 bg-cream relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-cursive text-4xl sm:text-6xl text-romantic-600 font-bold mb-3"
          >
            Đếm Ngược & Thời Tiết Hà Nội Realtime
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-romantic-800 text-sm sm:text-base font-sans font-medium max-w-xl mx-auto"
          >
            Dữ liệu thời tiết trực tiếp từ trạm khí tượng Hà Nội và đồng hồ đếm ngược ngày hẹn hò.
          </motion.p>
        </div>

        {/* 2 Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Column: Real-time Countdown Timer (Dancing Script Card Title) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card rounded-3xl p-6 sm:p-8 border border-romantic-200 shadow-romantic-glow flex flex-col justify-between min-h-[380px]"
          >
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-romantic-200">
                <span className="font-cursive text-2xl sm:text-3xl text-darkWine font-bold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-romantic-500 shrink-0" />
                  Đồng Hồ Đếm Ngược
                </span>
                <span className="text-xs font-sans font-bold px-3 py-1 rounded-full bg-romantic-100 text-romantic-700">
                  Target: 27.08.2026
                </span>
              </div>

              {/* 2x2 Grid for Countdown Boxes */}
              <div className="grid grid-cols-2 gap-4 my-2">
                {timeBlocks.map((block, index) => (
                  <div
                    key={index}
                    className="relative p-6 sm:p-7 rounded-2xl bg-white/90 border border-romantic-200 shadow-sm flex flex-col items-center justify-center group hover:-translate-y-1 transition-transform"
                  >
                    <span className="font-sans text-4xl sm:text-5xl font-extrabold text-romantic-600 mb-1 tracking-tight">
                      {String(block.value).padStart(2, '0')}
                    </span>
                    <span className="text-xs font-sans font-bold text-romantic-800 uppercase tracking-wider">
                      {block.label}
                    </span>
                    <div className="absolute top-2.5 right-2.5 text-romantic-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Note Footer */}
            <div className="pt-4 border-t border-romantic-200 flex items-center justify-center gap-2 font-sans text-xs sm:text-sm text-romantic-600 font-bold bg-romantic-50/50 p-3 rounded-xl mt-4">
              <Clock className="w-4 h-4 text-romantic-500 animate-pulse shrink-0" />
              <span>Hẹn gặp Milkpig đúng 17:00 ngày 27.08.2026</span>
            </div>
          </motion.div>

          {/* Right Column: Live Hanoi Weather Forecast API (Dancing Script Card Title) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card rounded-3xl p-6 sm:p-8 border border-romantic-200 shadow-romantic-glow flex flex-col justify-between bg-gradient-to-br from-white/90 to-romantic-50/70 min-h-[380px]"
          >
            {isLoadingWeather || !weather ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[250px]">
                <Loader2 className="w-8 h-8 text-romantic-500 animate-spin mb-3" />
                <p className="text-xs text-romantic-600 font-semibold font-sans">Đang kết nối API thời tiết Hà Nội...</p>
              </div>
            ) : (
              <>
                <div>
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-romantic-200">
                    <span className="font-cursive text-2xl sm:text-3xl text-darkWine font-bold flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-romantic-500 shrink-0" />
                      Thời Tiết Hà Nội Trực Tiếp
                    </span>
                    <span className="text-xs font-sans font-bold px-3 py-1 rounded-full bg-champagne-light text-roseGold-dark border border-champagne/40">
                      Live API
                    </span>
                  </div>

                  {/* Weather Main Info Card */}
                  <div className="flex items-center gap-6 p-4 rounded-2xl bg-white/90 border border-romantic-200 shadow-sm mb-5">
                    <div className="p-3.5 rounded-2xl bg-romantic-100 text-romantic-600 flex items-center justify-center">
                      <CloudSun className="w-12 h-12 text-romantic-500 animate-float-slow" />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-sans text-4xl sm:text-5xl font-extrabold text-darkWine tracking-tight">
                          {weather.temp}°C
                        </span>
                        <span className="text-xs font-sans text-romantic-500 font-bold">
                          (Cảm giác {weather.feelsLike}°C)
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-sans font-bold text-romantic-700 mt-1">
                        {weather.description}
                      </p>
                    </div>
                  </div>

                  {/* Detailed Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4 text-xs font-sans">
                    <div className="p-3 rounded-xl bg-white/70 border border-romantic-100 flex items-center gap-2.5">
                      <Thermometer className="w-4 h-4 text-romantic-500 shrink-0" />
                      <div>
                        <p className="text-romantic-400 font-bold text-[10px]">Nhiệt độ ngày</p>
                        <p className="font-sans font-extrabold text-darkWine text-sm">{weather.tempMin}°C - {weather.tempMax}°C</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/70 border border-romantic-100 flex items-center gap-2.5">
                      <Droplets className="w-4 h-4 text-romantic-500 shrink-0" />
                      <div>
                        <p className="text-romantic-400 font-bold text-[10px]">Độ ẩm</p>
                        <p className="font-sans font-extrabold text-darkWine text-sm">{weather.humidity}%</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/70 border border-romantic-100 flex items-center gap-2.5">
                      <Wind className="w-4 h-4 text-romantic-500 shrink-0" />
                      <div>
                        <p className="text-romantic-400 font-bold text-[10px]">Gió</p>
                        <p className="font-sans font-extrabold text-darkWine text-sm">{weather.windSpeed} km/h</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/70 border border-romantic-100 flex items-center gap-2.5">
                      <Umbrella className="w-4 h-4 text-romantic-500 shrink-0" />
                      <div>
                        <p className="text-romantic-400 font-bold text-[10px]">Khả năng mưa</p>
                        <p className="font-sans font-extrabold text-darkWine text-sm">{weather.rainChance}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Note Footer */}
                <div className="pt-4 border-t border-romantic-200 flex items-center justify-center gap-2 font-sans text-xs sm:text-sm text-romantic-600 font-bold bg-romantic-100/50 p-3 rounded-xl">
                  <Heart className="w-4 h-4 text-romantic-500 fill-romantic-400 shrink-0" />
                  <span>Dữ liệu trực tiếp từ trạm khí tượng Hà Nội Open-Meteo</span>
                </div>
              </>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

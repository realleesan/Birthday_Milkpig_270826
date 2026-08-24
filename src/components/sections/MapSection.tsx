'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ITINERARY_DATA } from '@/data/birthdayData';
import { Navigation, MapPin, Clock, Route, Compass, Heart } from 'lucide-react';
import { ItineraryItem } from '@/types';

export default function MapSection() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const [selectedStep, setSelectedStep] = useState<ItineraryItem>(ITINERARY_DATA[0]);
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);

  // Total route statistics
  const totalDistance = '11.7 km';
  const totalTime = '6 tiếng (17:00 - 23:00)';
  const totalStops = ITINERARY_DATA.length;

  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return;

    // Dynamically import Leaflet client-side to prevent Next.js SSR build errors
    let isMounted = true;

    const initMap = async () => {
      try {
        // Load Leaflet CSS if not already added
        if (!document.getElementById('leaflet-css')) {
          const cssLink = document.createElement('link');
          cssLink.id = 'leaflet-css';
          cssLink.rel = 'stylesheet';
          cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          document.head.appendChild(cssLink);
        }

        const L = (await import('leaflet')).default;

        if (!isMounted || !mapContainerRef.current) return;

        // Destroy previous instance if re-initializing
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
        }

        // Center map around Hanoi (21.038, 105.845)
        const map = L.map(mapContainerRef.current, {
          center: [21.038, 105.845],
          zoom: 13,
          zoomControl: false,
        });

        // Add sleek CartoDB Voyager tiles for modern aesthetic
        L.tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19,
          }
        ).addTo(map);

        // Add custom Zoom control in bottom right
        L.control.zoom({ position: 'bottomright' }).addTo(map);

        // Collect coordinates for Polyline
        const latLngs: [number, number][] = [];

        // Add Numbered Markers for each Chặng
        ITINERARY_DATA.forEach((item, index) => {
          if (item.lat && item.lng) {
            const point: [number, number] = [item.lat, item.lng];
            latLngs.push(point);

            // Custom Numbered Pink Badge Marker Icon
            const customIcon = L.divIcon({
              className: 'custom-map-marker',
              html: `
                <div style="
                  width: 36px;
                  height: 36px;
                  background: linear-gradient(135deg, #FF3B66, #E07A5F);
                  color: white;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-weight: 800;
                  font-family: sans-serif;
                  font-size: 14px;
                  box-shadow: 0 8px 16px rgba(255, 59, 102, 0.4);
                  border: 3px solid white;
                  cursor: pointer;
                  transition: transform 0.2s ease;
                ">
                  ${index + 1}
                </div>
              `,
              iconSize: [36, 36],
              iconAnchor: [18, 18],
            });

            const marker = L.marker(point, { icon: customIcon }).addTo(map);

            // Custom Leaflet Popup Content
            const popupContent = `
              <div style="font-family: sans-serif; padding: 4px; max-width: 200px;">
                <div style="font-size: 11px; font-weight: 800; color: #FF3B66; margin-bottom: 2px;">
                  ${item.time} • Step ${index + 1}
                </div>
                <div style="font-size: 13px; font-weight: 800; color: #2B0B14; margin-bottom: 4px;">
                  ${item.title}
                </div>
                <div style="font-size: 11px; color: #666; margin-bottom: 6px;">
                  📍 ${item.location}
                </div>
              </div>
            `;

            marker.bindPopup(popupContent);

            marker.on('click', () => {
              setSelectedStep(item);
            });
          }
        });

        // Draw Polyline Route connecting Ping 1 -> 2 -> 3 -> 4 -> 5
        if (latLngs.length > 1) {
          const polyline = L.polyline(latLngs, {
            color: '#FF3B66',
            weight: 4,
            opacity: 0.8,
            dashArray: '8, 8',
          }).addTo(map);

          // Fit bounds to fit all markers cleanly
          map.fitBounds(polyline.getBounds(), { padding: [40, 40] });
        }

        mapInstanceRef.current = map;
        setIsMapLoaded(true);
      } catch (err) {
        console.error('Leaflet initialization error:', err);
      }
    };

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Center map on selected step
  const handleSelectStep = (step: ItineraryItem) => {
    setSelectedStep(step);
    if (mapInstanceRef.current && step.lat && step.lng) {
      mapInstanceRef.current.flyTo([step.lat, step.lng], 14, {
        duration: 1.2,
      });
    }
  };

  return (
    <section id="map-section" className="py-24 px-4 bg-cream relative overflow-hidden">
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
            Bản Đồ Hành Trình Hẹn Hò Realtime
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-romantic-800 text-sm sm:text-base font-sans font-medium max-w-xl mx-auto"
          >
            Tích hợp bản đồ vệ tinh kết nối đường đi trực tiếp giữa 5 chặng hẹn hò lãng mạn ngày 27/8.
          </motion.p>
        </div>

        {/* Master Map Glass Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-[32px] p-4 sm:p-8 border-2 border-romantic-200/90 shadow-2xl bg-white/90 flex flex-col gap-6"
        >
          {/* Top Route Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-romantic-50/70 p-4 rounded-2xl border border-romantic-200/80 font-sans text-xs sm:text-sm">
            <div className="flex items-center gap-3 p-2">
              <div className="p-2.5 rounded-xl bg-white text-romantic-600 shadow-sm border border-romantic-200">
                <Route className="w-5 h-5 text-romantic-500" />
              </div>
              <div>
                <p className="text-romantic-400 font-bold text-[11px]">Tổng quãng đường</p>
                <p className="font-extrabold text-darkWine text-base">{totalDistance}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="p-2.5 rounded-xl bg-white text-romantic-600 shadow-sm border border-romantic-200">
                <Clock className="w-5 h-5 text-romantic-500" />
              </div>
              <div>
                <p className="text-romantic-400 font-bold text-[11px]">Khung giờ di chuyển</p>
                <p className="font-extrabold text-darkWine text-base">{totalTime}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="p-2.5 rounded-xl bg-white text-romantic-600 shadow-sm border border-romantic-200">
                <Navigation className="w-5 h-5 text-romantic-500" />
              </div>
              <div>
                <p className="text-romantic-400 font-bold text-[11px]">Số chặng hẹn hò</p>
                <p className="font-extrabold text-darkWine text-base">{totalStops} Chặng Lãng Mạn</p>
              </div>
            </div>
          </div>

          {/* Interactive Leaflet Map Canvas */}
          <div className="relative w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden border border-romantic-200 shadow-inner">
            <div ref={mapContainerRef} className="w-full h-full z-0 bg-romantic-100" />
          </div>

          {/* Step Selector Horizontal Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
            {ITINERARY_DATA.map((step, idx) => {
              const isSelected = selectedStep.id === step.id;

              return (
                <button
                  key={step.id}
                  onClick={() => handleSelectStep(step)}
                  className={`p-3.5 rounded-2xl border text-left font-sans transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-r from-romantic-500 to-roseGold text-white border-romantic-500 shadow-md scale-[1.02]'
                      : 'bg-white/80 hover:bg-white text-darkWine border-romantic-200 shadow-sm hover:border-romantic-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-bold mb-1 opacity-90">
                      <span>Step {idx + 1} • {step.time}</span>
                      {step.distanceFromPrev !== '0 km' && (
                        <span className="text-[10px] opacity-80">+{step.distanceFromPrev}</span>
                      )}
                    </div>
                    <div className="font-extrabold text-xs leading-snug line-clamp-1">
                      {step.title}
                    </div>
                  </div>
                  <div className="text-[11px] opacity-80 mt-2 flex items-center gap-1 font-medium truncate">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{step.location}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import React, { useState } from 'react';
import HeroSection from '@/components/sections/HeroSection';
import CountdownSection from '@/components/sections/CountdownSection';
import ItinerarySection from '@/components/sections/ItinerarySection';
import GallerySection from '@/components/sections/GallerySection';
import LetterSection from '@/components/sections/LetterSection';
import RsvpSection from '@/components/sections/RsvpSection';
import MusicPlayer from '@/components/MusicPlayer';
import { HERO_DATA } from '@/data/birthdayData';
import { Heart } from 'lucide-react';

export default function Home() {
  const [autoPlayAudio, setAutoPlayAudio] = useState(false);

  const handleExploreClick = () => {
    // Enable audio autoplay
    setAutoPlayAudio(true);

    // Smooth scroll down to countdown section
    const countdownEl = document.getElementById('countdown-section');
    if (countdownEl) {
      countdownEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-cream text-darkWine relative">
      {/* Floating Music Player */}
      <MusicPlayer
        audioUrl={HERO_DATA.audioUrl}
        songTitle={HERO_DATA.audioTitle}
        autoPlayTrigger={autoPlayAudio}
      />

      {/* Section 01: Hero Teaser */}
      <HeroSection onExploreClick={handleExploreClick} />

      {/* Section 02: Countdown to 25/8 */}
      <CountdownSection />

      {/* Section 03: Interactive Itinerary */}
      <ItinerarySection />

      {/* Section 04: Memories Gallery */}
      <GallerySection />

      {/* Section 05: Letter From Heart */}
      <LetterSection />

      {/* Section 06: RSVP & Call To Action */}
      <RsvpSection />

      {/* Footer */}
      <footer className="py-10 bg-darkWine text-white text-center border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4">
          <p className="font-cursive text-2xl text-romantic-300 font-bold mb-2 flex items-center justify-center gap-2">
            Milkpig Birthday 27/8 <Heart className="w-5 h-5 text-romantic-500 fill-romantic-500" /> Date 25/8
          </p>
          <p className="text-xs text-romantic-200/70 font-sans">
            Created with endless love & care for Milkpig • 2026
          </p>
        </div>
      </footer>
    </main>
  );
}

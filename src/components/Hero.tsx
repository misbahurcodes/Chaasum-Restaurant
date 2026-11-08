import React, { useState, useEffect } from 'react';
import { ArrowDown, Clock, MapPin, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onOpenReservation }) => {
  const [hoursInfo, setHoursInfo] = useState<{
    isOpen: boolean;
    closesSoon: boolean;
    closingTime: string;
  }>({
    isOpen: true,
    closesSoon: false,
    closingTime: '11:30 PM',
  });

  useEffect(() => {
    fetch('/api/hours-status')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.success) {
          setHoursInfo({
            isOpen: data.isOpen,
            closesSoon: data.closesSoon,
            closingTime: data.closingTime || '11:30 PM',
          });
        }
      })
      .catch(() => {
        // Safe fallback
      });
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Cinematic Food & Forest Image with Rich Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero.jpg"
          alt="Steaming Himalayan Momos and Tibetan Thukpa at Chaasum Restaurant overlooking misty Sevoke forest"
          className="w-full h-full object-cover object-center scale-105 animate-[subtleZoom_20s_ease-in-out_infinite_alternate]"
          referrerPolicy="no-referrer"
          loading="eager"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.indexOf('/images/hero.jpg') !== -1) {
              target.src = '/src/assets/images/hero_chaasum_restaurant_1794131815689.jpg';
            }
          }}
        />
        {/* Measured dark gradient overlay ensuring 4.5:1 text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a120f] via-[#0a120f]/75 to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0a120f]/40 to-[#0a120f]/90" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
        {/* Clean Unboxed Kicker Metadata */}
        <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm text-[#d4af37] font-medium tracking-widest uppercase mb-4">
          <span className="font-hindi text-base tracking-normal text-[#e7c87c]">चासुम रेस्टोरेंट</span>
          <span aria-hidden="true" className="text-stone-500">·</span>
          <span>Himalayan & Asian Kitchen</span>
          <span aria-hidden="true" className="text-stone-500">·</span>
          <span className="flex items-center gap-1 text-stone-300">
            <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
            Sevoke Bazar, West Bengal
          </span>
        </div>

        {/* Brand Display Header */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-4 leading-none">
          CHAASUM
          <span className="block font-hindi text-3xl sm:text-5xl md:text-6xl font-normal text-[#d4af37] mt-1">
            चासुम
          </span>
        </h1>

        {/* Compelling Headline */}
        <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-stone-200 font-normal mb-6 max-w-3xl mx-auto leading-tight [text-wrap:balance]">
          “A Taste Worth Remembering”
        </p>

        {/* Refined Description */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-stone-300 font-normal leading-relaxed mb-8 [text-wrap:balance]">
          Nestled at the threshold of Sivok Hill Forest, CHAASUM serves handcrafted juicy Himalayan momos,
          slow-simmered Tibetan thukpa, and wholesome feast thalis made with fresh hill ingredients and timeless warmth.
        </p>

        {/* Live Hours & Status Notice (Clean unboxed inline text) */}
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-stone-300 mb-9">
          <Clock className="w-4 h-4 text-[#d4af37]" />
          <span>
            {hoursInfo.isOpen ? (
              <span className="text-emerald-400 font-medium">Open Today</span>
            ) : (
              <span className="text-amber-400 font-medium">Opens at 10:30 AM</span>
            )}
          </span>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <span>Closes at {hoursInfo.closingTime}</span>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <span>Dine-In, Drive-Through & Delivery</span>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            type="button"
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e4be49] active:scale-[0.98] rounded-md transition-all duration-200 shadow-xl shadow-[#d4af37]/25 cursor-pointer whitespace-nowrap shrink-0"
          >
            Explore Menu
          </button>
          <button
            type="button"
            onClick={onOpenReservation}
            className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-stone-200 hover:text-white bg-black/40 hover:bg-black/60 border border-[#d4af37]/40 hover:border-[#d4af37] rounded-md backdrop-blur-sm transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0"
          >
            Reserve a Table
          </button>
        </div>
      </div>

      {/* Subtle Animated Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none">
        <span className="text-[11px] uppercase tracking-widest text-stone-400 font-medium mb-1.5 opacity-80">
          Scroll to explore
        </span>
        <div className="w-5 h-8 border border-stone-500/60 rounded-full flex justify-center p-1">
          <div className="w-1.5 h-2 bg-[#d4af37] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Sparkles, HeartHandshake, Flame, Mountain } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="story" className="py-24 sm:py-32 relative overflow-hidden bg-[#0a120f]">
      {/* Subtle organic background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#163328]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Story Narrative Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-widest text-[#d4af37] flex items-center gap-2">
                <span>Our Heritage</span>
                <span aria-hidden="true" className="text-stone-600">·</span>
                <span className="font-hindi text-sm text-[#e7c87c]">हमारी कहानी</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight [text-wrap:balance]">
                Where Forest Mist Meets Mountain Hearth
              </h2>
            </div>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed [text-wrap:balance]">
              Located in the scenic foothill corridor of <strong className="text-white font-medium">Sevoke Bazar</strong>, right on the threshold of the Sivok Hill Forest reserve in West Bengal, <span className="text-[#d4af37] font-semibold">CHAASUM</span> was born from a deep love for Asian and Himalayan culinary traditions.
            </p>

            <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
              Whether you are pausing on your road journey to Darjeeling, Kalimpong, or Gangtok, or gathering with loved ones for an evening dinner, Chaasum offers a warm sanctuary. Inside, timber accents and panoramic windows open out to mist-laden pine hills, while our kitchen prepares time-honored dishes: delicate dumplings folded by hand, mountain thukpa simmered for twelve hours, and comforting thali platters.
            </p>

            {/* 3 Pillars of Chaasum */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-5 border-t border-stone-800">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#d4af37]">
                  <Flame className="w-4 h-4" />
                  <span className="font-serif text-base font-semibold text-white">Handcrafted</span>
                </div>
                <p className="text-xs text-stone-400 leading-normal">
                  Fresh dough kneaded daily and hand-pleated with balanced fillings.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#d4af37]">
                  <Mountain className="w-4 h-4" />
                  <span className="font-serif text-base font-semibold text-white">Hill Ingredients</span>
                </div>
                <p className="text-xs text-stone-400 leading-normal">
                  Local mountain spices, fresh garden greens, and authentic chili pastes.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#d4af37]">
                  <HeartHandshake className="w-4 h-4" />
                  <span className="font-serif text-base font-semibold text-white">Hill Hospitality</span>
                </div>
                <p className="text-xs text-stone-400 leading-normal">
                  Warm, attentive service that turns weary highway travelers into regulars.
                </p>
              </div>
            </div>
          </div>

          {/* Visual Showcase Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#c8a257]/25 shadow-2xl shadow-black/80 group">
              <img
                src="/images/ambiance.jpg"
                alt="Cozy dining interior of Chaasum Restaurant overlooking Sivok Hill Forest with ambient lanterns"
                className="w-full h-[420px] sm:h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="lazy"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.indexOf('/images/ambiance.jpg') !== -1) {
                    target.src = '/src/assets/images/chaasum_ambiance_forest_1794131817267.jpg';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <p className="font-serif text-lg font-semibold text-white">Sevoke Forest Panorama</p>
                  <p className="text-xs text-stone-300">Dine amidst natural timber and misty Himalayan views</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider block">Timing</span>
                  <span className="text-xs text-stone-300 tabular-nums">Open till 11:30 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

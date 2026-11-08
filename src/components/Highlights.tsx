import React from 'react';
import { Star, IndianRupee, Car, Utensils, Compass } from 'lucide-react';

export const Highlights: React.FC = () => {
  return (
    <section className="relative z-20 -mt-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#121c17] border border-[#c8a257]/20 rounded-xl shadow-2xl shadow-black/60 p-6 sm:p-8 backdrop-blur-md">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-stone-800/80">
          {/* Highlight 1: Google Rating */}
          <div className="flex flex-col items-center text-center pt-4 first:pt-0 lg:pt-0 lg:px-4">
            <div className="flex items-center gap-1.5 mb-1 text-[#d4af37]">
              <span className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white tabular-nums">
                4.2
              </span>
              <div className="flex text-[#d4af37]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < 4
                        ? 'fill-[#d4af37]'
                        : i === 4
                        ? 'fill-[#d4af37]/40 text-[#d4af37]'
                        : 'text-stone-600'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs uppercase tracking-wider text-stone-400 font-medium">
              Google Rating
            </p>
            <p className="text-xs text-stone-500 mt-0.5 tabular-nums">
              2,091 verified reviews
            </p>
          </div>

          {/* Highlight 2: Price Bracket */}
          <div className="flex flex-col items-center text-center pt-4 lg:pt-0 lg:px-4">
            <div className="flex items-center text-[#d4af37] mb-1">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-white tabular-nums">
                ₹200 – ₹400
              </span>
            </div>
            <p className="text-xs uppercase tracking-wider text-stone-400 font-medium">
              Average Price
            </p>
            <p className="text-xs text-stone-500 mt-0.5">
              Generous Himalayan portions
            </p>
          </div>

          {/* Highlight 3: Dining Services */}
          <div className="flex flex-col items-center text-center pt-4 lg:pt-0 lg:px-4">
            <div className="flex items-center gap-2 mb-1 text-[#d4af37]">
              <Utensils className="w-5 h-5 text-[#d4af37]" />
              <Car className="w-5 h-5 text-[#d4af37]" />
            </div>
            <p className="text-xs uppercase tracking-wider text-stone-400 font-medium">
              Flexible Services
            </p>
            <p className="text-xs text-stone-300 mt-0.5 font-medium">
              Dine-In · Drive-Through · Delivery
            </p>
          </div>

          {/* Highlight 4: Hill Forest Destination */}
          <div className="flex flex-col items-center text-center pt-4 lg:pt-0 lg:px-4">
            <div className="flex items-center gap-1.5 mb-1 text-[#d4af37]">
              <Compass className="w-5 h-5 text-[#d4af37]" />
              <span className="font-serif text-2xl font-bold text-white">Sevoke Hills</span>
            </div>
            <p className="text-xs uppercase tracking-wider text-stone-400 font-medium">
              Gateway to Darjeeling
            </p>
            <p className="text-xs text-stone-500 mt-0.5">
              Sivok Hill Forest, West Bengal
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

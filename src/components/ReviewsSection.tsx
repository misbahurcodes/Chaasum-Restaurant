import React from 'react';
import { REVIEWS_DATA } from '../data/reviewsData';
import { Star, ExternalLink, Quote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-24 bg-[#0c1612] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#d4af37] mb-2">
              <span>Guest Experiences</span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span className="font-hindi text-sm text-[#e7c87c]">समीक्षाएं</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Loved by 2,090+ Travelers
            </h2>
            <p className="mt-2 text-stone-400 text-sm sm:text-base max-w-xl">
              Authentic feedback from highway travelers, local residents, and visitors exploring the Sevoke and Darjeeling foothills.
            </p>
          </div>

          {/* External Google Reviews Anchor */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="flex items-center justify-end gap-1 text-[#d4af37]">
                <span className="font-serif text-2xl font-bold text-white tabular-nums">4.2</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < 4 ? 'fill-[#d4af37]' : i === 4 ? 'fill-[#d4af37]/50 text-[#d4af37]' : 'text-stone-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-stone-400">Based on 2,091 Google Reviews</p>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=CHAASUM+RESTAURANT+Sevoke+Bazar+West+Bengal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e4be49] rounded-md transition-all shadow-md cursor-pointer whitespace-nowrap"
            >
              <span>View Google Reviews</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#121c17] rounded-xl p-6 sm:p-7 border border-stone-800/80 hover:border-[#c8a257]/30 transition-all duration-300 flex flex-col justify-between relative group hover:shadow-xl hover:shadow-black/50"
            >
              <div>
                {/* Header of review: Rating & Time */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#d4af37]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating ? 'fill-[#d4af37]' : 'text-stone-700'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-stone-500">{rev.timeAgo}</span>
                </div>

                <Quote className="w-6 h-6 text-[#d4af37]/30 mb-2" />

                <p className="text-stone-300 text-sm leading-relaxed italic mb-6">
                  “{rev.excerpt}”
                </p>
              </div>

              {/* Author & Verified Tag */}
              <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-semibold text-white">{rev.author}</h4>
                  <p className="text-stone-500 mt-0.5">{rev.verifiedVisit}</p>
                </div>
                <span className="text-[#d4af37] text-[11px] font-medium tracking-wide">
                  {rev.source}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

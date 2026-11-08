import React, { useState, useEffect } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'food' | 'ambiance' | 'tea';
  image: string;
  aspect: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Himalayan Steamed Momos',
    subtitle: 'Freshly pleated with mountain herbs & fiery chili chutney',
    category: 'food',
    image: '/images/momos.jpg',
    aspect: 'col-span-1 md:col-span-2 row-span-2',
  },
  {
    id: 'gal-2',
    title: 'Sivok Hill Forest Ambiance',
    subtitle: 'Panoramic glass dining overlooking misty hill slopes',
    category: 'ambiance',
    image: '/images/ambiance.jpg',
    aspect: 'col-span-1 md:col-span-2 row-span-1',
  },
  {
    id: 'gal-3',
    title: 'Authentic Tibetan Thukpa',
    subtitle: 'Golden slow-cooked broth with hand-cut noodles and chicken',
    category: 'food',
    image: '/images/thukpa.jpg',
    aspect: 'col-span-1 row-span-1',
  },
  {
    id: 'gal-4',
    title: 'Traditional Himalayan Thali',
    subtitle: 'Bronze platter complete feast with aromatic curries',
    category: 'food',
    image: '/images/thali.jpg',
    aspect: 'col-span-1 row-span-1',
  },
  {
    id: 'gal-5',
    title: 'Warm Hearth & Forest Window',
    subtitle: 'Steaming bamboo baskets and oil lamps by the mountain window',
    category: 'ambiance',
    image: '/images/hero.jpg',
    aspect: 'col-span-1 md:col-span-2 row-span-1',
  },
];

export const GallerySection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'food' | 'ambiance'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => filter === 'all' || item.category === filter
  );

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % filteredItems.length : 0
        );
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  return (
    <section id="gallery" className="py-24 bg-[#0a120f] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#d4af37] mb-2">
              <span>Atmosphere & Dishes</span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span className="font-hindi text-sm text-[#e7c87c]">फोटो गैलरी</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Life at CHAASUM
            </h2>
          </div>

          {/* Clean Segmented Filter Controls */}
          <div className="flex items-center gap-1.5 p-1 bg-[#121c17] rounded-xl border border-stone-800 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#d4af37] text-black font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              All Moments
            </button>
            <button
              type="button"
              onClick={() => setFilter('food')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filter === 'food'
                  ? 'bg-[#d4af37] text-black font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Dishes & Momos
            </button>
            <button
              type="button"
              onClick={() => setFilter('ambiance')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filter === 'ambiance'
                  ? 'bg-[#d4af37] text-black font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Forest Ambiance
            </button>
          </div>
        </div>

        {/* Dynamic Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 auto-rows-[240px]">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className={`relative rounded-xl overflow-hidden group cursor-pointer border border-stone-800/80 hover:border-[#c8a257]/50 transition-all duration-300 ${item.aspect}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-[#d4af37] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-300 line-clamp-1 mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-black/60 text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-8 animate-fadeIn">
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-stone-900/80 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors z-50 cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            type="button"
            onClick={() =>
              setLightboxIndex((prev) =>
                prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0
              )
            }
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/80 text-white hover:bg-[#d4af37] hover:text-black transition-colors z-50 cursor-pointer"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Current Image Container */}
          <div className="max-w-5xl max-h-[85vh] flex flex-col items-center">
            <img
              src={filteredItems[lightboxIndex].image}
              alt={filteredItems[lightboxIndex].title}
              className="max-h-[72vh] w-auto max-w-full rounded-xl object-contain shadow-2xl border border-stone-800"
              referrerPolicy="no-referrer"
            />
            <div className="mt-4 text-center">
              <h4 className="font-serif text-2xl font-bold text-white">
                {filteredItems[lightboxIndex].title}
              </h4>
              <p className="text-sm text-stone-400 mt-1">
                {filteredItems[lightboxIndex].subtitle}
              </p>
              <span className="text-xs text-[#d4af37] mt-1.5 block tabular-nums">
                {lightboxIndex + 1} of {filteredItems.length}
              </span>
            </div>
          </div>

          {/* Next button */}
          <button
            type="button"
            onClick={() =>
              setLightboxIndex((prev) =>
                prev !== null ? (prev + 1) % filteredItems.length : 0
              )
            }
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/80 text-white hover:bg-[#d4af37] hover:text-black transition-colors z-50 cursor-pointer"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
};

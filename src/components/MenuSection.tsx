import React, { useState } from 'react';
import { MENU_ITEMS } from '../data/menuData';
import { MenuCategory, DietType, MenuItem } from '../types/restaurant';
import { Flame, Info, Check, Eye } from 'lucide-react';

interface MenuSectionProps {
  onSelectDishForReservation: (dishName: string) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectDishForReservation }) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [activeDiet, setActiveDiet] = useState<DietType>('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const categories: { label: string; value: MenuCategory }[] = [
    { label: 'All Dishes', value: 'all' },
    { label: 'Momos', value: 'momos' },
    { label: 'Tibetan & Asian', value: 'tibetan-asian' },
    { label: 'Main Course', value: 'main-course' },
    { label: 'Snacks', value: 'snacks' },
    { label: 'Desserts & Drinks', value: 'desserts-beverages' },
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesDiet = activeDiet === 'all' || item.diet === activeDiet;
    return matchesCategory && matchesDiet;
  });

  return (
    <section id="menu" className="py-24 bg-[#0c1612] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#163328]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#d4af37] mb-2">
            <span>Culinary Offerings</span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span className="font-hindi text-sm text-[#e7c87c]">हमारा मेनू</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            The Signature Menu
          </h2>
          <p className="mt-3 text-stone-400 text-sm sm:text-base leading-relaxed [text-wrap:balance]">
            Every dish is made to order using Himalayan spices, fresh mountain dough, and slow cooking methods. Average price is ₹200–₹400 per person.
          </p>

          {/* Interactive Category Tabs (Functional Segmented Control) */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-[#121c17] rounded-xl border border-stone-800/80 max-w-2xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setActiveCategory(cat.value)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.value
                    ? 'bg-[#d4af37] text-black shadow-md font-semibold'
                    : 'text-stone-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Dietary Filter Segmented Switch */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs">
            <span className="text-stone-500 font-medium">Dietary preference:</span>
            <div className="inline-flex p-1 bg-[#14201a] rounded-lg border border-stone-800">
              <button
                type="button"
                onClick={() => setActiveDiet('all')}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  activeDiet === 'all'
                    ? 'bg-stone-800 text-white font-medium'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setActiveDiet('veg')}
                className={`px-2.5 py-1 rounded text-xs flex items-center gap-1 transition-colors cursor-pointer ${
                  activeDiet === 'veg'
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 font-medium'
                    : 'text-emerald-400/80 hover:text-emerald-300'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Pure Veg
              </button>
              <button
                type="button"
                onClick={() => setActiveDiet('non-veg')}
                className={`px-2.5 py-1 rounded text-xs flex items-center gap-1 transition-colors cursor-pointer ${
                  activeDiet === 'non-veg'
                    ? 'bg-amber-950/80 text-amber-300 border border-amber-700/50 font-medium'
                    : 'text-amber-400/80 hover:text-amber-300'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                Non-Veg
              </button>
            </div>
          </div>
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-[#121c17] rounded-xl overflow-hidden border border-stone-800/80 hover:border-[#c8a257]/40 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-black/60"
            >
              {/* Image Frame */}
              <div className="relative h-52 sm:h-56 overflow-hidden bg-stone-900">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.indexOf('/images/hero.jpg') === -1) {
                      target.src = '/images/hero.jpg';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121c17] via-transparent to-black/30 pointer-events-none" />

                {/* Dietary badge & Signature text (Clean unboxed tags) */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2 py-1 rounded border border-white/10 text-xs text-stone-200">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        item.diet === 'veg' ? 'bg-emerald-400 ring-2 ring-emerald-900' : 'bg-rose-500 ring-2 ring-rose-950'
                      }`}
                    />
                    <span className="capitalize">{item.diet === 'veg' ? 'Veg' : 'Non-Veg'}</span>
                  </div>

                  {item.isSignature && (
                    <span className="text-[11px] font-semibold text-[#d4af37] bg-black/70 backdrop-blur-sm px-2 py-1 rounded border border-[#d4af37]/30 tracking-wide">
                      Chef’s Signature
                    </span>
                  )}
                </div>

                {/* Quick View Button */}
                <button
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/70 backdrop-blur-sm text-stone-300 hover:text-white hover:bg-black/90 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                  title="View Ingredients & Details"
                  aria-label={`View details of ${item.name}`}
                >
                  <Eye className="w-4 h-4 text-[#d4af37]" />
                </button>
              </div>

              {/* Card Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#d4af37] transition-colors">
                        {item.name}
                      </h3>
                      {item.hindiName && (
                        <p className="font-hindi text-xs text-[#d4af37]/90 font-normal">
                          {item.hindiName}
                        </p>
                      )}
                    </div>
                    <span className="font-serif text-lg font-bold text-[#d4af37] tabular-nums whitespace-nowrap">
                      ₹{item.price}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-400 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Card Footer with reservation intent */}
                <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-stone-500">
                    {item.spicyLevel && item.spicyLevel > 1 && (
                      <span className="flex items-center gap-0.5 text-amber-500" title="Spicy">
                        <Flame className="w-3.5 h-3.5 fill-amber-500" />
                        <span className="text-[10px] uppercase font-medium">Spiced</span>
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectDishForReservation(item.name)}
                    className="text-stone-300 hover:text-[#d4af37] font-medium transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    Reserve with this dish →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 text-stone-400">
            <p className="text-base">No dishes match the selected dietary filter in this category.</p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setActiveDiet('all');
              }}
              className="mt-3 text-xs text-[#d4af37] underline"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* Item Quick View Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#121c17] border border-[#c8a257]/30 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl animate-fadeIn">
            <div className="relative h-60 bg-stone-900">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.indexOf('/images/hero.jpg') === -1) {
                    target.src = '/images/hero.jpg';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121c17] to-transparent" />
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-white hover:bg-black transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">{selectedItem.name}</h3>
                  {selectedItem.hindiName && (
                    <p className="font-hindi text-sm text-[#d4af37]">{selectedItem.hindiName}</p>
                  )}
                </div>
                <span className="font-serif text-2xl font-bold text-[#d4af37] tabular-nums">
                  ₹{selectedItem.price}
                </span>
              </div>
              <p className="text-sm text-stone-300 leading-relaxed">{selectedItem.description}</p>
              <div className="py-2 border-y border-stone-800 text-xs text-stone-400 space-y-1">
                <p>• Handcrafted fresh to order at Chaasum Sevoke</p>
                <p>• Available for Dine-In, Drive-Through, and local Delivery</p>
                <p>• Verified pricing: ₹{selectedItem.price} (Inclusive of all taxes)</p>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const dish = selectedItem.name;
                    setSelectedItem(null);
                    onSelectDishForReservation(dish);
                  }}
                  className="flex-1 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e4be49] rounded-md transition-colors"
                >
                  Reserve Table with this Dish
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2.5 text-xs text-stone-300 hover:text-white bg-stone-800/80 rounded-md transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

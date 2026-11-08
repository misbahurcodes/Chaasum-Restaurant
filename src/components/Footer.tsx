import React from 'react';
import { MapPin, Phone, Clock, ShieldCheck, Lock, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenSecurityAudit: () => void;
  onOpenAdminPortal: () => void;
  onOpenReservation: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSecurityAudit,
  onOpenAdminPortal,
  onOpenReservation,
}) => {
  return (
    <footer className="bg-[#080d0b] border-t border-stone-800 text-stone-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-baseline gap-2.5">
              <span className="font-serif text-2xl font-bold tracking-wider uppercase text-white">
                CHAASUM
              </span>
              <span className="font-hindi text-xl text-[#d4af37] font-normal">
                चासुम
              </span>
            </div>

            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              Authentic Asian & Himalayan restaurant nestled in the scenic Sivok Hill Forest. Handcrafted momos, slow-simmered thukpa, and wholesome feast thalis along the gateway to Darjeeling.
            </p>

            <div className="pt-2 text-stone-500 space-y-1">
              <p>Rating: 4.2★ on Google (2,091 reviews)</p>
              <p>Price: ₹200–₹400 per person</p>
              <p>Services: Dine-in, Drive-through, Delivery</p>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-[#d4af37] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-[#d4af37] transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#d4af37] transition-colors">
                  Signature Menu
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#d4af37] transition-colors">
                  Photo Gallery
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#d4af37] transition-colors">
                  Guest Reviews
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#d4af37] transition-colors">
                  Contact & Map
                </a>
              </li>
            </ul>
          </div>

          {/* Verified Contact Details */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Visit & Timings
            </h4>
            <div className="space-y-2.5 leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>
                  VFHC+C82, Sevoke Bazar,<br />
                  Sivok Hill Forest, WB 734008
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <a href="tel:09907255613" className="hover:text-white tabular-nums">
                  099072 55613
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>
                  Daily: 10:30 AM – 11:30 PM<br />
                  <span className="text-emerald-400">Closes at 11:30 PM</span>
                </span>
              </div>
            </div>
          </div>

          {/* Actions & Staff Tools */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Reservations & Tools
            </h4>
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={onOpenReservation}
                className="w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e4be49] rounded-md transition-colors cursor-pointer"
              >
                Book a Table
              </button>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=26.8837,88.4682&destination_place_id=CHAASUM+RESTAURANT"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 flex items-center justify-center gap-1.5 text-stone-300 hover:text-white bg-stone-900 border border-stone-800 rounded-md transition-colors"
              >
                <span>Google Maps Route</span>
                <ExternalLink className="w-3 h-3 text-[#d4af37]" />
              </a>

              <div className="pt-2 flex flex-col gap-1.5 text-[11px]">
                <button
                  type="button"
                  onClick={onOpenAdminPortal}
                  className="flex items-center gap-1.5 text-stone-400 hover:text-[#d4af37] transition-colors cursor-pointer text-left"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Staff Portal (Manager Access)</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenSecurityAudit}
                  className="flex items-center gap-1.5 text-stone-400 hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Security & Hardening Audit</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500">
          <p>© {new Date().getFullYear()} CHAASUM RESTAURANT (चासुम). All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Sevoke Bazar, West Bengal</span>
            <span aria-hidden="true">·</span>
            <span>LocalBusiness Verified</span>
            <span aria-hidden="true">·</span>
            <span>Production Hardened</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

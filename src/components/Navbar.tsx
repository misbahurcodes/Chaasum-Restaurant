import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, UtensilsCrossed, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenReservation: () => void;
  onOpenSecurityAudit: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReservation, onOpenSecurityAudit }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Our Story', href: '#story' },
    { label: 'Menu', href: '#menu' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0a120f]/95 backdrop-blur-md py-3.5 border-b border-[#c8a257]/15 shadow-xl shadow-black/40'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Brand title, one line, wordmark in display face */}
            <a
              href="#home"
              className="group flex items-baseline gap-2.5 text-slate-100 hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0"
            >
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider uppercase text-white">
                CHAASUM
              </span>
              <span className="font-hindi text-lg sm:text-xl text-[#d4af37] font-normal tracking-wide">
                चासुम
              </span>
            </a>

            {/* Zone 2: 4-5 concise single-line nav links */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-300">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="hover:text-[#d4af37] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#d4af37] hover:after:w-full after:transition-all after:duration-300 whitespace-nowrap shrink-0"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Zone 3: 1 primary action */}
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="tel:09907255613"
                className="hidden xl:inline-flex items-center gap-1.5 text-xs text-stone-300 hover:text-[#d4af37] transition-colors px-2.5 py-1.5 rounded"
                title="Direct phone line"
              >
                <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                <span className="tabular-nums">099072 55613</span>
              </a>

              <button
                type="button"
                onClick={onOpenReservation}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e4be49] active:scale-[0.98] rounded-md transition-all duration-200 shadow-md shadow-[#d4af37]/20 whitespace-nowrap shrink-0 cursor-pointer"
              >
                Reserve a Table
              </button>

              {/* Mobile menu toggle button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-stone-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] rounded-md"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-lg md:hidden pt-20 px-6 pb-8 flex flex-col justify-between animate-fadeIn">
          <div className="space-y-4 pt-4">
            <div className="pb-3 border-b border-stone-800 flex items-center justify-between">
              <div>
                <p className="font-serif text-xl font-bold text-white tracking-wide">CHAASUM RESTAURANT</p>
                <p className="font-hindi text-[#d4af37] text-sm">चासुम · सेवोक बाज़ार</p>
              </div>
              <span className="text-xs text-stone-400">Sevoke, WB</span>
            </div>

            <nav className="flex flex-col space-y-3 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-lg font-medium text-stone-200 hover:text-[#d4af37] transition-colors py-2 border-b border-stone-900"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-3 pt-6 border-t border-stone-800">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-3 text-center text-sm font-semibold uppercase tracking-wider text-black bg-[#d4af37] rounded-md shadow-lg"
            >
              Reserve a Table
            </button>

            <a
              href="tel:09907255613"
              className="w-full py-3 flex items-center justify-center gap-2 text-sm font-medium text-stone-200 bg-stone-900/90 rounded-md border border-stone-800"
            >
              <Phone className="w-4 h-4 text-[#d4af37]" />
              Call 099072 55613
            </a>

            <div className="flex items-center justify-between text-xs text-stone-400 pt-2">
              <span>Closes at 11:30 PM</span>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSecurityAudit();
                }}
                className="flex items-center gap-1 text-[#d4af37] hover:underline"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Security Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

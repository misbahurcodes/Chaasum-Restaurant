import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Highlights } from './components/Highlights';
import { About } from './components/About';
import { MenuSection } from './components/MenuSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { ReservationSection } from './components/ReservationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminPortal } from './components/AdminPortal';
import { SecurityAuditModal } from './components/SecurityAuditModal';
import { CalendarCheck, Phone } from 'lucide-react';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSecurityAuditOpen, setIsSecurityAuditOpen] = useState(false);
  const [preselectedDish, setPreselectedDish] = useState<string | undefined>(undefined);

  const scrollToReservation = () => {
    const el = document.getElementById('reservation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectDishForReservation = (dishName: string) => {
    setPreselectedDish(dishName);
    scrollToReservation();
  };

  return (
    <div className="min-h-screen bg-[#0c1411] text-[#ede9e1] flex flex-col font-sans selection:bg-[#d4af37]/30 selection:text-white relative">
      {/* Top Navbar */}
      <Navbar
        onOpenReservation={scrollToReservation}
        onOpenSecurityAudit={() => setIsSecurityAuditOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Cinematic Hero */}
        <Hero
          onExploreMenu={scrollToMenu}
          onOpenReservation={scrollToReservation}
        />

        {/* Highlights Bar */}
        <Highlights />

        {/* About / Our Story */}
        <About />

        {/* Signature Menu */}
        <MenuSection
          onSelectDishForReservation={handleSelectDishForReservation}
        />

        {/* Interactive Lightbox Gallery */}
        <GallerySection />

        {/* Customer Reviews */}
        <ReviewsSection />

        {/* Table Reservation Engine */}
        <ReservationSection
          preselectedDish={preselectedDish}
          onClearPreselectedDish={() => setPreselectedDish(undefined)}
        />

        {/* Contact & Map */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenSecurityAudit={() => setIsSecurityAuditOpen(true)}
        onOpenAdminPortal={() => setIsAdminOpen(true)}
        onOpenReservation={scrollToReservation}
      />

      {/* Modals */}
      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      <SecurityAuditModal
        isOpen={isSecurityAuditOpen}
        onClose={() => setIsSecurityAuditOpen(false)}
      />

      {/* Mobile Floating Quick Reservation CTA (conforms to <15% height rule) */}
      <div className="fixed bottom-4 left-4 right-4 z-30 sm:hidden flex gap-2">
        <button
          type="button"
          onClick={scrollToReservation}
          className="flex-1 py-3 px-4 bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-wider rounded-lg shadow-xl flex items-center justify-center gap-2 active:scale-98"
        >
          <CalendarCheck className="w-4 h-4" />
          <span>Reserve Table</span>
        </button>

        <a
          href="tel:09907255613"
          className="p-3 bg-stone-900 border border-stone-800 text-stone-200 rounded-lg shadow-xl flex items-center justify-center"
          aria-label="Call Restaurant"
        >
          <Phone className="w-4 h-4 text-[#d4af37]" />
        </a>
      </div>
    </div>
  );
}

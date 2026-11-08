import React, { useState } from 'react';
import { MapPin, Phone, Clock, Send, CheckCircle2, AlertCircle, Navigation, Car } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Dining Inquiry',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to send message.');
      }

      setSuccessMsg(data.message || 'Message sent successfully!');
      setFormState({
        name: '',
        email: '',
        phone: '',
        subject: 'Dining Inquiry',
        message: '',
      });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Could not send message.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0c1612] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#d4af37] mb-2">
            <span>Find & Reach Us</span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span className="font-hindi text-sm text-[#e7c87c]">संपर्क एवं स्थान</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Visit CHAASUM in Sevoke
          </h2>
          <p className="mt-2 text-stone-400 text-sm sm:text-base">
            Conveniently located in Sevoke Bazar along the scenic highway through Sivok Hill Forest, West Bengal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Details & Location Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#121c17] rounded-2xl p-6 sm:p-8 border border-stone-800 space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#0a120f] border border-[#d4af37]/30 rounded-xl text-[#d4af37] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">Restaurant Location</h3>
                  <p className="text-stone-300 text-sm mt-1 leading-relaxed">
                    VFHC+C82, Sevoke Bazar, Sevoke,<br />
                    Sivok Hill Forest, West Bengal 734008
                  </p>
                  <p className="text-xs text-stone-500 mt-1">
                    (Adjacent to Teesta River corridor & Coronation Bridge)
                  </p>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=26.8837,88.4682&destination_place_id=CHAASUM+RESTAURANT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#d4af37] hover:underline"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    Open Google Maps Directions →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-stone-800">
                <div className="p-3 bg-[#0a120f] border border-[#d4af37]/30 rounded-xl text-[#d4af37] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">Direct Phone Contact</h3>
                  <a
                    href="tel:09907255613"
                    className="text-stone-200 hover:text-[#d4af37] text-base font-semibold block mt-1 tabular-nums transition-colors"
                  >
                    099072 55613
                  </a>
                  <p className="text-xs text-stone-500 mt-0.5">
                    For takeout orders, group booking, and road directions
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-stone-800">
                <div className="p-3 bg-[#0a120f] border border-[#d4af37]/30 rounded-xl text-[#d4af37] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">Opening Hours</h3>
                  <p className="text-stone-300 text-sm mt-1">
                    Monday – Sunday: <strong className="text-white">10:30 AM – 11:30 PM</strong>
                  </p>
                  <p className="text-xs text-emerald-400 mt-1 font-medium">
                    Closes at 11:30 PM · Late night kitchen open
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-stone-800">
                <div className="p-3 bg-[#0a120f] border border-[#d4af37]/30 rounded-xl text-[#d4af37] shrink-0">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">Highway Distances</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-stone-400">
                    <div>• Siliguri: ~22 km</div>
                    <div>• Coronation Bridge: ~2 km</div>
                    <div>• Kalimpong: ~46 km</div>
                    <div>• Gangtok: ~92 km</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Secure Contact Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-[#121c17] rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-xl">
              <h3 className="font-serif text-2xl font-bold text-white mb-2">
                Send an Inquiry or Feedback
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 mb-6">
                Planning a large family get-together, corporate tour, or have a special dietary question? Write to us directly.
              </p>

              {successMsg && (
                <div className="mb-6 p-4 bg-emerald-950/60 border border-emerald-800 rounded-lg text-xs text-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              {errorMsg && (
                <div className="mb-6 p-4 bg-rose-950/60 border border-rose-800 rounded-lg text-xs text-rose-200 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium uppercase tracking-wider text-stone-300">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sourav Das"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-[#0a120f] border border-stone-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium uppercase tracking-wider text-stone-300">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sourav@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-[#0a120f] border border-stone-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium uppercase tracking-wider text-stone-300">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="10-digit mobile"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full bg-[#0a120f] border border-stone-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium uppercase tracking-wider text-stone-300">
                      Inquiry Topic
                    </label>
                    <select
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full bg-[#0a120f] border border-stone-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="Dining Inquiry" className="bg-stone-900">Dining & Menu Inquiry</option>
                      <option value="Tour Group Booking" className="bg-stone-900">Tour Group & Bus Stop Catering</option>
                      <option value="Drive-Through / Takeout" className="bg-stone-900">Drive-Through / Takeout</option>
                      <option value="Guest Feedback" className="bg-stone-900">Guest Feedback</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium uppercase tracking-wider text-stone-300">
                    Message Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your requirements or questions..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-[#0a120f] border border-stone-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-3 text-xs font-semibold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e4be49] active:scale-[0.98] rounded-md transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { ConfirmedReservation, ReservationPayload } from '../types/restaurant';
import { Calendar, Users, Clock, ShieldCheck, CheckCircle2, Search, AlertCircle, Phone, Copy, Check } from 'lucide-react';

interface ReservationSectionProps {
  preselectedDish?: string;
  onClearPreselectedDish?: () => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  preselectedDish,
  onClearPreselectedDish,
}) => {
  const [mode, setMode] = useState<'book' | 'lookup'>('book');

  // Form State
  const [formData, setFormData] = useState<ReservationPayload>({
    name: '',
    phone: '',
    email: '',
    guests: 2,
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    seatingArea: 'indoor-forest-view',
    specialRequests: preselectedDish ? `Pre-order request: ${preselectedDish}` : '',
  });

  // UI States
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedReservation | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Lookup state
  const [lookupCode, setLookupCode] = useState('');
  const [lookupPhone, setLookupPhone] = useState('');
  const [lookupResult, setLookupResult] = useState<ConfirmedReservation | null>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [lookupLoading, setLookupLoading] = useState(false);

  // Time slots within operating hours (10:30 AM to 10:30 PM)
  const timeSlots = [
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '16:00', '17:00', '18:00', '18:30', '19:00', '19:30', '20:00',
    '20:30', '21:00', '21:30', '22:00', '22:30'
  ];

  const todayStr = new Date().toISOString().split('T')[0];
  const maxDateStr = new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setLoading(true);

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to complete reservation.');
      }

      setConfirmedBooking(data.reservation);
      if (onClearPreselectedDish) onClearPreselectedDish();
    } catch (err) {
      setServerError(
        err instanceof Error
          ? err.message
          : 'Unable to connect to reservation server. Please call us directly at 099072 55613.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError(null);
    setLookupResult(null);
    setLookupLoading(true);

    try {
      const res = await fetch('/api/reservations/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: lookupCode, phone: lookupPhone }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Booking not found. Please verify details.');
      }

      setLookupResult(data.reservation);
    } catch (err) {
      setLookupError(err instanceof Error ? err.message : 'Lookup failed.');
    } finally {
      setLookupLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="reservation" className="py-24 bg-[#0a120f] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#163328]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#d4af37] mb-2">
            <span>Online Booking</span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span className="font-hindi text-sm text-[#e7c87c]">टेबल बुकिंग</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Reserve Your Table
          </h2>
          <p className="mt-2 text-stone-400 text-sm sm:text-base max-w-lg mx-auto">
            Book in advance to secure window tables with Sivok Hill Forest views. Instant server confirmation.
          </p>

          {/* Toggle between Booking & Lookup */}
          <div className="mt-6 inline-flex p-1 bg-[#121c17] rounded-lg border border-stone-800">
            <button
              type="button"
              onClick={() => setMode('book')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                mode === 'book'
                  ? 'bg-[#d4af37] text-black shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              New Reservation
            </button>
            <button
              type="button"
              onClick={() => setMode('lookup')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                mode === 'lookup'
                  ? 'bg-[#d4af37] text-black shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Find Existing Booking
            </button>
          </div>
        </div>

        {/* MODE 1: BOOKING FORM */}
        {mode === 'book' && (
          <div className="bg-[#121c17] rounded-2xl border border-[#c8a257]/30 shadow-2xl p-6 sm:p-10 backdrop-blur-md">
            {confirmedBooking ? (
              <div className="text-center py-6 space-y-6 animate-fadeIn">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                    Server Verified Booking
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-white">
                    Reservation Confirmed!
                  </h3>
                  <p className="text-sm text-stone-300 max-w-md mx-auto">
                    We look forward to welcoming you, <strong className="text-white">{confirmedBooking.name}</strong>, to Chaasum Restaurant in Sevoke.
                  </p>
                </div>

                {/* Booking Pass Card */}
                <div className="max-w-md mx-auto bg-[#0a120f] border border-stone-800 rounded-xl p-5 text-left space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-stone-500 block">
                        Booking Reference
                      </span>
                      <span className="font-mono text-xl font-bold text-[#d4af37] tracking-wider">
                        {confirmedBooking.code}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(confirmedBooking.code)}
                      className="flex items-center gap-1 text-xs text-stone-400 hover:text-white bg-stone-900 px-2.5 py-1.5 rounded border border-stone-800 cursor-pointer"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-stone-500 block">Date</span>
                      <span className="text-stone-200 font-medium tabular-nums">{confirmedBooking.date}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Time Slot</span>
                      <span className="text-stone-200 font-medium tabular-nums">{confirmedBooking.time}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Party Size</span>
                      <span className="text-stone-200 font-medium tabular-nums">{confirmedBooking.guests} Guests</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Seating Area</span>
                      <span className="text-stone-200 font-medium capitalize">
                        {confirmedBooking.seatingArea.replace(/-/g, ' ')}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 text-[11px] text-stone-400 border-t border-stone-800">
                    <p>📍 VFHC+C82, Sevoke Bazar, Sevoke, Sivok Hill Forest, WB 734008</p>
                    <p>📞 Assistance: 099072 55613 (Table held for 15 mins)</p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setConfirmedBooking(null);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        guests: 2,
                        date: todayStr,
                        time: '19:00',
                        seatingArea: 'indoor-forest-view',
                        specialRequests: '',
                      });
                    }}
                    className="text-xs text-[#d4af37] hover:underline cursor-pointer"
                  >
                    Make another reservation
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {preselectedDish && (
                  <div className="p-3 bg-[#192b23] border border-[#d4af37]/40 rounded-lg text-xs text-stone-300 flex items-center justify-between">
                    <span>
                      Selected Dish: <strong className="text-white">{preselectedDish}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={onClearPreselectedDish}
                      className="text-[#d4af37] underline text-[11px]"
                    >
                      Clear
                    </button>
                  </div>
                )}

                {serverError && (
                  <div className="p-3.5 bg-rose-950/60 border border-rose-800/80 rounded-lg text-xs text-rose-200 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{serverError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium uppercase tracking-wider text-stone-300">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sen"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#0a120f] border border-stone-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-[#d4af37] transition-colors"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium uppercase tracking-wider text-stone-300">
                      Phone Number (10 Digits) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9830123456"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#0a120f] border border-stone-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-[#d4af37] transition-colors"
                    />
                  </div>

                  {/* Date */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                      Reservation Date *
                    </label>
                    <input
                      type="date"
                      required
                      min={todayStr}
                      max={maxDateStr}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#0a120f] border border-stone-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                    />
                  </div>

                  {/* Time */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                      Time Slot * (Closes 11:30 PM)
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-[#0a120f] border border-stone-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot} className="bg-stone-900 text-white">
                          {slot} {parseInt(slot.split(':')[0], 10) >= 12 ? 'PM' : 'AM'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Guest Count */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#d4af37]" />
                      Party Size *
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value, 10) })}
                      className="w-full bg-[#0a120f] border border-stone-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20].map((num) => (
                        <option key={num} value={num} className="bg-stone-900 text-white">
                          {num} {num === 1 ? 'Guest (Solo)' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Seating Preference */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium uppercase tracking-wider text-stone-300">
                      Seating Preference
                    </label>
                    <select
                      value={formData.seatingArea}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          seatingArea: e.target.value as ReservationPayload['seatingArea'],
                        })
                      }
                      className="w-full bg-[#0a120f] border border-stone-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                    >
                      <option value="indoor-forest-view" className="bg-stone-900 text-white">
                        Indoor Forest View (Panoramic Glass)
                      </option>
                      <option value="terrace" className="bg-stone-900 text-white">
                        Mountain Terrace (Open Air)
                      </option>
                      <option value="private-dining" className="bg-stone-900 text-white">
                        Private Dining (Family & Groups)
                      </option>
                      <option value="standard" className="bg-stone-900 text-white">
                        Main Dining Hall
                      </option>
                    </select>
                  </div>
                </div>

                {/* Email (Optional) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium uppercase tracking-wider text-stone-300">
                    Email Address (Optional for confirmation copy)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. rahul@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#0a120f] border border-stone-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-[#d4af37] transition-colors"
                  />
                </div>

                {/* Special Requests */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium uppercase tracking-wider text-stone-300">
                    Special Requests or Food Preferences
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Celebrating anniversary, baby high chair required, piping hot momos on arrival..."
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    className="w-full bg-[#0a120f] border border-stone-800 rounded-lg px-3.5 py-2 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-[#d4af37] transition-colors resize-none"
                  />
                </div>

                {/* Security Guarantee and Submit Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5 text-xs text-stone-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Real-time server validation & instant confirmation</span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e4be49] active:scale-[0.98] rounded-md transition-all shadow-lg shadow-[#d4af37]/20 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? 'Confirming with Server...' : 'Confirm Reservation'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* MODE 2: LOOKUP EXISTING BOOKING */}
        {mode === 'lookup' && (
          <div className="bg-[#121c17] rounded-2xl border border-stone-800 p-6 sm:p-10">
            <form onSubmit={handleLookup} className="space-y-4 max-w-lg mx-auto">
              <div className="space-y-1.5">
                <label className="text-xs font-medium uppercase tracking-wider text-stone-300">
                  Reservation Code (e.g. CSM-78241)
                </label>
                <input
                  type="text"
                  required
                  placeholder="CSM-XXXXX"
                  value={lookupCode}
                  onChange={(e) => setLookupCode(e.target.value.toUpperCase())}
                  className="w-full bg-[#0a120f] border border-stone-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium uppercase tracking-wider text-stone-300">
                  Registered Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit number"
                  value={lookupPhone}
                  onChange={(e) => setLookupPhone(e.target.value)}
                  className="w-full bg-[#0a120f] border border-stone-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {lookupError && (
                <p className="text-xs text-rose-400 bg-rose-950/40 p-2.5 rounded border border-rose-900">
                  {lookupError}
                </p>
              )}

              <button
                type="submit"
                disabled={lookupLoading}
                className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e4be49] rounded-md transition-colors"
              >
                {lookupLoading ? 'Checking Records...' : 'Verify Status'}
              </button>
            </form>

            {lookupResult && (
              <div className="mt-8 p-5 bg-[#0a120f] border border-[#d4af37]/40 rounded-xl max-w-lg mx-auto space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                  <span className="font-mono text-lg font-bold text-[#d4af37]">{lookupResult.code}</span>
                  <span className="px-2 py-0.5 rounded text-xs uppercase font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
                    {lookupResult.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-stone-300">
                  <div>Guest: <strong className="text-white">{lookupResult.name}</strong></div>
                  <div>Party: <strong className="text-white">{lookupResult.guests} Guests</strong></div>
                  <div>Date: <strong className="text-white tabular-nums">{lookupResult.date}</strong></div>
                  <div>Time: <strong className="text-white tabular-nums">{lookupResult.time}</strong></div>
                </div>
                {lookupResult.specialRequests && (
                  <p className="text-xs text-stone-400 pt-2 border-t border-stone-800">
                    Notes: {lookupResult.specialRequests}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

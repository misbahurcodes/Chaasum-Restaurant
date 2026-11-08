import React, { useState, useEffect } from 'react';
import { X, Lock, CheckCircle2, Clock, Users, RefreshCw, AlertCircle, Phone, LogOut } from 'lucide-react';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'reservations' | 'messages'>('reservations');
  const [adminData, setAdminData] = useState<{
    reservations: any[];
    contactMessages: any[];
    summary: { totalReservations: number; upcomingReservations: number; totalInquiries: number };
  } | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Authentication failed.');
      }

      setToken(data.token);
      setPassword('');
      fetchAdminData(data.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAdminData = async (authToken: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/data', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAdminData(data);
      } else {
        setToken(null);
      }
    } catch {
      setError('Failed to fetch admin data.');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/admin/reservations/${id}/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchAdminData(token);
      }
    } catch {
      // ignore
    }
  };

  const handleLogout = async () => {
    if (token) {
      try {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {
        // ignore
      }
    }
    setToken(null);
    setAdminData(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#121c17] border border-[#c8a257]/30 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#0a120f] border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#d4af37]" />
            <h3 className="font-serif text-lg font-bold text-white">
              CHAASUM Staff Manager Portal
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {!token ? (
            /* Login Form */
            <div className="max-w-md mx-auto py-8 text-center space-y-6">
              <div>
                <h4 className="font-serif text-2xl font-bold text-white">Staff Authentication</h4>
                <p className="text-xs text-stone-400 mt-1">
                  Protected with constant-time token verification and server-side rate limits.
                </p>
                <p className="text-[11px] text-[#d4af37] mt-2 font-mono bg-stone-900/80 p-2 rounded border border-stone-800">
                  Default Manager Password: <strong className="text-white">chaasum@sevoke2026</strong>
                </p>
              </div>

              {error && (
                <div className="p-3 bg-rose-950/60 border border-rose-800 rounded-lg text-xs text-rose-200 flex items-center gap-2 text-left">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-medium tracking-wider text-stone-300">
                    Manager Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#0a120f] border border-stone-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e4be49] rounded-md transition-colors cursor-pointer"
                >
                  {loading ? 'Verifying Credentials...' : 'Sign In as Manager'}
                </button>
              </form>
            </div>
          ) : (
            /* Admin Dashboard */
            <div className="space-y-6">
              {/* Summary Metrics */}
              {adminData && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[#0a120f] p-4 rounded-xl border border-stone-800 text-center">
                    <span className="text-stone-500 text-xs block">Total Bookings</span>
                    <span className="font-serif text-2xl font-bold text-white tabular-nums">
                      {adminData.summary.totalReservations}
                    </span>
                  </div>
                  <div className="bg-[#0a120f] p-4 rounded-xl border border-stone-800 text-center">
                    <span className="text-stone-500 text-xs block">Upcoming Confirmed</span>
                    <span className="font-serif text-2xl font-bold text-emerald-400 tabular-nums">
                      {adminData.summary.upcomingReservations}
                    </span>
                  </div>
                  <div className="bg-[#0a120f] p-4 rounded-xl border border-stone-800 text-center">
                    <span className="text-stone-500 text-xs block">Guest Inquiries</span>
                    <span className="font-serif text-2xl font-bold text-[#d4af37] tabular-nums">
                      {adminData.summary.totalInquiries}
                    </span>
                  </div>
                </div>
              )}

              {/* Navigation Tabs */}
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('reservations')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      activeTab === 'reservations'
                        ? 'bg-[#d4af37] text-black'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    Table Reservations ({adminData?.reservations?.length || 0})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('messages')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      activeTab === 'messages'
                        ? 'bg-[#d4af37] text-black'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    Contact Inquiries ({adminData?.contactMessages?.length || 0})
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => token && fetchAdminData(token)}
                    className="p-1.5 text-stone-400 hover:text-white text-xs flex items-center gap-1 cursor-pointer"
                    title="Refresh data"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="p-1.5 text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>

              {/* Tab 1: Reservations List */}
              {activeTab === 'reservations' && (
                <div className="space-y-3">
                  {adminData?.reservations?.map((r) => (
                    <div
                      key={r.id}
                      className="p-4 bg-[#0a120f] border border-stone-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-[#d4af37]">
                            {r.code}
                          </span>
                          <span className="text-white font-medium text-sm">{r.name}</span>
                          <span className="text-stone-500 text-xs tabular-nums">({r.phone})</span>
                        </div>
                        <div className="text-xs text-stone-400 flex flex-wrap gap-x-3">
                          <span>📅 {r.date}</span>
                          <span>⏰ {r.time}</span>
                          <span>👥 {r.guests} Guests</span>
                          <span className="capitalize">🪑 {r.seatingArea.replace(/-/g, ' ')}</span>
                        </div>
                        {r.specialRequests && (
                          <p className="text-xs text-stone-500 italic mt-1">
                            Note: {r.specialRequests}
                          </p>
                        )}
                      </div>

                      {/* Status select */}
                      <div className="flex items-center gap-2 shrink-0">
                        <select
                          value={r.status}
                          onChange={(e) => updateStatus(r.id, e.target.value)}
                          className="bg-stone-900 border border-stone-700 text-xs rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-[#d4af37]"
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="seated">Seated</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 2: Contact Messages */}
              {activeTab === 'messages' && (
                <div className="space-y-3">
                  {adminData?.contactMessages?.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-4 bg-[#0a120f] border border-stone-800 rounded-xl space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold text-sm">{msg.name}</span>
                          <span className="text-xs text-stone-500">{msg.email}</span>
                          {msg.phone && (
                            <span className="text-xs text-stone-500 tabular-nums">· {msg.phone}</span>
                          )}
                        </div>
                        <span className="text-[11px] text-[#d4af37] bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                          {msg.subject}
                        </span>
                      </div>
                      <p className="text-xs text-stone-300 leading-relaxed bg-[#121c17] p-3 rounded border border-stone-900">
                        {msg.message}
                      </p>
                      <span className="text-[10px] text-stone-600 block tabular-nums">
                        Received: {new Date(msg.createdAt).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  X,
  Shield,
  Check,
  LogOut,
  Lock,
  User,
  Crown,
  AlertTriangle,
  ArrowRight,
  Zap,
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import { UserProfile } from '../types';
import { verifyAndActivateLynk } from '../services/lynkService';

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
}

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'lynk' | 'switch'>('lynk');
  const [lynkInput, setLynkInput] = useState('');
  const [lynkName, setLynkName] = useState('');
  const [lynkError, setLynkError] = useState<string | null>(null);
  const [lynkSuccessMsg, setLynkSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Preset Accounts for instant demo
  const adminAccount: UserProfile = {
    name: 'Admin Om Gio (Owner)',
    email: 'lensx619@gmail.com',
    role: 'admin',
    plan: 'Lifetime Pro',
    activatedVia: 'admin',
  };

  const buyerAccount: UserProfile = {
    name: 'Budi Pembeli (Customer Lynk)',
    email: 'pembeli.kreatif@gmail.com',
    role: 'pembeli',
    plan: 'Lifetime Pro',
    orderId: 'LYNK-882194',
    activatedVia: 'lynk',
  };

  const handleLynkActivation = (e: React.FormEvent) => {
    e.preventDefault();
    setLynkError(null);

    const result = verifyAndActivateLynk(lynkInput);
    if (result.success && result.buyer) {
      setLynkSuccessMsg(result.message);

      setTimeout(() => {
        const isAdmin =
          result.buyer!.email.toLowerCase() === 'lensx619@gmail.com' ||
          result.buyer!.email.toLowerCase() === 'banglakar2@gmail.com';

        const newUser: UserProfile = {
          name: lynkName.trim() || result.buyer!.name,
          email: result.buyer!.email,
          role: isAdmin ? 'admin' : 'pembeli',
          plan: 'Lifetime Pro',
          orderId: result.buyer!.orderId,
          activatedVia: 'lynk',
          activatedAt: new Date().toISOString(),
        };

        onLogin(newUser);
        onClose();
      }, 1000);
    } else {
      setLynkError(result.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-white/[0.08] bg-[#0A0C13] p-5 sm:p-6 shadow-2xl space-y-4 text-slate-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3.5">
          <div className="flex items-center gap-3">
            {/* Google / Lynk Icon */}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-md shrink-0">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.88c2.27-2.09 3.665-5.17 3.665-9.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.09C3.29 21.48 7.35 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.32c-.25-.72-.38-1.49-.38-2.32s.13-1.6.38-2.32V6.59H1.27C.46 8.2.005 10.04.005 12s.455 3.8 1.265 5.41l4.01-3.09z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.29 2.52 1.27 6.59l4.01 3.09c.95-2.83 3.6-4.93 6.72-4.93z"
                />
              </svg>
            </div>

            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>Aktivasi Pembeli Lynk.id &amp; Akun Google</span>
                <span className="text-[10px] font-bold bg-amber-950/60 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40">
                  Otomatis
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Akses otomatis Lifetime Pro setelah pembayaran via Lynk.id
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/[0.06] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Current Active Account Card (if logged in) */}
        {currentUser && (
          <div className="rounded-xl border border-white/[0.08] bg-[#10121D] p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Akun Sedang Masuk
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                  currentUser.role === 'admin'
                    ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                    : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                }`}
              >
                {currentUser.role === 'admin' ? 'Role: ADMIN UTAMA' : 'Role: PEMBELI LYNK (PRO)'}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold text-slate-950 shrink-0 ${
                    currentUser.role === 'admin' ? 'bg-amber-400' : 'bg-emerald-400'
                  }`}
                >
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">{currentUser.name}</div>
                  <div className="text-[11px] text-slate-400 truncate">{currentUser.email}</div>
                  {currentUser.orderId && (
                    <div className="text-[10px] text-amber-400 font-mono">
                      Ref Order: {currentUser.orderId}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={onLogout}
                className="flex items-center gap-1 text-[11px] text-rose-400 hover:text-rose-300 font-semibold p-1.5 rounded-lg hover:bg-rose-950/30 transition-colors"
                title="Keluar / Ganti Akun"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Ganti</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex rounded-xl bg-[#10121D] p-1 border border-white/[0.08] text-xs">
          <button
            onClick={() => setActiveTab('lynk')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'lynk'
                ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-black shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>Aktivasi Pembeli Lynk.id</span>
          </button>
          <button
            onClick={() => setActiveTab('switch')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'switch'
                ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-black shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield className="h-3.5 w-3.5" />
            <span>Pilih Akun Demo (Uji Role)</span>
          </button>
        </div>

        {/* TAB 1: AKTIVASI PEMBELI LYNK.ID OTOMATIS */}
        {activeTab === 'lynk' && (
          <div className="space-y-3.5">
            {/* Explanatory Banner */}
            <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-3.5 text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                <Zap className="h-4 w-4 text-amber-400" />
                <span>Aktivasi Otomatis Setelah Bayar di Lynk.id</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Pembeli cukup memasukkan <strong>alamat Gmail Google</strong> yang dicantumkan saat checkout di Lynk.id (atau masukkan nomor Order ID Lynk). Sistem akan langsung mengaktifkan status <strong>Lifetime Pro</strong> dan menyembunyikan pengaturan API Key.
              </p>
            </div>

            {/* Form Input */}
            <form onSubmit={handleLynkActivation} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-300 uppercase">
                  Akun Gmail Anda (yang digunakan saat bayar di Lynk.id) *
                </label>
                <input
                  type="text"
                  required
                  value={lynkInput}
                  onChange={(e) => setLynkInput(e.target.value)}
                  placeholder="contoh: nama.pembeli@gmail.com atau LYNK-882194"
                  className="w-full rounded-xl border border-white/[0.08] bg-[#10121D] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-300 uppercase">
                  Nama Pembeli (Opsional)
                </label>
                <input
                  type="text"
                  value={lynkName}
                  onChange={(e) => setLynkName(e.target.value)}
                  placeholder="Nama Anda untuk sapaan dashboard"
                  className="w-full rounded-xl border border-white/[0.08] bg-[#10121D] px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Status or Error Notifications */}
              {lynkError && (
                <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0" />
                  <span>{lynkError}</span>
                </div>
              )}

              {lynkSuccessMsg && (
                <div className="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>{lynkSuccessMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 py-3 text-xs font-black text-slate-950 hover:brightness-110 shadow-lg shadow-amber-500/25 active:scale-[0.99] transition-all cursor-pointer"
              >
                + AKTIVASI &amp; MASUK LIFETIME PRO SEKARANG
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: PILIH AKUN DEMO / BERALIH ROLE */}
        {activeTab === 'switch' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-300 font-semibold">
              Klik salah satu akun di bawah untuk menguji perbedaan tampilan:
            </p>

            {/* Option 1: Admin Account */}
            <div
              onClick={() => {
                onLogin(adminAccount);
                onClose();
              }}
              className={`cursor-pointer rounded-xl border p-3.5 transition-all flex items-center justify-between group ${
                currentUser?.email === adminAccount.email
                  ? 'border-amber-500/60 bg-gradient-to-r from-amber-950/30 to-[#121422] shadow-sm shadow-amber-500/15'
                  : 'border-white/[0.08] bg-[#0E101B]/80 hover:border-amber-500/40 hover:bg-[#121424]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 shrink-0">
                  AD
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white group-hover:text-amber-200">
                      {adminAccount.email}
                    </span>
                    <span className="text-[9px] font-bold bg-amber-950/60 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/40">
                      ADMIN
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Pemilik Sistem • Dapat membuka &amp; edit Pengaturan API Key
                  </p>
                </div>
              </div>

              {currentUser?.email === adminAccount.email ? (
                <Check className="h-4 w-4 text-amber-400" />
              ) : (
                <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-amber-400 transition-transform group-hover:translate-x-0.5" />
              )}
            </div>

            {/* Option 2: Buyer Account */}
            <div
              onClick={() => {
                onLogin(buyerAccount);
                onClose();
              }}
              className={`cursor-pointer rounded-xl border p-3.5 transition-all flex items-center justify-between group ${
                currentUser?.email === buyerAccount.email
                  ? 'border-emerald-500/60 bg-gradient-to-r from-emerald-950/30 to-[#121422] shadow-sm shadow-emerald-500/15'
                  : 'border-white/[0.08] bg-[#0E101B]/80 hover:border-emerald-500/40 hover:bg-[#121424]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 shrink-0">
                  PB
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white group-hover:text-emerald-200">
                      {buyerAccount.email}
                    </span>
                    <span className="text-[9px] font-bold bg-emerald-950/60 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-500/40">
                      PEMBELI LYNK
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Customer Pro via Lynk • Pengaturan API Key otomatis disembunyikan
                  </p>
                </div>
              </div>

              {currentUser?.email === buyerAccount.email ? (
                <Check className="h-4 w-4 text-emerald-400" />
              ) : (
                <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-emerald-400 transition-transform group-hover:translate-x-0.5" />
              )}
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="border-t border-white/[0.08] pt-3 text-[10px] text-slate-500 flex items-center gap-1.5 leading-normal">
          <Shield className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <span>
            Sistem Role Lock Otomatis: Pembeli yang masuk melalui Google / Lynk langsung mendapatkan hak akses Lifetime Pro tanpa dapat melihat atau membongkar API Key admin.
          </span>
        </div>
      </div>
    </div>
  );
};

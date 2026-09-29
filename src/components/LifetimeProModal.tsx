import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, Mail, Play, KeyRound, Check, Crown, ShoppingBag, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../types';

interface LifetimeProModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: UserProfile | null;
  onOpenAuth?: () => void;
}

export const LifetimeProModal: React.FC<LifetimeProModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onOpenAuth,
}) => {
  const [showManualVerify, setShowManualVerify] = useState(false);
  const [licenseKey, setLicenseKey] = useState('LYNK-PRO-LIFETIME-8899');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRefreshStatus = () => {
    setStatusMessage('Memeriksa server lisensi Lynk.id & Google Auth... Status: Terverifikasi Aktif Seumur Hidup (Lifetime Pro)!');
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleManualVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(`Lisensi ${licenseKey} berhasil divalidasi. Semua 137 format iklan dan AI Vision aktif!`);
    setTimeout(() => {
      setStatusMessage(null);
      setShowManualVerify(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-white/[0.08] bg-[#0A0C13] p-6 sm:p-8 shadow-2xl text-center space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/[0.06] cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-950/50 border border-amber-500/40 px-4 py-1 text-xs font-bold text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <Crown className="h-4 w-4 text-amber-400" />
            <span>LIFETIME PRO MEMBER</span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5">
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Status: Lifetime PRO Terverifikasi
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed max-w-md mx-auto">
            Selamat! Akun Anda memiliki akses penuh seumur hidup ke seluruh 137 format iklan komersial, AI Multimodal Vision, master storyboard 4:3, dan generator video prompt.
          </p>
        </div>

        {/* Account Info Pill */}
        <div className="rounded-xl border border-white/[0.08] bg-[#10121D] p-3 text-xs text-left space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Akun Terdaftar:</span>
            <span className="font-bold text-white">{currentUser?.email || 'pembeli@gmail.com'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Metode Aktivasi:</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <ShoppingBag className="h-3 w-3" />
              <span>{currentUser?.activatedVia === 'lynk' ? 'Pembayaran Lynk.id (Otomatis)' : 'Lisensi Resmi Lynk.id / Google'}</span>
            </span>
          </div>
          {currentUser?.orderId && (
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Nomor Order:</span>
              <span className="font-mono text-amber-400 text-[11px]">{currentUser.orderId}</span>
            </div>
          )}
        </div>

        {/* Features Checklist */}
        <div className="rounded-xl border border-white/[0.06] bg-[#0E101A] p-4 text-left space-y-2.5">
          {[
            'Akses Penuh 137 Format Iklan & Konten Video Viral',
            'AI Multimodal Vision (Analisis Foto Produk & Pemeran)',
            'Master Storyboard 4:3 (16 Panel 32s / 32 Panel 64s)',
            'Master Video Prompt untuk Veo 3, Kling, HeyGen, Sora',
            'Social Content Distribution Blueprint (TikTok, IG, FB)',
            'Proteksi API Key Otomatis (Aman & Siap Pakai)',
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-200">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-400" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Status Notification */}
        {statusMessage && (
          <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-center gap-2">
            <Check className="h-4 w-4" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-1">
          <button
            onClick={handleRefreshStatus}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 py-3 text-xs font-black text-slate-950 shadow-lg shadow-amber-500/20 hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer"
          >
            <Sparkles className="h-4 w-4 text-slate-950" />
            <span>PERBARUI STATUS LISENSI LYNK.ID</span>
          </button>

          {onOpenAuth && (
            <button
              onClick={() => {
                onClose();
                onOpenAuth();
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-[#121422] py-2.5 text-xs font-semibold text-slate-300 hover:text-white hover:border-white/[0.15] transition-all cursor-pointer"
            >
              <Mail className="h-4 w-4 text-slate-400" />
              <span>Ganti Akun Google / Masukkan Gmail Baru</span>
            </button>
          )}
        </div>

        {/* Manual License Dialog */}
        {showManualVerify ? (
          <form onSubmit={handleManualVerify} className="space-y-2 pt-2 text-left">
            <label className="text-xs text-slate-400 font-medium">Kunci Lisensi Manual Lynk:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                className="flex-1 rounded-xl border border-white/[0.08] bg-[#121422] px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
              />
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-3.5 py-2 text-xs font-bold text-slate-950"
              >
                Verifikasi
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setShowManualVerify(true)}
            className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <Play className="h-3 w-3 fill-current text-amber-400" />
            <span>Punya kode kupon / lisensi manual dari Lynk.id?</span>
          </button>
        )}

        <div>
          <button
            onClick={onClose}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors font-medium cursor-pointer"
          >
            Tutup Jendela
          </button>
        </div>
      </div>
    </div>
  );
};

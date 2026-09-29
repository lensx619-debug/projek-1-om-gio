import React from 'react';
import { Lock, ShieldCheck, Menu, Crown, User, Shield } from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onOpenAdmin: () => void;
  onOpenLifetimePro: () => void;
  onOpenMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onOpenAuth,
  onOpenAdmin,
  onOpenLifetimePro,
  onOpenMobileMenu,
}) => {
  const isAdmin = currentUser?.role === 'admin';

  return (
    <header className="border-b border-white/[0.08] bg-[#08090D]/95 backdrop-blur-2xl px-4 sm:px-6 py-3 sm:py-3.5 transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Left: Mobile Toggle + Title and Subtitle */}
        <div className="flex items-start gap-3">
          {/* Mobile & Tablet Drawer Trigger Button */}
          {onOpenMobileMenu && (
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.1] bg-[#11131c] text-amber-400 hover:text-amber-300 hover:border-amber-500/40 transition-all cursor-pointer shadow-sm active:scale-95"
              aria-label="Buka Menu Workspace"
              title="Buka Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}

          <div className="space-y-1 min-w-0">
            {/* Clean Unboxed Studio Metadata */}
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold tracking-wider text-amber-400/90 uppercase">
              <span className="flex h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
              <span>Studio Cinema Intelligence</span>
              <span className="text-slate-600">·</span>
              <span>V11.1 Executive</span>
              <span className="text-slate-600 hidden sm:inline">·</span>
              <span className="hidden sm:inline text-slate-400">Role Lock Directing</span>
            </div>

            <h1 className="text-lg sm:text-2xl lg:text-3xl font-extrabold tracking-tight flex items-center gap-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-amber-200/90">
                Om Gio Creative Director
              </span>
            </h1>
            <p className="text-[11px] sm:text-xs lg:text-sm text-slate-400 max-w-3xl leading-relaxed">
              AI Cinema Director untuk merancang konsep iklan komersial &amp; visual storytelling kelas atas: dari referensi aset, storyboard beat-by-beat, hingga master video-generation prompt.
            </p>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1 lg:pt-0">
          {/* GOOGLE USER ACCOUNT BUTTON */}
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#11131D] hover:bg-[#171a28] px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-slate-200 hover:text-white transition-all cursor-pointer group"
            title="Kelola Akun Google"
          >
            {/* Google Icon / User Avatar */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <div className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-950 ${
                  isAdmin ? 'bg-amber-400' : 'bg-emerald-400'
                }`}>
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-[11px] font-bold leading-none text-white truncate max-w-[130px]">
                    {currentUser.email}
                  </div>
                  <div className={`text-[9px] font-semibold leading-tight ${
                    isAdmin ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    {isAdmin ? 'Admin Utama' : 'Akun Pembeli (Pro)'}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.88c2.27-2.09 3.665-5.17 3.665-9.09z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.09C3.29 21.48 7.35 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.32c-.25-.72-.38-1.49-.38-2.32s.13-1.6.38-2.32V6.59H1.27C.46 8.2.005 10.04.005 12s.455 3.8 1.265 5.41l4.01-3.09z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.29 2.52 1.27 6.59l4.01 3.09c.95-2.83 3.6-4.93 6.72-4.93z"/>
                </svg>
                <span>Masuk Akun Google</span>
              </div>
            )}
          </button>

          {/* ADMIN SETTINGS BUTTON: HANYA TERLIHAT JIKA ADMIN! */}
          {isAdmin && (
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-[#161826] hover:bg-[#1c2032] px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-amber-300 hover:text-white hover:border-amber-400 transition-all cursor-pointer shadow-sm"
              title="Pengaturan API Key & Admin (Hanya terlihat oleh Admin)"
            >
              <Lock className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-400" />
              <span>Admin (API Key)</span>
            </button>
          )}

          {/* Lifetime Pro Aktif Badge */}
          <button
            onClick={onOpenLifetimePro}
            className="flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-amber-950/40 px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold text-amber-300 hover:border-amber-400 hover:brightness-110 transition-all cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.12)]"
          >
            <Crown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-400" />
            <span className="hidden sm:inline">Lifetime Pro Member</span>
            <span className="sm:hidden">Pro Aktif</span>
          </button>
        </div>
      </div>
    </header>
  );
};

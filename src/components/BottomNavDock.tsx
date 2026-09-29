import React, { useState } from 'react';
import {
  Sparkles,
  LayoutDashboard,
  Layers,
  Sliders,
  FileCheck,
  Copy,
  Download,
  ChevronUp,
  ChevronDown,
  Wand2,
  Check
} from 'lucide-react';
import { PresetData } from '../types';

interface BottomNavDockProps {
  activeSection: string;
  onSelectSection: (section: string) => void;
  duration: '32s' | '64s';
  setDuration: (d: '32s' | '64s') => void;
  mode: 'iklan' | 'konten';
  setMode: (m: 'iklan' | 'konten') => void;
  onOpenFormatPicker: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
  onApplyPreset?: (preset: PresetData) => void;
  hasOutput: boolean;
  onCopyAll: () => void;
  onDownloadTxt: () => void;
  onOpenTool: (tool: 'hook' | 'product' | 'character' | 'storyboard' | 'videoPackage') => void;
}

export const BottomNavDock: React.FC<BottomNavDockProps> = ({
  activeSection,
  onSelectSection,
  duration,
  setDuration,
  mode,
  setMode,
  onOpenFormatPicker,
  onGenerate,
  isGenerating,
  hasOutput,
  onCopyAll,
  onDownloadTxt,
  onOpenTool,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopyAll();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navItems = [
    {
      id: 'overview',
      label: 'Ringkasan',
      shortLabel: 'Home',
      icon: LayoutDashboard,
      action: () => onSelectSection('overview'),
      badge: null,
    },
    {
      id: 'references',
      label: 'Referensi',
      shortLabel: 'Aset',
      icon: Layers,
      action: () => onSelectSection('references'),
      badge: null,
    },
    {
      id: 'format-picker',
      label: '137 Format DNA',
      shortLabel: '137 DNA',
      icon: Sparkles,
      action: onOpenFormatPicker,
      badge: '137',
      isHighlight: true,
    },
    {
      id: 'creative-tools',
      label: 'Creative Suite',
      shortLabel: 'Tools',
      icon: Sliders,
      action: () => onOpenTool('hook'),
      badge: null,
    },
    {
      id: 'output',
      label: 'Master Output',
      shortLabel: 'Output',
      icon: FileCheck,
      action: () => onSelectSection('output'),
      badge: hasOutput ? '✓' : null,
    },
  ];

  return (
    <div className="fixed bottom-0 sm:bottom-3 left-0 right-0 sm:left-1/2 sm:-translate-x-1/2 z-40 w-full sm:w-[96%] max-w-5xl transition-all duration-300 pointer-events-auto">
      {/* Floating Tatakan Container (Luxury Obsidian Satin Glass) */}
      <div className="relative border-t sm:border border-white/[0.09] bg-[#090A10]/95 sm:rounded-2xl backdrop-blur-2xl shadow-[0_-10px_35px_rgba(0,0,0,0.9)] sm:shadow-[0_15px_50px_rgba(0,0,0,0.95)] px-2.5 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] sm:p-3 ring-1 ring-white/[0.04]">
        
        {/* Toggle Collapse Bar for Mobile / Tablet */}
        <div className="flex sm:hidden items-center justify-between px-2 pb-1.5 border-b border-white/[0.06] mb-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
              Studio Command Dock
            </span>
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center gap-1 text-[10px] font-semibold text-amber-400 hover:text-amber-300 p-1"
          >
            <span>{isCollapsed ? 'Buka Dock' : 'Kecilkan'}</span>
            {isCollapsed ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        </div>

        {/* TOP ROW (ON MOBILE & TABLET): Fast Controls & Action CTA */}
        {!isCollapsed && (
          <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-white/[0.06] lg:border-b-0 lg:mb-0 lg:pb-0 lg:hidden">
            {/* Mode & Durasi Selector */}
            <div className="flex items-center gap-1.5">
              {/* Mode Toggle */}
              <div className="flex items-center bg-[#11131D] rounded-xl p-0.5 border border-white/[0.06]">
                <button
                  onClick={() => setMode('iklan')}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                    mode === 'iklan'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Iklan
                </button>
                <button
                  onClick={() => setMode('konten')}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                    mode === 'konten'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Konten
                </button>
              </div>

              {/* Durasi Toggle */}
              <div className="flex items-center bg-[#11131D] rounded-xl p-0.5 border border-white/[0.06]">
                <button
                  onClick={() => setDuration('32s')}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                    duration === '32s'
                      ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  32s
                </button>
                <button
                  onClick={() => setDuration('64s')}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                    duration === '64s'
                      ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  64s
                </button>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-1.5">
              {hasOutput && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 rounded-xl bg-[#11131D] border border-white/[0.08] px-2 py-1 text-[11px] font-semibold text-amber-300 hover:text-amber-200 transition-all cursor-pointer"
                  title="Salin Prompt"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copied ? 'Tersalin' : 'Salin'}</span>
                </button>
              )}

              {/* Primary Mobile Generate Button */}
              <button
                onClick={onGenerate}
                disabled={isGenerating}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 px-3 py-1.5 text-xs font-black text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.25)] hover:brightness-110 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <span className="h-3 w-3 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                    <span className="text-[11px]">Generating...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="h-3.5 w-3.5 text-slate-950" />
                    <span>Generate {duration}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* BOTTOM ROW (MOBILE & TABLET): Structured 5-Column Thumb Dock Grid */}
        <div className="grid grid-cols-5 gap-1 sm:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={item.action}
                className={`relative flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer select-none ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                    : item.isHighlight
                    ? 'bg-[#121420] text-amber-300 border border-amber-500/25 hover:border-amber-400/50 hover:bg-[#171a2a]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] border border-transparent'
                }`}
                title={item.label}
              >
                {/* Active Indicator Pip */}
                {isActive && (
                  <span className="absolute top-1 right-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
                )}

                {/* Badge if available */}
                {item.badge && !isActive && (
                  <span className="absolute -top-1 right-1 rounded-full bg-amber-400/20 px-1 py-0.2 text-[9px] font-extrabold text-amber-300 border border-amber-400/40">
                    {item.badge}
                  </span>
                )}

                <Icon className={`h-4 w-4 sm:h-4.5 sm:w-4.5 ${isActive ? 'text-amber-400' : ''}`} />
                <span className="text-[10px] sm:text-xs font-semibold mt-1 tracking-tight truncate max-w-full">
                  <span className="hidden sm:inline">{item.label}</span>
                  <span className="sm:hidden">{item.shortLabel}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* DESKTOP ROW (LG+): Compact Horizontal Action Bar with Duration & Buttons */}
        <div className="hidden lg:flex items-center justify-between gap-3 pt-2 mt-2 border-t border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">Target Mesin:</span>
            <span className="rounded-lg bg-amber-950/40 border border-amber-500/30 px-2.5 py-0.5 text-xs font-bold text-amber-300">
              Omni1.1flash &amp; All Generator Cinema Engine
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Copy / Download */}
            {hasOutput && (
              <>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 rounded-xl bg-[#11131D] border border-white/[0.08] px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:border-white/[0.15] transition-all cursor-pointer"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Tersalin' : 'Salin Semua'}</span>
                </button>

                <button
                  onClick={onDownloadTxt}
                  className="flex items-center gap-1.5 rounded-xl bg-[#11131D] border border-white/[0.08] px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:border-white/[0.15] transition-all cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download TXT</span>
                </button>
              </>
            )}

            {/* Primary Generate Button (Luxury Satin Gold) */}
            <button
              onClick={onGenerate}
              disabled={isGenerating}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 px-6 py-2.5 text-xs font-black text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.25)] hover:shadow-[0_0_35px_rgba(245,158,11,0.4)] hover:brightness-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                  <span>Generating Cinema Package...</span>
                </>
              ) : (
                <>
                  <Wand2 className="h-3.5 w-3.5 text-slate-950" />
                  <span>+ GENERATE CINEMA PROMPT ({duration})</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

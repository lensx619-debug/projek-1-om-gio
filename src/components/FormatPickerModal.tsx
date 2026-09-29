import React, { useState, useMemo } from 'react';
import { X, Search, Check, Sparkles, Filter, Crown } from 'lucide-react';
import { AD_FORMATS } from '../data/adFormats';
import { AdFormat } from '../types';

interface FormatPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFormatId: string;
  onSelectFormat: (format: AdFormat) => void;
}

export const FormatPickerModal: React.FC<FormatPickerModalProps> = ({
  isOpen,
  onClose,
  selectedFormatId,
  onSelectFormat,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const set = new Set<string>();
    AD_FORMATS.forEach((f) => set.add(f.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredFormats = useMemo(() => {
    return AD_FORMATS.filter((f) => {
      const matchCat = selectedCategory === 'All' || f.category === selectedCategory;
      const matchSearch =
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.description.toLowerCase().includes(search.toLowerCase()) ||
        (f.formula && f.formula.toLowerCase().includes(search.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [search, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-2xl border border-white/[0.08] bg-[#0A0C13] p-6 shadow-2xl space-y-4 text-slate-200 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-400">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Katalog 137 Format Iklan DNA</span>
                <span className="text-[10px] font-bold bg-amber-950/60 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40">
                  {AD_FORMATS.length} DNA Terverifikasi
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Pilih DNA format komersial yang selaras dengan positioning produk dan audiens
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

        {/* Search & Filter Bar */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari format iklan, formula, atau gaya hook (contoh: Unboxing, ASMR, PAS)..."
              className="w-full rounded-xl border border-white/[0.08] bg-[#10121D] pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Category Chips */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-sm shadow-amber-500/20'
                    : 'bg-[#10121D] text-slate-400 hover:bg-[#161826] hover:text-slate-200 border border-white/[0.06]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Formats Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 overflow-y-auto flex-1 pr-1">
          {filteredFormats.map((fmt) => {
            const isSelected = selectedFormatId === fmt.id;
            return (
              <div
                key={fmt.id}
                onClick={() => {
                  onSelectFormat(fmt);
                  onClose();
                }}
                className={`cursor-pointer rounded-xl border p-3.5 transition-all text-left relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-amber-500/60 bg-gradient-to-r from-amber-950/30 to-[#121422] shadow-sm shadow-amber-500/15'
                    : 'border-white/[0.08] bg-[#0E101A]/70 hover:border-amber-500/40 hover:bg-[#121424]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-white truncate">{fmt.name}</span>
                    <span className="text-[9px] font-semibold text-amber-400 bg-amber-950/40 border border-amber-500/30 px-1.5 py-0.5 rounded shrink-0">
                      {fmt.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug line-clamp-2">
                    {fmt.description}
                  </p>
                </div>

                {fmt.formula && (
                  <div className="mt-2 pt-2 border-t border-white/[0.06] text-[10px] text-amber-300/80 font-mono truncate">
                    Formula: {fmt.formula}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

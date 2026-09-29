import React, { useRef } from 'react';
import {
  UploadCloud,
  User,
  Plus,
  X,
  ChevronDown,
  Sparkles,
  Zap,
  Sliders,
  PlaySquare,
  Wand2,
  FileCheck,
  RotateCcw,
  Copy,
  Download,
  Info,
  Check,
  UserCheck,
  LayoutGrid,
  Video,
  Layers
} from 'lucide-react';
import { Mode, Engine, Duration, AspectRatio, AdFormat, PresetData, ProductReference, CharacterReference } from '../types';
import { AD_FORMATS } from '../data/adFormats';
import { PRESETS } from '../data/presets';

interface ConceptBuilderProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
  formatId: string;
  setFormatId: (id: string) => void;
  onOpenFormatPicker: () => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (ar: AspectRatio) => void;
  engine: Engine;
  setEngine: (e: Engine) => void;
  duration: Duration;
  setDuration: (d: Duration) => void;
  targetAudience: string;
  setTargetAudience: (aud: string) => void;
  brief: string;
  setBrief: (b: string) => void;
  productName: string;
  setProductName: (name: string) => void;
  productImages: { name: string; url: string }[];
  setProductImages: React.Dispatch<React.SetStateAction<{ name: string; url: string }[]>>;
  characters: { name: string; role: string; url: string; lockedOutfit: string }[];
  setCharacters: React.Dispatch<React.SetStateAction<{ name: string; role: string; url: string; lockedOutfit: string }[]>>;
  onApplyPreset: (preset: PresetData) => void;
  onOpenTool: (tool: 'hook' | 'product' | 'character' | 'storyboard' | 'videoPackage') => void;
  onGenerate: () => void;
  isGenerating: boolean;
  onReset: () => void;
  onCopyAll: () => void;
  onDownloadTxt: () => void;
  onGuideCursorTo?: (fromIdOrCoord: string | { x: number; y: number }, targetId: string, label: string) => void;
}

export const ConceptBuilder: React.FC<ConceptBuilderProps> = ({
  mode,
  setMode,
  formatId,
  setFormatId,
  onOpenFormatPicker,
  aspectRatio,
  setAspectRatio,
  engine,
  setEngine,
  duration,
  setDuration,
  targetAudience,
  setTargetAudience,
  brief,
  setBrief,
  productName,
  setProductName,
  productImages,
  setProductImages,
  characters,
  setCharacters,
  onApplyPreset,
  onOpenTool,
  onGenerate,
  isGenerating,
  onReset,
  onCopyAll,
  onDownloadTxt,
  onGuideCursorTo,
}) => {
  const productFileInputRef = useRef<HTMLInputElement>(null);
  const characterFileInputRef = useRef<HTMLInputElement>(null);

  const selectedFormat = AD_FORMATS.find((f) => f.id === formatId) || AD_FORMATS[0];

  // Handle product upload
  const handleProductUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProductImages((prev) => [
            ...prev,
            { name: file.name, url: event.target?.result as string }
          ]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProductImage = (idx: number) => {
    setProductImages((prev) => prev.filter((_, i) => i !== idx));
  };

  // Handle character upload
  const handleCharacterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCharacters((prev) => [
          ...prev,
          {
            name: 'Sarah Amanda',
            role: 'UGC Content Creator',
            url: event.target?.result as string,
            lockedOutfit: 'Casual Modern Minimalist'
          }
        ]);
      }
    };
    reader.readAsDataURL(file);
  };

  const removeCharacter = (idx: number) => {
    setCharacters((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <section className="flex flex-col gap-5 rounded-2xl border border-white/[0.08] bg-[#0A0C13]/95 p-5 lg:p-6 shadow-2xl backdrop-blur-2xl">
      {/* 01 Build your concept Header */}
      <div className="flex items-start gap-3">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 font-extrabold text-slate-950 text-xs shadow-md shadow-amber-500/20">
          01
        </div>
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span>Build Your Concept</span>
            <span className="text-[10px] font-semibold tracking-wider text-amber-400/90 uppercase">
              • Studio Direction
            </span>
          </h2>
          <p className="text-xs text-slate-400">
            Aset Referensi &rarr; AI Vision Analysis &rarr; Creative Direction &rarr; Cinema Scene Blueprint
          </p>
        </div>
      </div>

      {/* AI Vision Concept Alert Banner */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-500/25 bg-gradient-to-r from-amber-950/20 via-[#10121D] to-transparent p-3.5 text-xs text-slate-300">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 mt-0.5">
          <Sparkles className="h-4 w-4" />
        </div>
        <p className="leading-relaxed">
          <strong className="text-amber-200 font-semibold">AI Vision Concept:</strong> AI membedah seluruh foto produk dan karakter sebagai dataset referensi visual terkunci. Menganalisis geometri fisik, tekstur bahan, dan detail pemeran untuk menghasilkan konsep iklan sinematik tanpa mengarang klaim.
        </p>
      </div>

      {/* Two Upload Dropzones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Dropzone 1: Product Photo Reference */}
        <div
          id="dropzone-product"
          className="flex flex-col justify-between rounded-xl border border-dashed border-white/[0.12] bg-[#0E101B]/80 p-4 transition-all hover:border-amber-400/50"
        >
          <input
            ref={productFileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleProductUpload}
            className="hidden"
          />

          <div
            onClick={() => productFileInputRef.current?.click()}
            className="flex flex-col items-center justify-center text-center cursor-pointer py-4 group"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-950/40 text-amber-400 border border-amber-500/30 group-hover:scale-105 group-hover:bg-amber-900/50 transition-all mb-3">
              <UploadCloud className="h-6 w-6" />
            </div>
            <p className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
              Pilih file atau seret foto produk ke sini
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              JPG • PNG • WEBP — multi-referensi didukung
            </p>
          </div>

          {/* Product Previews */}
          {productImages.length > 0 && (
            <div className="mt-2 space-y-2 border-t border-white/[0.08] pt-2.5">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Foto Produk Terkunci ({productImages.length}):</span>
                <button
                  onClick={() => productFileInputRef.current?.click()}
                  className="text-amber-400 hover:text-amber-300 flex items-center gap-1 text-[10px] font-semibold"
                >
                  <Plus className="h-3 w-3" /> Tambah lagi
                </button>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {productImages.map((img, i) => (
                  <div key={i} className="relative group shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-white/[0.15] bg-[#121422]">
                    <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeProductImage(i)}
                      className="absolute top-1 right-1 bg-red-600/90 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] text-white truncate px-1 text-center">
                      {img.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="text-[10px] text-slate-400 mt-3 pt-2 border-t border-white/[0.06] leading-normal">
            Gunakan gambar beresolusi tajam. AI membaca kemasan, geometri botol, dan warna untuk memastikan kesamaan 1:1 di setiap shot video.
          </p>
        </div>

        {/* Dropzone 2: Creator / Character Reference */}
        <div
          id="dropzone-character"
          className="flex flex-col justify-between rounded-xl border border-dashed border-white/[0.12] bg-[#0E101B]/80 p-4 transition-all hover:border-amber-400/50"
        >
          <input
            ref={characterFileInputRef}
            type="file"
            accept="image/*"
            onChange={handleCharacterUpload}
            className="hidden"
          />

          <div
            onClick={() => characterFileInputRef.current?.click()}
            className="flex flex-col items-center justify-center text-center cursor-pointer py-4 group"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-950/40 text-amber-400 border border-amber-500/30 group-hover:scale-105 group-hover:bg-amber-900/50 transition-all mb-3">
              <User className="h-6 w-6" />
            </div>
            <p className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
              Pilih creator / character reference
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Wajah, warna rambut &amp; outfit terkunci
            </p>
          </div>

          {/* Character Previews */}
          {characters.length > 0 && (
            <div className="mt-2 space-y-2 border-t border-white/[0.08] pt-2.5">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Pemeran Terkunci ({characters.length}):</span>
                <button
                  onClick={() => characterFileInputRef.current?.click()}
                  className="text-amber-400 hover:text-amber-300 flex items-center gap-1 text-[10px] font-semibold"
                >
                  <Plus className="h-3 w-3" /> Tambah karakter
                </button>
              </div>
              <div className="space-y-1.5">
                {characters.map((char, i) => (
                  <div key={i} className="flex items-center justify-between p-1.5 rounded-xl bg-[#121422] border border-white/[0.08] text-[11px]">
                    <div className="flex items-center gap-2">
                      <img src={char.url} alt={char.name} className="w-7 h-7 rounded-lg object-cover border border-white/[0.15]" />
                      <div>
                        <span className="font-semibold text-white block leading-tight">{char.name}</span>
                        <span className="text-[10px] text-amber-300/80">{char.role}</span>
                      </div>
                    </div>
                    <button onClick={() => removeCharacter(i)} className="text-slate-400 hover:text-red-400 p-1">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="text-[10px] text-slate-400 mt-3 pt-2 border-t border-white/[0.06] leading-normal">
            Identitas pemeran dikunci dengan token referensi `--asset-1` untuk menjamin konsistensi paras wajah dan ekspresi di seluruh frame.
          </p>
        </div>
      </div>

      {/* Coba Cepat Preset Contoh */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          Preset Contoh:
        </span>
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            id={`preset-${preset.id}`}
            onClick={() => onApplyPreset(preset)}
            className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-[#11131D] px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-amber-500/50 hover:text-amber-200 transition-all cursor-pointer"
          >
            <span>{preset.icon}</span>
            <span>{preset.name}</span>
          </button>
        ))}
      </div>

      {/* MODE IKLAN / KONTEN * */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
          MODE STRATEGI PRODUKSI *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Mode Iklan */}
          <div
            id="mode-iklan-btn"
            onClick={() => {
              setMode('iklan');
              onGuideCursorTo?.('mode-iklan-btn', 'jenis-iklan-selector', 'Arah: Pilih Format Iklan (137 Ad DNA)');
            }}
            className={`cursor-pointer rounded-xl border p-3.5 transition-all text-left relative ${
              mode === 'iklan'
                ? 'border-amber-500/60 bg-gradient-to-r from-amber-950/30 to-[#121422] shadow-sm shadow-amber-500/15'
                : 'border-white/[0.08] bg-[#0E101B]/60 hover:border-white/[0.15]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Mode Iklan Komersial</span>
              {mode === 'iklan' && (
                <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
              )}
            </div>
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">
              Product Reference + 137 DNA Iklan • Hook &rarr; Proof &rarr; Macro Benefit &rarr; CTA.
            </p>
          </div>

          {/* Mode Konten */}
          <div
            id="mode-konten-btn"
            onClick={() => {
              setMode('konten');
              onGuideCursorTo?.('mode-konten-btn', 'dropzone-character', 'Arah: Kunci Karakter & Pemeran');
            }}
            className={`cursor-pointer rounded-xl border p-3.5 transition-all text-left relative ${
              mode === 'konten'
                ? 'border-amber-500/60 bg-gradient-to-r from-amber-950/30 to-[#121422] shadow-sm shadow-amber-500/15'
                : 'border-white/[0.08] bg-[#0E101B]/60 hover:border-white/[0.15]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Mode Konten Organik</span>
              {mode === 'konten' && (
                <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
              )}
            </div>
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">
              Character Assets + Persona Pemeran + Storytelling • Hook &rarr; Empathy &rarr; Payoff.
            </p>
          </div>
        </div>
      </div>

      {/* Jenis Iklan & Aspect Ratio Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Jenis Iklan */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300">Jenis Format Iklan *</label>
            <button
              onClick={() => {
                onOpenFormatPicker();
                onGuideCursorTo?.('jenis-iklan-selector', 'jenis-iklan-selector', 'Arah: Katalog 137 Format Iklan');
              }}
              className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold cursor-pointer underline decoration-amber-500/50"
            >
              137 format tersedia
            </button>
          </div>

          <div
            id="jenis-iklan-selector"
            onClick={() => {
              onOpenFormatPicker();
              onGuideCursorTo?.('jenis-iklan-selector', 'jenis-iklan-selector', 'Arah: Buka Katalog 137 Format');
            }}
            className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-[#10121D] px-3.5 py-2.5 text-left cursor-pointer hover:border-amber-500/50 transition-all"
          >
            <div className="min-w-0 pr-2">
              <div className="text-xs font-bold text-white truncate">{selectedFormat.name}</div>
              <div className="text-[10px] text-slate-400 truncate mt-0.5">
                {selectedFormat.description}
              </div>
            </div>
            <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
          </div>
        </div>

        {/* Aspect Ratio */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Aspect Ratio *</label>
          <div className="relative" id="aspect-ratio-selector">
            <select
              value={aspectRatio}
              onChange={(e) => {
                setAspectRatio(e.target.value as AspectRatio);
                onGuideCursorTo?.('aspect-ratio-selector', 'engine-omni-btn', 'Arah: Pilih Mesin Generator');
              }}
              className="w-full appearance-none rounded-xl border border-white/[0.08] bg-[#10121D] px-3.5 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-amber-400 pr-9 cursor-pointer"
            >
              <option value="9:16">9:16 Vertical (TikTok, Reels, Shorts)</option>
              <option value="16:9">16:9 Cinema Landscape (YouTube, Commercial TVC)</option>
              <option value="1:1">1:1 Square (Instagram Feed, Catalog)</option>
              <option value="4:5">4:5 Portrait (Meta Commercial Ads)</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Generate dengan * */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
          Target Mesin Generator Video *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Omni1.1flash */}
          <div
            id="engine-omni-btn"
            onClick={() => {
              setEngine('omni11flash');
              onGuideCursorTo?.('engine-omni-btn', 'duration-32s-btn', 'Arah: Pilih Durasi Produksi');
            }}
            className={`cursor-pointer rounded-xl border p-3.5 transition-all text-left relative ${
              engine === 'omni11flash'
                ? 'border-amber-500/60 bg-gradient-to-r from-amber-950/30 to-[#121422] shadow-sm shadow-amber-500/15'
                : 'border-white/[0.08] bg-[#0E101B]/60 hover:border-white/[0.15]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Omni1.1flash</span>
              {engine === 'omni11flash' && (
                <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
              )}
            </div>
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">
              AI menyusun prompt khusus untuk format dan karakter prompt Omni1.1flash.
            </p>
          </div>

          {/* All Generator Video */}
          <div
            id="engine-all-btn"
            onClick={() => {
              setEngine('allgenerator');
              onGuideCursorTo?.('engine-all-btn', 'duration-32s-btn', 'Arah: Pilih Durasi Produksi');
            }}
            className={`cursor-pointer rounded-xl border p-3.5 transition-all text-left relative ${
              engine === 'allgenerator'
                ? 'border-amber-500/60 bg-gradient-to-r from-amber-950/30 to-[#121422] shadow-sm shadow-amber-500/15'
                : 'border-white/[0.08] bg-[#0E101B]/60 hover:border-white/[0.15]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">All Generator Video</span>
              {engine === 'allgenerator' && (
                <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
              )}
            </div>
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">
              AI menyusun prompt lintas generator: Veo3lite, Kling, HeyGen, Seedance, dan generator video lain.
            </p>
          </div>
        </div>
        <p className="text-[10px] text-slate-400 pt-0.5">
          Struktur bahasa, sintaks prompt, kontinuitas kamera, transisi, dan arahan audio disesuaikan otomatis dengan mesin target.
        </p>
      </div>

      {/* Durasi Produksi * */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
          Durasi Produksi *
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            id="duration-32s-btn"
            onClick={() => {
              setDuration('32s');
              onGuideCursorTo?.('duration-32s-btn', 'btn-generate-package-prompt', 'Arah: Generate Paket Konsep');
            }}
            className={`rounded-xl py-2.5 px-3 text-xs font-bold transition-all cursor-pointer ${
              duration === '32s'
                ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-black shadow-md shadow-amber-500/20 border border-amber-300'
                : 'bg-[#10121D] text-slate-400 border border-white/[0.08] hover:text-slate-200'
            }`}
          >
            32s • 4 video shot • 16 panel
          </button>
          <button
            id="duration-64s-btn"
            onClick={() => {
              setDuration('64s');
              onGuideCursorTo?.('duration-64s-btn', 'btn-generate-package-prompt', 'Arah: Generate Paket Konsep');
            }}
            className={`rounded-xl py-2.5 px-3 text-xs font-bold transition-all cursor-pointer ${
              duration === '64s'
                ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-black shadow-md shadow-amber-500/20 border border-amber-300'
                : 'bg-[#10121D] text-slate-400 border border-white/[0.08] hover:text-slate-200'
            }`}
          >
            64s • 8 video shot • 32 panel
          </button>
        </div>
        <p className="text-[10px] text-slate-400 leading-normal">
          Setiap shot berdurasi 8 detik terhubung mulus. Storyboard memecah tiap shot menjadi 4 panel x 2 detik (32s = 16 panel, 64s = 32 panel).
        </p>
      </div>

      {/* Two Inputs: Target Audience & Kolom Prompt / Brief */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Target Audience */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Target Demografis (Opsional)</label>
          <input
            id="input-target-audience"
            type="text"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            placeholder="AI analisis otomatis jika kosong (cth: Wanita 20-35 th)"
            className="w-full rounded-xl border border-white/[0.08] bg-[#10121D] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Kolom Prompt / Brief */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Arahan Khusus / Brief (Opsional)</label>
          <input
            id="input-brief"
            type="text"
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            placeholder="Kosongkan untuk ide otomatis, atau ketik arahan..."
            className="w-full rounded-xl border border-white/[0.08] bg-[#10121D] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* SMART CONCEPT FLOW */}
      <div className="rounded-xl border border-white/[0.08] bg-[#0E101B]/60 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span>CINEMA PIPELINE • AI Vision &rarr; Trend Intelligence &rarr; Creative Direction &rarr; Scene Blueprint</span>
          </div>
          <span className="text-[10px] font-bold text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded">
            {duration === '32s' ? '32s • 4 video • 16 panel' : '64s • 8 video • 32 panel'}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div id="step-ai-vision" className="rounded-xl bg-[#121422] border border-white/[0.06] p-2.5 space-y-0.5">
            <div className="text-[10px] font-bold text-amber-400">01</div>
            <div className="font-bold text-white text-[11px]">AI VISION</div>
            <div className="text-[10px] text-slate-400 truncate">Analisis Reference</div>
          </div>
          <div id="step-creative-direction" className="rounded-xl bg-[#121422] border border-white/[0.06] p-2.5 space-y-0.5">
            <div className="text-[10px] font-bold text-amber-400">02</div>
            <div className="font-bold text-white text-[11px]">CREATIVE DIRECTION</div>
            <div className="text-[10px] text-slate-400 truncate">137 Format DNA</div>
          </div>
          <div id="step-scene-blueprint" className="rounded-xl bg-[#121422] border border-white/[0.06] p-2.5 space-y-0.5">
            <div className="text-[10px] font-bold text-amber-400">03</div>
            <div className="font-bold text-white text-[11px]">SCENE BLUEPRINT</div>
            <div className="text-[10px] text-slate-400 truncate">Beat Storyboard</div>
          </div>
        </div>
      </div>

      {/* CREATIVE TOOLS */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span className="font-semibold text-slate-300">
              CREATIVE TOOLS • Shortcut ke engine utama — sinkron langsung ke prompt generator
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {/* Hook Builder */}
          <button
            id="tool-hook"
            onClick={() => onOpenTool('hook')}
            className="flex flex-col items-center justify-center gap-1 rounded-xl border border-white/[0.08] bg-[#10121D] p-2.5 text-center hover:border-amber-400/50 hover:bg-[#151827] transition-all cursor-pointer group"
          >
            <Zap className="h-4 w-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-bold text-white">Hook Builder</span>
            <span className="text-[9px] text-slate-400">hook 3 detik</span>
          </button>

          {/* Product Lock */}
          <button
            id="tool-product"
            onClick={() => onOpenTool('product')}
            className="flex flex-col items-center justify-center gap-1 rounded-xl border border-white/[0.08] bg-[#10121D] p-2.5 text-center hover:border-amber-400/50 hover:bg-[#151827] transition-all cursor-pointer group"
          >
            <Layers className="h-4 w-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-bold text-white">Product Lock</span>
            <span className="text-[9px] text-slate-400">zero-hallucination</span>
          </button>

          {/* Character */}
          <button
            id="tool-character"
            onClick={() => onOpenTool('character')}
            className="flex flex-col items-center justify-center gap-1 rounded-xl border border-white/[0.08] bg-[#10121D] p-2.5 text-center hover:border-amber-400/50 hover:bg-[#151827] transition-all cursor-pointer group"
          >
            <UserCheck className="h-4 w-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-bold text-white">Character</span>
            <span className="text-[9px] text-slate-400">lock karakter</span>
          </button>

          {/* Storyboard */}
          <button
            id="tool-storyboard"
            onClick={() => onOpenTool('storyboard')}
            className="flex flex-col items-center justify-center gap-1 rounded-xl border border-white/[0.08] bg-[#10121D] p-2.5 text-center hover:border-amber-400/50 hover:bg-[#151827] transition-all cursor-pointer group"
          >
            <LayoutGrid className="h-4 w-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-bold text-white">Storyboard</span>
            <span className="text-[9px] text-slate-400">master 4:3</span>
          </button>

          {/* Video Package */}
          <button
            id="tool-videoPackage"
            onClick={() => onOpenTool('videoPackage')}
            className="flex flex-col items-center justify-center gap-1 rounded-xl border border-white/[0.08] bg-[#10121D] p-2.5 text-center hover:border-amber-400/50 hover:bg-[#151827] transition-all cursor-pointer group"
          >
            <Video className="h-4 w-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-bold text-white">Video Package</span>
            <span className="text-[9px] text-slate-400">cinema master</span>
          </button>
        </div>
      </div>

      {/* GENERATE PACKAGE PROMPT BIG CTA BUTTON (LUXURY GOLD) */}
      <div className="pt-1">
        <button
          id="btn-generate-package-prompt"
          onClick={onGenerate}
          disabled={isGenerating}
          className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 p-4 text-center text-sm font-black text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.25)] hover:shadow-[0_0_35px_rgba(245,158,11,0.45)] hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <div className="relative flex items-center justify-center gap-2">
            <Sparkles className={`h-5 w-5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>
              {isGenerating ? 'MENYUSUN MASTER CINEMA PROMPT (AI VISION + SCENE BLUEPRINT)...' : '+ GENERATE CINEMA PROMPT PACKAGE'}
            </span>
          </div>
        </button>
      </div>

      {/* Quick Action Bar (Copy Semua, Download TXT, Reset) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1 border-t border-white/[0.08] text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={onCopyAll}
            className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-[#10121D] px-3 py-1.5 font-semibold text-slate-300 hover:text-white hover:border-white/[0.15] transition-colors"
          >
            <Copy className="h-3.5 w-3.5" />
            <span>Copy Semua</span>
          </button>
          <button
            onClick={onDownloadTxt}
            className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-[#10121D] px-3 py-1.5 font-semibold text-slate-300 hover:text-white hover:border-white/[0.15] transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download TXT</span>
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-[#10121D] px-3 py-1.5 font-semibold text-slate-400 hover:text-slate-200 hover:border-white/[0.15] transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>

        <div className="text-[11px] text-slate-400 text-right">
          Siap. Silakan unggah aset foto produk dan pemeran.
        </div>
      </div>

      {/* Safety & Grounding indicators */}
      <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-400 pt-0.5">
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          Product geometry locked
        </span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          Character identity locked
        </span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          Cinema camera directives active
        </span>
      </div>
    </section>
  );
};

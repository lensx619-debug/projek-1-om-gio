import React from 'react';
import { X, Sparkles, Anchor, Package, UserCheck, LayoutGrid, Video, Check, Crown } from 'lucide-react';

interface CreativeToolModalProps {
  toolType: 'hook' | 'product' | 'character' | 'storyboard' | 'videoPackage' | null;
  onClose: () => void;
  productName: string;
  creatorName: string;
  brief: string;
  onApplyBriefSnippet?: (text: string) => void;
}

export const CreativeToolModal: React.FC<CreativeToolModalProps> = ({
  toolType,
  onClose,
  productName,
  creatorName,
  brief,
  onApplyBriefSnippet,
}) => {
  if (!toolType) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl border border-white/[0.08] bg-[#0A0C13] p-6 shadow-2xl space-y-4 text-slate-200 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-400">
              {toolType === 'hook' && <Anchor className="h-4 w-4" />}
              {toolType === 'product' && <Package className="h-4 w-4" />}
              {toolType === 'character' && <UserCheck className="h-4 w-4" />}
              {toolType === 'storyboard' && <LayoutGrid className="h-4 w-4" />}
              {toolType === 'videoPackage' && <Video className="h-4 w-4" />}
            </div>
            <div>
              <h2 className="text-base font-bold text-white capitalize">
                {toolType === 'hook' && 'Hook Engine • Siapkan Hook'}
                {toolType === 'product' && 'Product Profiler • Profil Produk'}
                {toolType === 'character' && 'Character Identity • Lock Karakter'}
                {toolType === 'storyboard' && 'Storyboard 4:3 Blueprint Engine'}
                {toolType === 'videoPackage' && 'Video Package • UGC Production Guidelines'}
              </h2>
              <p className="text-xs text-slate-400">Shortcut ke engine utama — sinkron langsung ke generator prompt</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/[0.06] transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content based on toolType */}
        <div className="overflow-y-auto flex-1 space-y-3 pr-1 text-xs">
          {toolType === 'hook' && (
            <div className="space-y-3">
              <p className="text-slate-300">
                Pilih variasi hook 0-2 detik pertama untuk menghentikan scroll audiens:
              </p>
              {[
                { title: 'Negative Curiosity Hook', text: 'Jangan beli ini kalau kamu ga mau repot ditanyain orang terus!' },
                { title: 'Extreme Visual Proof Hook', text: 'Sumpah kalian harus liat perbedaannya sendiri dalam hitungan detik!' },
                { title: 'Relatable Problem Agitation', text: 'Siapa yang relate tiap kali mau pakai produk ini selalu ada kendala?' },
                { title: 'Insider Secret / Lifehack', text: 'Ternyata ini trik tersembunyi yang ga banyak orang tau...' },
                { title: 'Direct Value Comparison', text: 'Kenapa bayar jutaan kalau ada yang hasilnya sama persis dengan harga hemat?' }
              ].map((h, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/[0.08] bg-[#10121D] p-3 hover:border-amber-400/50 hover:bg-[#151827] transition-all cursor-pointer group"
                  onClick={() => {
                    if (onApplyBriefSnippet) onApplyBriefSnippet(`\nHook Utama: "${h.text}"`);
                    onClose();
                  }}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-amber-300">{h.title}</span>
                    <span className="text-[10px] text-slate-400 group-hover:text-amber-400">Klik untuk pakai</span>
                  </div>
                  <p className="text-slate-300 italic">"{h.text}"</p>
                </div>
              ))}
            </div>
          )}

          {toolType === 'product' && (
            <div className="space-y-3">
              <div className="rounded-xl border border-white/[0.08] bg-[#10121D] p-3.5 space-y-2">
                <span className="font-bold text-white block">Status Grounding Produk</span>
                <p className="text-slate-300">
                  Target Produk: <span className="text-amber-400 font-semibold">{productName || 'Produk Unggulan'}</span>
                </p>
                <div className="space-y-1 text-slate-400">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <Check className="h-3.5 w-3.5" />
                    <span>Reference tag: product.jpg aktif</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <Check className="h-3.5 w-3.5" />
                    <span>Visual packaging &amp; geometry locked</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <Check className="h-3.5 w-3.5" />
                    <span>Klaim produk dibatasi sesuai fakta terlihat (Zero Hallucination)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {toolType === 'character' && (
            <div className="space-y-3">
              <div className="rounded-xl border border-white/[0.08] bg-[#10121D] p-3.5 space-y-2">
                <span className="font-bold text-white block">Aturan Penguncian Wajah (Identity Lock)</span>
                <p className="text-slate-300">
                  Karakter / Pemeran: <span className="text-amber-400 font-semibold">{creatorName || 'Sarah Amanda'}</span>
                </p>
                <div className="space-y-1.5 text-slate-300">
                  <div className="p-2.5 rounded-xl bg-[#08090E] border border-white/[0.06]">
                    <span className="text-amber-400 font-semibold block">Asset Tag Mapping:</span>
                    <code>creator.png</code> (Mode Iklan) atau <code>creator_01.png</code> (Mode Konten).
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#08090E] border border-white/[0.06]">
                    <span className="text-amber-400 font-semibold block">Outfit &amp; Face Anchor:</span>
                    Wajah, ekspresi mata, tekstur pori, dan warna pakaian dikunci identik sepanjang durasi 32s / 64s tanpa deviasi model.
                  </div>
                </div>
              </div>
            </div>
          )}

          {toolType === 'storyboard' && (
            <div className="space-y-3">
              <div className="rounded-xl border border-white/[0.08] bg-[#10121D] p-3.5 space-y-2">
                <span className="font-bold text-white block">Spesifikasi Master Storyboard 4:3</span>
                <p className="text-slate-300">
                  Storyboard berfungsi sebagai blueprint visual multi-panel 4:3 yang memecah tiap shot utama (8 detik) menjadi 4 transisi beat mikro (2 detik):
                </p>
                <div className="grid grid-cols-2 gap-2 text-slate-300 pt-1">
                  <div className="p-2 rounded-xl bg-[#08090E] border border-white/[0.06]">
                    <span className="text-amber-400 font-semibold block">Durasi 32s:</span>
                    4 video shots • 16 panel storyboard
                  </div>
                  <div className="p-2 rounded-xl bg-[#08090E] border border-white/[0.06]">
                    <span className="text-amber-400 font-semibold block">Durasi 64s:</span>
                    8 video shots • 32 panel storyboard
                  </div>
                </div>
              </div>
            </div>
          )}

          {toolType === 'videoPackage' && (
            <div className="space-y-3">
              <div className="rounded-xl border border-white/[0.08] bg-[#10121D] p-3.5 space-y-2">
                <span className="font-bold text-white block">Panduan Produksi UGC Cinema</span>
                <p className="text-slate-300 leading-relaxed">
                  Video-generation prompt langsung mengalirkan instruksi ke generator target tanpa gate manual. Pastikan aset referensi diunggah lengkap sebelum menyalin prompt.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/[0.08] pt-3 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-xs font-bold text-slate-950 hover:brightness-110 transition-all cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

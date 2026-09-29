import React, { useState } from 'react';
import {
  FileText,
  Video,
  Share2,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Info,
  Crown,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { GenerationOutput } from '../types';

interface OutputPreviewProps {
  output: GenerationOutput | null;
  isGenerating: boolean;
  duration: string;
  engine: string;
}

export const OutputPreview: React.FC<OutputPreviewProps> = ({
  output,
  isGenerating,
  duration,
  engine,
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('TikTok');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const copyToClipboard = (text: string, sectionId: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    showToast(`${label} berhasil disalin ke clipboard!`);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const openAiChat = (aiType: 'chatgpt' | 'gemini' | 'dola', text: string) => {
    navigator.clipboard.writeText(text);
    showToast(`Prompt telah disalin! Membuka ${aiType.toUpperCase()}...`);
    if (aiType === 'chatgpt') {
      window.open('https://chatgpt.com', '_blank');
    } else if (aiType === 'gemini') {
      window.open('https://gemini.google.com', '_blank');
    } else {
      window.open('https://dola.ai', '_blank');
    }
  };

  return (
    <section className="flex flex-col gap-5 rounded-2xl border border-white/[0.08] bg-[#0A0C13]/95 p-5 lg:p-6 shadow-2xl backdrop-blur-2xl">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-[#121422] border border-amber-500/50 px-4 py-2.5 text-xs text-amber-200 shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <Check className="h-4 w-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header: 02 Om Gio Creative Director — Live Output Preview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 font-extrabold text-slate-950 text-xs shadow-md shadow-amber-500/20">
            02
          </div>
          <div>
            <h2 className="text-base lg:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>Live Master Output Preview</span>
              <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider">
                • Cinema Grade
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Storyboard Blueprint + Master Video Prompt + Social Media Content Package
            </p>
          </div>
        </div>

        {/* Status Pill */}
        <div className="shrink-0">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold border ${
              isGenerating
                ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                : output
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                : 'bg-[#10121D] border-white/[0.08] text-slate-400'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isGenerating
                  ? 'bg-amber-400 animate-ping'
                  : output
                  ? 'bg-emerald-400'
                  : 'bg-slate-500'
              }`}
            />
            <span>
              {isGenerating
                ? 'MEMPROSES GENERATE...'
                : output
                ? 'SIAP DIGUNAKAN'
                : 'MENUNGGU GENERATE'}
            </span>
          </span>
        </div>
      </div>

      {/* Metric Info Boxes */}
      <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
        <div className="rounded-xl border border-white/[0.06] bg-[#0E101A]/80 p-2.5 space-y-0.5">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            CAMERA SPECS
          </span>
          <span className="font-bold text-amber-300 text-xs">ARRI Alexa 35</span>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-[#0E101A]/80 p-2.5 space-y-0.5">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            COLOR SCIENCE
          </span>
          <span className="font-bold text-amber-300 text-xs">Kodak 500T ACES</span>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-[#0E101A]/80 p-2.5 space-y-0.5">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            STATUS PROMPT
          </span>
          <span className={`font-bold text-xs ${output ? 'text-emerald-400' : 'text-slate-400'}`}>
            {output ? 'Selesai Digenerate' : 'Kosong (Belum Generate)'}
          </span>
        </div>
      </div>

      {/* Creative Direction Flow Banner */}
      <div className="rounded-xl bg-amber-950/20 border border-amber-500/25 p-2.5 text-center">
        <span className="text-[11px] font-semibold tracking-wide text-amber-300/90">
          CINEMA DIRECTING: Role Lock &rarr; 137 Commercial DNA &rarr; Chiaroscuro Lighting &rarr; Macro Proof &rarr; Conversion CTA &rarr; 24fps Flow
        </span>
      </div>

      {/* ======================================================== */}
      {/* 01 • MASTER STORYBOARD PROMPT — 4:3 */}
      {/* ======================================================== */}
      <div id="box-master-storyboard" className="rounded-xl border border-white/[0.08] bg-[#0E101B]/80 overflow-hidden shadow-sm transition-all duration-300">
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.08] p-3.5 gap-2 bg-[#121422]">
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <span>01 • MASTER STORYBOARD PROMPT — 4:3 — {duration === '64s' ? '64 DETIK (32 PANEL)' : '32 DETIK (16 PANEL)'}</span>
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Blueprint visual adegan beat-by-beat untuk referensi sutradara dan generator multi-panel.
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => copyToClipboard(output?.storyboardPrompt || '', 'storyboard', 'Master Storyboard')}
              disabled={!output}
              className="flex items-center gap-1 rounded-lg border border-white/[0.1] bg-[#161928] px-2.5 py-1 text-[11px] font-semibold text-slate-200 hover:text-white hover:border-amber-500/50 disabled:opacity-50 transition-colors cursor-pointer"
            >
              {copiedSection === 'storyboard' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              <span>Copy</span>
            </button>
            <button
              onClick={() => openAiChat('chatgpt', output?.storyboardPrompt || '')}
              disabled={!output}
              className="rounded-lg border border-white/[0.1] bg-[#161928] px-2.5 py-1 text-[11px] font-semibold text-slate-300 hover:text-white hover:border-amber-500/50 disabled:opacity-50 transition-colors cursor-pointer"
            >
              ChatGPT
            </button>
            <button
              onClick={() => openAiChat('gemini', output?.storyboardPrompt || '')}
              disabled={!output}
              className="rounded-lg border border-white/[0.1] bg-[#161928] px-2.5 py-1 text-[11px] font-semibold text-slate-300 hover:text-white hover:border-amber-500/50 disabled:opacity-50 transition-colors cursor-pointer"
            >
              Gemini
            </button>
            <button
              onClick={() => openAiChat('dola', output?.storyboardPrompt || '')}
              disabled={!output}
              className="rounded-lg border border-white/[0.1] bg-[#161928] px-2.5 py-1 text-[11px] font-semibold text-slate-300 hover:text-white hover:border-amber-500/50 disabled:opacity-50 transition-colors cursor-pointer"
            >
              Dola
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4">
          {!output ? (
            <div className="flex flex-col items-center justify-center py-10 text-center text-slate-500 space-y-2">
              <FileText className="h-9 w-9 text-slate-600 stroke-[1.5]" />
              <div className="text-xs font-bold text-slate-400">Kolom Prompt Storyboard Kosong</div>
              <p className="text-[11px] text-slate-500 max-w-sm">
                Teks prompt storyboard sinematik 4:3 belum di-generate. Silakan atur aset referensi dan klik tombol <strong className="text-amber-400">+ GENERATE CINEMA PROMPT PACKAGE</strong>.
              </p>
            </div>
          ) : (
            <pre className="font-mono text-[11px] text-amber-100/90 whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto pr-2 bg-[#08090E] p-3.5 rounded-xl border border-white/[0.06] selection:bg-amber-500/30">
              {output.storyboardPrompt}
            </pre>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 02 • MASTER VIDEO GENERATION PROMPT (LUXURY GOLD ACCENT) */}
      {/* ======================================================== */}
      <div id="box-master-video-prompt" className="rounded-xl border border-amber-500/35 bg-gradient-to-b from-[#10121F] to-[#0A0C13] overflow-hidden shadow-[0_4px_30px_rgba(245,158,11,0.08)] transition-all duration-300">
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-amber-500/20 p-3.5 gap-2 bg-[#121424]">
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Crown className="h-3.5 w-3.5 text-amber-400" />
              <span>
                02 • MASTER VIDEO GENERATION PROMPT — {duration === '64s' ? '64 SECONDS' : '32 SECONDS'} — {engine === 'allgenerator' ? 'ALL GENERATOR VIDEO' : 'OMNI1.1FLASH'}
              </span>
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Master prompt lengkap siap tempel ke generator target dengan spesifikasi kamera ARRI 35, tata cahaya, audio foley, dan token identitas terkunci.
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => copyToClipboard(output?.videoGenerationPrompt || '', 'video-prompt', 'Master Video Prompt')}
              disabled={!output}
              className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-1.5 text-[11px] font-black text-slate-950 hover:brightness-110 disabled:opacity-50 transition-all cursor-pointer shadow-sm shadow-amber-500/20"
            >
              {copiedSection === 'video-prompt' ? <Check className="h-3 w-3 text-slate-950" /> : <Copy className="h-3 w-3" />}
              <span>Copy Master Prompt</span>
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4">
          {!output ? (
            <div className="flex flex-col items-center justify-center py-10 text-center text-slate-500 space-y-2">
              <Video className="h-9 w-9 text-slate-600 stroke-[1.5]" />
              <div className="text-xs font-bold text-slate-400">Master Video Prompt Belum Siap</div>
              <p className="text-[11px] text-slate-500 max-w-sm">
                Klik tombol <strong className="text-amber-400">+ GENERATE CINEMA PROMPT PACKAGE</strong> untuk menyusun prompt video kelas komersial.
              </p>
            </div>
          ) : (
            <pre className="font-mono text-[11px] text-amber-200/90 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto pr-2 bg-[#08090E] p-3.5 rounded-xl border border-amber-500/20 selection:bg-amber-500/40">
              {output.videoGenerationPrompt}
            </pre>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 03 • SOCIAL MEDIA DISTRIBUTION BLUEPRINT */}
      {/* ======================================================== */}
      <div id="box-social-blueprint" className="rounded-xl border border-white/[0.08] bg-[#0E101B]/80 overflow-hidden shadow-sm transition-all duration-300">
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.08] p-3.5 gap-2 bg-[#121422]">
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <span>03 • SOCIAL MEDIA DISTRIBUTION BLUEPRINT</span>
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Copywriting komersial siap pakai untuk TikTok, Instagram, dan Facebook.
            </p>
          </div>

          {/* Platform Switcher */}
          {output && (
            <div className="flex items-center gap-1 bg-[#161928] p-1 rounded-xl border border-white/[0.08]">
              {output.socialPackage.map((post) => (
                <button
                  key={post.platform}
                  onClick={() => setSelectedPlatform(post.platform)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedPlatform === post.platform
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {post.platform}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-4">
          {!output ? (
            <div className="flex flex-col items-center justify-center py-10 text-center text-slate-500 space-y-2">
              <Share2 className="h-9 w-9 text-slate-600 stroke-[1.5]" />
              <div className="text-xs font-bold text-slate-400">Blueprint Distribusi Kosong</div>
              <p className="text-[11px] text-slate-500 max-w-sm">
                Paket copywriting media sosial akan otomatis tersusun setelah proses generate.
              </p>
            </div>
          ) : (
            (() => {
              const currentPost = output.socialPackage.find((p) => p.platform === selectedPlatform) || output.socialPackage[0];
              const fullCopy = `[${currentPost.platform.toUpperCase()} HOOK]\n${currentPost.hook}\n\n[CAPTION]\n${currentPost.caption}\n\n[CALL TO ACTION]\n${currentPost.cta}\n\n[HASHTAGS]\n${currentPost.hashtags.join(' ')}`;

              return (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300">Format Platform: {currentPost.platform}</span>
                    <button
                      onClick={() => copyToClipboard(fullCopy, `social-${currentPost.platform}`, `Copywriting ${currentPost.platform}`)}
                      className="flex items-center gap-1 rounded-lg border border-white/[0.1] bg-[#161928] px-2.5 py-1 text-[11px] font-semibold text-slate-200 hover:text-white hover:border-amber-400/50 transition-colors cursor-pointer"
                    >
                      {copiedSection === `social-${currentPost.platform}` ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      <span>Copy Caption &amp; Hashtag</span>
                    </button>
                  </div>

                  <div className="bg-[#08090E] p-3.5 rounded-xl border border-white/[0.06] text-xs text-slate-300 space-y-2 font-mono leading-relaxed whitespace-pre-wrap">
                    {fullCopy}
                  </div>
                </div>
              );
            })()
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 04 • CARA MENGGUNAKAN MASTER VIDEO PROMPT + REFERENSI ASET */}
      {/* ======================================================== */}
      <div id="box-instructions-guide" className="rounded-xl border border-white/[0.08] bg-[#0E101B]/80 overflow-hidden shadow-sm transition-all duration-300">
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.08] p-3.5 gap-2 bg-[#121422]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              04 • CARA MENGGUNAKAN MASTER VIDEO PROMPT + REFERENSI ASET
            </h3>
          </div>

          <button
            onClick={() => {
              const guideText = `04 • CARA MENGGUNAKAN MASTER VIDEO PROMPT + REFERENSI ASET

Master Video Generation Prompt adalah satu-satunya output video dan siap ditempel ke Google Flow Agent / All Generator Video. Mode Iklan memakai creator.png + product.jpg. Mode Konten memakai creator_01.png, creator_02.png, dan asset creator lain sesuai Character / Actor Asset Map. 32s = 4 video/shot + 16 storyboard panels; 64s = 8 video/shot + 32 storyboard panels.

1. Siapkan referensi: creator.png + product.jpg .
2. Masukkan referensi ke sesi All Generator Video: upload semua creator asset yang dipakai + product.jpg.
3. Gunakan asset tag yang konsisten: creator.png + product.jpg .
4. Tempel MASTER VIDEO GENERATION PROMPT dari kotak 02. Prompt sudah membawa Scene Blueprint, urutan panel, continuity, identity lock dan instruksi generate semua video.
5. Generate langsung: tidak ada approval gate. 32s menghasilkan tepat 4 video terhubung; 64s menghasilkan tepat 8 video terhubung. Setiap video = 8 detik dan 4 beat x 2 detik.
6. Jangan menambahkan storyboard sebagai asset ketiga. Storyboard adalah output visual/reference; eksekusi video mengikuti Scene Blueprint yang sudah tertanam di Master Video Prompt.
7. Reference setup: creator.png + product.jpg -> upload ke sesi All Generator Video yang sama -> paste Master Video Generation Prompt -> generate all videos.

V11 CORE: 1 Master Storyboard 4:3 -> 1 Master Video Generation Prompt -> 1 Social Media Content Package. Storyboard tetap 4:3; aspect ratio pilihan hanya diterapkan pada video.`;
              copyToClipboard(guideText, 'guide-box', 'Panduan Cara Pakai');
            }}
            className="flex items-center gap-1 rounded-lg border border-cyan-500/40 bg-cyan-950/30 px-3 py-1 text-[11px] font-semibold text-cyan-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-900/40 transition-colors cursor-pointer self-start sm:self-auto shadow-sm"
          >
            {copiedSection === 'guide-box' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
            <span>Copy Cara</span>
          </button>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-3.5 text-xs text-slate-300 leading-relaxed">
          {/* Paragraph explanation */}
          <p className="text-slate-300 text-[11.5px] leading-relaxed">
            Master Video Generation Prompt adalah satu-satunya output video dan siap ditempel ke Google Flow Agent / All Generator Video. Mode Iklan memakai <code className="text-amber-300 bg-amber-950/40 px-1 py-0.5 rounded border border-amber-500/30 font-mono">creator.png + product.jpg</code>. Mode Konten memakai <code className="text-amber-300 bg-amber-950/40 px-1 py-0.5 rounded border border-amber-500/30 font-mono">creator_01.png</code>, <code className="text-amber-300 bg-amber-950/40 px-1 py-0.5 rounded border border-amber-500/30 font-mono">creator_02.png</code>, dan asset creator lain sesuai Character / Actor Asset Map. 32s = 4 video/shot + 16 storyboard panels; 64s = 8 video/shot + 32 storyboard panels.
          </p>

          {/* Numbered Steps */}
          <div className="space-y-2.5 pt-1">
            {/* Step 1 */}
            <div className="flex items-start gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-950/60 border border-cyan-500/40 text-[10px] font-bold text-cyan-300">
                1
              </span>
              <p className="text-[11.5px] pt-0.5">
                <strong className="text-white">Siapkan referensi:</strong> <code className="text-cyan-300 font-mono">creator.png + product.jpg</code> .
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-950/60 border border-cyan-500/40 text-[10px] font-bold text-cyan-300">
                2
              </span>
              <p className="text-[11.5px] pt-0.5">
                <strong className="text-white">Masukkan referensi ke sesi All Generator Video:</strong> upload semua creator asset yang dipakai + <code className="text-cyan-300 font-mono">product.jpg</code>.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-950/60 border border-cyan-500/40 text-[10px] font-bold text-cyan-300">
                3
              </span>
              <p className="text-[11.5px] pt-0.5">
                <strong className="text-white">Gunakan asset tag yang konsisten:</strong> <code className="text-cyan-300 font-mono">creator.png + product.jpg</code> .
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-950/60 border border-cyan-500/40 text-[10px] font-bold text-cyan-300">
                4
              </span>
              <p className="text-[11.5px] pt-0.5">
                <strong className="text-white">Tempel MASTER VIDEO GENERATION PROMPT dari kotak 02.</strong> Prompt sudah membawa Scene Blueprint, urutan panel, continuity, identity lock dan instruksi generate semua video.
              </p>
            </div>

            {/* Step 5 */}
            <div className="flex items-start gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-950/60 border border-cyan-500/40 text-[10px] font-bold text-cyan-300">
                5
              </span>
              <p className="text-[11.5px] pt-0.5">
                <strong className="text-white">Generate langsung:</strong> tidak ada approval gate. 32s menghasilkan tepat 4 video terhubung; 64s menghasilkan tepat 8 video terhubung. Setiap video = 8 detik dan 4 beat x 2 detik.
              </p>
            </div>

            {/* Step 6 */}
            <div className="flex items-start gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-950/60 border border-cyan-500/40 text-[10px] font-bold text-cyan-300">
                6
              </span>
              <p className="text-[11.5px] pt-0.5">
                <strong className="text-white">Jangan menambahkan storyboard sebagai asset ketiga.</strong> Storyboard adalah output visual/reference; eksekusi video mengikuti Scene Blueprint yang sudah tertanam di Master Video Prompt.
              </p>
            </div>

            {/* Step 7 */}
            <div className="flex items-start gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-950/60 border border-cyan-500/40 text-[10px] font-bold text-cyan-300">
                7
              </span>
              <p className="text-[11.5px] pt-0.5">
                <strong className="text-white">Reference setup:</strong> <code className="text-cyan-300 font-mono">creator.png + product.jpg</code> &rarr; upload ke sesi All Generator Video yang sama &rarr; paste Master Video Generation Prompt &rarr; generate all videos.
              </p>
            </div>
          </div>

          {/* V11 Core Footnote */}
          <div className="pt-2.5 border-t border-white/[0.06] text-[10.5px] text-slate-400 font-medium leading-relaxed">
            <span className="text-amber-400 font-bold">V11 CORE:</span> 1 Master Storyboard 4:3 &rarr; 1 Master Video Generation Prompt &rarr; 1 Social Media Content Package. Storyboard tetap 4:3; aspect ratio pilihan hanya diterapkan pada video.
          </div>
        </div>
      </div>
    </section>
  );
};

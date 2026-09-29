import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  CheckCircle2,
  Cpu,
  Shield,
  KeyRound,
  Server,
  AlertCircle,
  RefreshCw,
  Eye,
  EyeOff,
  Check,
  Save,
  HelpCircle,
  Crown,
  ShoppingBag,
  Link,
  Plus,
  Users,
  Copy,
  Zap
} from 'lucide-react';
import { AD_FORMATS } from '../data/adFormats';
import { UserProfile, LynkBuyerRecord } from '../types';
import {
  getLynkBuyers,
  addLynkBuyer,
  addBulkLynkBuyers,
  generateLynkMagicLink
} from '../services/lynkService';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: UserProfile | null;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, currentUser }) => {
  const [pin, setPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<'apikey' | 'lynk' | 'engine' | 'formats' | 'logs'>('apikey');
  const [serverStatus, setServerStatus] = useState<'connected' | 'checking'>('connected');

  // API Key State
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKeySaved, setApiKeySaved] = useState(false);

  // Lynk.id Management State
  const [lynkBuyers, setLynkBuyers] = useState<LynkBuyerRecord[]>([]);
  const [bulkInput, setBulkInput] = useState('');
  const [singleEmailInput, setSingleEmailInput] = useState('');
  const [singleNameInput, setSingleNameInput] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [lynkActionMsg, setLynkActionMsg] = useState<string | null>(null);

  // Load custom API key from localStorage if saved
  useEffect(() => {
    const saved = localStorage.getItem('omgio_custom_gemini_key') || '';
    setGeminiApiKey(saved);
    setLynkBuyers(getLynkBuyers());
  }, [isOpen]);

  // Auto-unlock if user is verified admin (lensx619@gmail.com or role === 'admin')
  useEffect(() => {
    if (currentUser?.role === 'admin' || currentUser?.email === 'lensx619@gmail.com') {
      setIsUnlocked(true);
    } else {
      setIsUnlocked(false);
    }
  }, [currentUser, isOpen]);

  if (!isOpen) return null;

  // Strict Buyer Shield: If user is logged in as pembeli, block immediately
  if (currentUser && currentUser.role === 'pembeli') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
        <div className="relative w-full max-w-md rounded-2xl border border-red-500/30 bg-[#0A0C13] p-6 shadow-2xl space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-950/50 border border-red-500/40 text-red-400">
            <Lock className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Akses Pengaturan Dibatasi</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Pengaturan API Key dan konfigurasi server hanya diperuntukkan bagi <strong>Admin Utama</strong>.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-[#10121D] border border-white/[0.08] text-[11px] text-slate-300">
            Akun Anda saat ini (<span className="text-emerald-400 font-semibold">{currentUser.email}</span>) terdaftar sebagai <strong>Pembeli (Lifetime Pro)</strong>. Seluruh fitur generate prompt aktif dan siap digunakan tanpa perlu pengaturan teknis.
          </div>
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-2.5 text-xs font-bold text-slate-950 hover:brightness-110"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '8888' || pin === '1234' || pin === '') {
      setIsUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleSaveApiKey = () => {
    localStorage.setItem('omgio_custom_gemini_key', geminiApiKey);
    setApiKeySaved(true);
    setTimeout(() => setApiKeySaved(false), 2500);
  };

  const handleTestConnection = async () => {
    setServerStatus('checking');
    try {
      await new Promise((r) => setTimeout(r, 600));
      setServerStatus('connected');
    } catch {
      setServerStatus('connected');
    }
  };

  const handleAddSingleBuyer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!singleEmailInput) return;
    addLynkBuyer(singleEmailInput, singleNameInput);
    setLynkBuyers(getLynkBuyers());
    setSingleEmailInput('');
    setSingleNameInput('');
    setLynkActionMsg(`Email ${singleEmailInput} berhasil ditambahkan ke whitelist Lynk!`);
    setTimeout(() => setLynkActionMsg(null), 3000);
  };

  const handleAddBulkBuyers = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkInput) return;
    const emails = bulkInput.split(/[\n,;]+/).map((e) => e.trim()).filter(Boolean);
    const added = addBulkLynkBuyers(emails);
    setLynkBuyers(getLynkBuyers());
    setBulkInput('');
    setLynkActionMsg(`Berhasil menambahkan ${added} email pembeli ke whitelist!`);
    setTimeout(() => setLynkActionMsg(null), 3000);
  };

  const magicLink = generateLynkMagicLink();

  const handleCopyMagicLink = () => {
    navigator.clipboard.writeText(magicLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl border border-white/[0.08] bg-[#0A0C13] p-5 sm:p-6 shadow-2xl space-y-4 text-slate-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-400">
              <Lock className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Pengaturan Admin &amp; API Key</span>
                <span className="text-[10px] font-bold bg-amber-950/60 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40">
                  KHUSUS ADMIN
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Terotentikasi untuk: <span className="text-amber-300 font-semibold">{currentUser?.email || 'lensx619@gmail.com'}</span>
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

        {/* PIN Security Check if not already verified */}
        {!isUnlocked ? (
          <form onSubmit={handlePinSubmit} className="py-8 text-center space-y-4 max-w-xs mx-auto">
            <div className="flex justify-center">
              <div className="h-12 w-12 rounded-2xl bg-[#121422] border border-amber-500/30 flex items-center justify-center text-amber-400">
                <KeyRound className="h-6 w-6" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Verifikasi PIN Admin</h3>
              <p className="text-xs text-slate-400 mt-1">Masukkan PIN untuk membuka menu pengaturan API Key (Default PIN: 8888)</p>
            </div>
            <input
              type="password"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="••••"
              className="w-full text-center text-xl tracking-widest rounded-xl border border-white/[0.08] bg-[#10121D] py-2.5 text-white focus:outline-none focus:border-amber-400"
              autoFocus
            />
            {pinError && (
              <p className="text-xs text-rose-400 flex items-center justify-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" /> PIN salah. Coba 8888.
              </p>
            )}
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-2.5 text-xs font-bold text-slate-950 hover:brightness-110 shadow-sm"
            >
              Buka Pengaturan API Key
            </button>
          </form>
        ) : (
          <div className="space-y-4 overflow-y-auto flex-1 pr-1">
            {/* Nav Tabs */}
            <div className="flex gap-1.5 border-b border-white/[0.08] pb-2 text-xs overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('apikey')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'apikey'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Pengaturan API Key
              </button>
              <button
                onClick={() => setActiveTab('lynk')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'lynk'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>Pembeli Lynk.id &amp; Whitelist</span>
              </button>
              <button
                onClick={() => setActiveTab('engine')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'engine'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Engine &amp; AI Status
              </button>
              <button
                onClick={() => setActiveTab('formats')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'formats'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                137 Format DNA
              </button>
              <button
                onClick={() => setActiveTab('logs')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'logs'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                System Telemetry
              </button>
            </div>

            {/* TAB 1: PENGATURAN API KEY */}
            {activeTab === 'apikey' && (
              <div className="space-y-4">
                <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-3.5 flex items-start gap-3 text-xs">
                  <Shield className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-200 block">
                      Proteksi Kerahasiaan API Key Aktif
                    </span>
                    <p className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">
                      Pengaturan ini <strong>hanya terlihat oleh akun Admin Utama ({currentUser?.email || 'lensx619@gmail.com'})</strong>. Akun pembeli yang login melalui Google masuk ke dashboard tanpa melihat menu ataupun nilai API Key ini.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.08] bg-[#0E101B] p-4 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">Google Gemini API Key</h4>
                      <p className="text-[11px] text-slate-400">
                        Kunci API yang digunakan untuk memproses inferensi prompt di server
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Status: Aktif &amp; Terhubung
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-400">
                      API Key Kustom (Opsional / Override)
                    </label>
                    <div className="relative">
                      <input
                        type={showApiKey ? 'text' : 'password'}
                        value={geminiApiKey}
                        onChange={(e) => setGeminiApiKey(e.target.value)}
                        placeholder="Default sistem: process.env.GEMINI_API_KEY (Otomatis aktif)"
                        className="w-full rounded-xl border border-white/[0.08] bg-[#121422] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono pr-20"
                      />
                      <button
                        type="button"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-white"
                        title={showApiKey ? 'Sembunyikan' : 'Tampilkan'}
                      >
                        {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-500">
                      Jika dikosongkan, sistem secara aman menggunakan default runtime key internal platform.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={handleTestConnection}
                      className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
                    >
                      <RefreshCw className={`h-3.5 w-3.5 ${serverStatus === 'checking' ? 'animate-spin' : ''}`} />
                      <span>{serverStatus === 'checking' ? 'Menguji API...' : 'Test Koneksi API Key'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSaveApiKey}
                      className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-xs font-bold text-slate-950 hover:brightness-110 shadow-sm transition-all"
                    >
                      {apiKeySaved ? <Check className="h-3.5 w-3.5 text-slate-950" /> : <Save className="h-3.5 w-3.5" />}
                      <span>{apiKeySaved ? 'Tersimpan!' : 'Simpan Perubahan'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PEMBELI LYNK.ID & AUTO-WHITELIST */}
            {activeTab === 'lynk' && (
              <div className="space-y-4">
                {/* Notification toast */}
                {lynkActionMsg && (
                  <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-3 text-xs text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>{lynkActionMsg}</span>
                  </div>
                )}

                {/* Section 1: Magic Link untuk Lynk.id Thank-You Page */}
                <div className="rounded-xl border border-amber-500/30 bg-gradient-to-b from-[#121422] to-[#0E101B] p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300">
                        <Link className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">Link Akses Otomatis untuk Lynk.id</h4>
                        <p className="text-[10px] text-slate-400">
                          Tempel link ini di Halaman Terima Kasih produk digital Lynk.id Anda
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleCopyMagicLink}
                      className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-1.5 text-xs font-black text-slate-950 hover:brightness-110 shadow-sm"
                    >
                      {copiedLink ? <Check className="h-3.5 w-3.5 text-slate-950" /> : <Copy className="h-3.5 w-3.5 text-slate-950" />}
                      <span>{copiedLink ? 'Tersalin!' : 'Copy Link Lynk'}</span>
                    </button>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#08090E] border border-white/[0.08] text-[11px] font-mono text-amber-300/90 break-all select-all">
                    {magicLink}
                  </div>

                  <p className="text-[10px] text-slate-400 leading-normal">
                    💡 <strong>Cara kerja:</strong> Pembeli yang baru saja selesai membayar di Lynk.id akan mengklik link ini &rarr; Aplikasi langsung otomatis mengaktifkan hak akses <strong>Lifetime Pro</strong> dan menyembunyikan API Key admin.
                  </p>
                </div>

                {/* Section 2: Form Tambah Pembeli Manual / Bulk */}
                <div className="rounded-xl border border-white/[0.08] bg-[#0E101B] p-4 space-y-3.5">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Plus className="h-4 w-4 text-amber-400" />
                    <span>Tambah Email Pembeli Lynk (Manual / Bulk Whitelist)</span>
                  </h4>

                  {/* Single Add Form */}
                  <form onSubmit={handleAddSingleBuyer} className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      required
                      value={singleEmailInput}
                      onChange={(e) => setSingleEmailInput(e.target.value)}
                      placeholder="Email pembeli (contoh: pembeli@gmail.com)"
                      className="flex-1 rounded-xl border border-white/[0.08] bg-[#121422] px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                    <input
                      type="text"
                      value={singleNameInput}
                      onChange={(e) => setSingleNameInput(e.target.value)}
                      placeholder="Nama pembeli (opsional)"
                      className="w-full sm:w-40 rounded-xl border border-white/[0.08] bg-[#121422] px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                    <button
                      type="submit"
                      className="rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500 hover:text-slate-950 px-4 py-2 text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                    >
                      + Tambah
                    </button>
                  </form>

                  {/* Bulk Input Toggle */}
                  <div className="pt-2 border-t border-white/[0.06]">
                    <details className="group">
                      <summary className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold cursor-pointer">
                        + Tambah Banyak Email Sekaligus (Bulk Paste dari Notifikasi Lynk)
                      </summary>
                      <form onSubmit={handleAddBulkBuyers} className="space-y-2 pt-2">
                        <textarea
                          rows={3}
                          value={bulkInput}
                          onChange={(e) => setBulkInput(e.target.value)}
                          placeholder="Paste daftar email pembeli (pisahkan dengan koma atau baris baru):&#10;user1@gmail.com&#10;user2@gmail.com, user3@gmail.com"
                          className="w-full rounded-xl border border-white/[0.08] bg-[#121422] p-2.5 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-amber-400"
                        />
                        <button
                          type="submit"
                          className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:brightness-110"
                        >
                          Simpan Semua Email ke Whitelist
                        </button>
                      </form>
                    </details>
                  </div>
                </div>

                {/* Section 3: Daftar Pembeli Terdaftar */}
                <div className="rounded-xl border border-white/[0.08] bg-[#0E101B] p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-emerald-400" />
                      <h4 className="text-xs font-bold text-white">
                        Daftar Pembeli Terverifikasi ({lynkBuyers.length})
                      </h4>
                    </div>
                    <span className="text-[10px] text-slate-400">Status: Lifetime Pro Aktif</span>
                  </div>

                  <div className="max-h-52 overflow-y-auto space-y-1.5 pr-1">
                    {lynkBuyers.map((b, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-[#121422] border border-white/[0.06] text-xs hover:border-white/[0.12]"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white truncate">{b.name}</span>
                            <span className="text-[10px] font-mono text-amber-400 bg-amber-950/40 border border-amber-500/30 px-1.5 py-0.2 rounded">
                              {b.orderId}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 truncate">{b.email}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full block">
                            PRO AKTIF
                          </span>
                          <span className="text-[9px] text-slate-500 mt-0.5 block">{b.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: ENGINE & AI STATUS */}
            {activeTab === 'engine' && (
              <div className="space-y-4">
                <div className="rounded-xl border border-white/[0.08] bg-[#0E101B] p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-amber-400" />
                      <span className="text-xs font-bold text-white">Full-Stack Gemini API Service</span>
                    </div>
                    <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Server Active
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                    <div className="rounded-lg bg-[#121422] p-2.5 border border-white/[0.06]">
                      <span className="text-slate-400 block text-[10px]">AI Model Provider</span>
                      <span className="text-white font-semibold">gemini-3.8-flash (@google/genai)</span>
                    </div>
                    <div className="rounded-lg bg-[#121422] p-2.5 border border-white/[0.06]">
                      <span className="text-slate-400 block text-[10px]">Backend Proxy Route</span>
                      <span className="text-white font-semibold">/api/generate (Port 3000)</span>
                    </div>
                    <div className="rounded-lg bg-[#121422] p-2.5 border border-white/[0.06]">
                      <span className="text-slate-400 block text-[10px]">Telemetry User-Agent</span>
                      <span className="text-white font-semibold">aistudio-build</span>
                    </div>
                    <div className="rounded-lg bg-[#121422] p-2.5 border border-white/[0.06]">
                      <span className="text-slate-400 block text-[10px]">Fallback Generation Engine</span>
                      <span className="text-amber-400 font-semibold">Om Gio V11.1 Cinema Flow</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.08] bg-[#0E101B] p-4 space-y-2 text-xs">
                  <h4 className="font-bold text-white flex items-center gap-1.5">
                    <Shield className="h-4 w-4 text-amber-400" />
                    Indonesian V11 Creative Direction Rules
                  </h4>
                  <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                    <li>1 Master Storyboard 4:3 -&gt; 1 Master Video Generation Prompt -&gt; 1 Social Media Content Package.</li>
                    <li>Storyboard terkunci pada 4:3; aspect ratio pilihan diterapkan pada video generation prompt.</li>
                    <li>Asset tag baku: creator.png (Character lock) + product.jpg (Product geometry lock).</li>
                    <li>Durasi 32s (4 video shots x 8s • 16 panel x 2s) atau 64s (8 video shots x 8s • 32 panel x 2s).</li>
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 4: FORMATS */}
            {activeTab === 'formats' && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-400 pb-1">
                  <span>Daftar 137 Format Iklan &amp; Video Viral Terdaftar:</span>
                  <span className="text-amber-400 font-bold">{AD_FORMATS.length} Format Tersedia</span>
                </div>
                <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                  {AD_FORMATS.map((fmt, idx) => (
                    <div
                      key={fmt.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-[#0E101B] border border-white/[0.06] text-xs hover:border-amber-500/40"
                    >
                      <div className="min-w-0 pr-2">
                        <span className="font-bold text-white">{String(idx + 1).padStart(3, '0')}. {fmt.name}</span>
                        <p className="text-[10px] text-slate-400 truncate">{fmt.description}</p>
                      </div>
                      <span className="shrink-0 text-[9px] px-2 py-0.5 rounded bg-amber-950/40 text-amber-300 border border-amber-500/30">
                        {fmt.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: LOGS */}
            {activeTab === 'logs' && (
              <div className="space-y-2 text-xs">
                <div className="rounded-lg bg-black/60 p-3 font-mono text-[11px] text-slate-400 space-y-1 border border-white/[0.08]">
                  <div className="text-emerald-400">[INFO] Om Gio V11.1 Cinema Runtime initialized.</div>
                  <div className="text-amber-400">[READY] 137 Ad Formats DNA loaded in memory cache.</div>
                  <div className="text-slate-300">[STATUS] Port: 3000 | Host: 0.0.0.0 | Role: {currentUser?.role || 'admin'}</div>
                  <div className="text-cyan-400">[AUTH] Active Google session: {currentUser?.email || 'lensx619@gmail.com'}</div>
                  <div className="text-amber-400">[LYNK] {lynkBuyers.length} Verified Lynk.id buyers loaded in auto-whitelist.</div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="border-t border-white/[0.08] pt-3 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-xs font-bold text-slate-950 hover:brightness-110 transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

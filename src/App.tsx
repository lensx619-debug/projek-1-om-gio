import React, { useState, useRef, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ConceptBuilder } from './components/ConceptBuilder';
import { OutputPreview } from './components/OutputPreview';
import { LifetimeProModal } from './components/LifetimeProModal';
import { AdminModal } from './components/AdminModal';
import { FormatPickerModal } from './components/FormatPickerModal';
import { CreativeToolModal } from './components/CreativeToolModal';
import { AICursorGuide, AICursorGuideHandle } from './components/AICursorGuide';
import { BottomNavDock } from './components/BottomNavDock';
import { GoogleAuthModal } from './components/GoogleAuthModal';
import { Mode, Engine, Duration, AspectRatio, AdFormat, PresetData, GenerationOutput, UserProfile } from './types';
import { AD_FORMATS } from './data/adFormats';
import { PRESETS } from './data/presets';
import { generateCreativePackage } from './services/aiGenerator';
import { addLynkBuyer } from './services/lynkService';
import { Sliders, FileCheck, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [collapsedSidebar, setCollapsedSidebar] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState<'concept' | 'output'>('concept');
  const [activeSection, setActiveSection] = useState('overview');
  const cursorGuideRef = useRef<AICursorGuideHandle | null>(null);

  // User and Google Auth state
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('omgio_google_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    // Default to Admin lensx619@gmail.com
    return {
      name: 'Admin Om Gio (Owner)',
      email: 'lensx619@gmail.com',
      avatar: '',
      role: 'admin',
      plan: 'Lifetime Pro',
    };
  });
  const [isGoogleAuthOpen, setIsGoogleAuthOpen] = useState(false);

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    localStorage.setItem('omgio_google_user', JSON.stringify(user));
    if (user.role === 'pembeli') {
      setIsAdminOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('omgio_google_user');
    const guestUser: UserProfile = {
      name: 'Pembeli (Tamu)',
      email: 'pembeli@gmail.com',
      role: 'pembeli',
      plan: 'Lifetime Pro',
    };
    setCurrentUser(guestUser);
    setIsAdminOpen(false);
  };

  const [lynkWelcomeToast, setLynkWelcomeToast] = useState<string | null>(null);

  // Auto-detect Lynk.id Buyer Query Parameters upon landing (?lynk_access=active, ?email=..., ?ref=lynk)
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const isLynkAccess =
        urlParams.get('lynk_access') === 'active' ||
        urlParams.get('ref') === 'lynk' ||
        urlParams.has('order');
      const queryEmail = urlParams.get('email');
      const queryOrder = urlParams.get('order');

      if (isLynkAccess || queryEmail) {
        const buyerEmail = queryEmail ? queryEmail.trim().toLowerCase() : 'pembeli.lynk@gmail.com';
        const orderId = queryOrder || `LYNK-${Math.floor(100000 + Math.random() * 900000)}`;
        const buyerName = buyerEmail.split('@')[0];

        // Register buyer to whitelist
        addLynkBuyer(buyerEmail, buyerName, orderId);

        const buyerUser: UserProfile = {
          name: buyerName,
          email: buyerEmail,
          role: 'pembeli',
          plan: 'Lifetime Pro',
          orderId: orderId,
          activatedVia: 'lynk',
          activatedAt: new Date().toISOString(),
        };

        setCurrentUser(buyerUser);
        localStorage.setItem('omgio_google_user', JSON.stringify(buyerUser));
        setIsAdminOpen(false);

        setLynkWelcomeToast(
          `🎉 Pembayaran Lynk.id Terverifikasi! Akun Google (${buyerEmail}) telah aktif dengan akses LIFETIME PRO otomatis.`
        );
        setTimeout(() => setLynkWelcomeToast(null), 7000);

        // Clean up URL query parameters so the browser bar remains clean
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    } catch (e) {
      console.error('Lynk param parse error:', e);
    }
  }, []);

  // Modals state
  const [isLifetimeProOpen, setIsLifetimeProOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isFormatPickerOpen, setIsFormatPickerOpen] = useState(false);
  const [activeCreativeTool, setActiveCreativeTool] = useState<
    'hook' | 'product' | 'character' | 'storyboard' | 'videoPackage' | null
  >(null);

  // Concept configuration state
  const [mode, setMode] = useState<Mode>('iklan');
  const [formatId, setFormatId] = useState<string>('product-demo');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('9:16');
  const [engine, setEngine] = useState<Engine>('omni11flash');
  const [duration, setDuration] = useState<Duration>('32s');
  const [targetAudience, setTargetAudience] = useState('');
  const [brief, setBrief] = useState('');
  const [productName, setProductName] = useState('');
  const [productImages, setProductImages] = useState<{ name: string; url: string }[]>([]);
  const [characters, setCharacters] = useState<{ name: string; role: string; url: string; lockedOutfit: string }[]>([]);

  // Generation Output state
  const [output, setOutput] = useState<GenerationOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Apply Preset with direct single-click flyTo cursor guidance
  const handleApplyPreset = (preset: PresetData) => {
    setActiveMobileTab('concept');
    setMode(preset.mode);
    setFormatId(preset.formatId);
    setAspectRatio(preset.aspectRatio);
    setEngine(preset.engine);
    setDuration(preset.duration);
    setTargetAudience(preset.targetAudience);
    setBrief(preset.brief);
    setProductName(preset.productName);
    setProductImages(preset.productImages);
    setCharacters([preset.character]);

    // Langsung arahkan viewport ke tombol Generate Package Prompt
    cursorGuideRef.current?.flyTo(
      `preset-${preset.id}`,
      'btn-generate-package-prompt',
      'Arah: Generate Paket Konsep'
    );
  };

  // Generate Creative Package
  const handleGenerate = async () => {
    setIsGenerating(true);
    // Di HP & Tablet, langsung alihkan tampilan ke tab hasil output
    setActiveMobileTab('output');
    try {
      const selectedFormat = AD_FORMATS.find((f) => f.id === formatId) || AD_FORMATS[0];

      // Langsung arahkan viewport ke Kotak 01 Master Storyboard
      cursorGuideRef.current?.flyTo(
        'btn-generate-package-prompt',
        'box-master-storyboard',
        'Arah: Kotak 01 Master Storyboard'
      );

      const res = await generateCreativePackage({
        mode,
        formatId,
        aspectRatio,
        engine,
        duration,
        targetAudience,
        brief,
        productName: productName || (mode === 'iklan' ? 'Produk Unggulan' : 'Topik Konten'),
        productImages,
        characters: characters.length > 0 ? characters : [
          {
            name: 'Sarah Amanda',
            role: 'UGC Content Creator',
            url: '',
            lockedOutfit: 'Modern Minimalist Apparel'
          }
        ],
      });

      setOutput(res);
    } catch (err) {
      console.error('Error during generation:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Reset
  const handleReset = () => {
    setMode('iklan');
    setFormatId('product-demo');
    setAspectRatio('9:16');
    setEngine('omni11flash');
    setDuration('32s');
    setTargetAudience('');
    setBrief('');
    setProductName('');
    setProductImages([]);
    setCharacters([]);
    setOutput(null);
    setActiveMobileTab('concept');
  };

  // Copy All Outputs
  const handleCopyAll = () => {
    if (!output) {
      return;
    }
    const fullText = `======================================================================
OM GIO CREATIVE DIRECTOR — PACKAGE PROMPT EXPORT
======================================================================
Mode: ${output.adFormatName} | Durasi: ${output.duration} | Ratio: ${output.aspectRatio} | Engine: ${output.engine}
Target Audience: ${targetAudience || 'Umum'}

----------------------------------------------------------------------
01 • MASTER STORYBOARD PROMPT (4:3)
----------------------------------------------------------------------
${output.storyboardPrompt}

----------------------------------------------------------------------
02 • MASTER VIDEO GENERATION PROMPT (${output.duration})
----------------------------------------------------------------------
${output.videoGenerationPrompt}

----------------------------------------------------------------------
03 • SOCIAL MEDIA DISTRIBUTION BLUEPRINT
----------------------------------------------------------------------
${output.socialPackage.map((p) => `[${p.platform.toUpperCase()}]\nHook: ${p.hook}\nCaption: ${p.caption}\nCTA: ${p.cta}\nHashtags: ${p.hashtags.join(' ')}`).join('\n\n')}
`;
    navigator.clipboard.writeText(fullText);
  };

  // Download Output as TXT file
  const handleDownloadTxt = () => {
    if (!output) return;
    const fullText = `OM GIO CREATIVE DIRECTOR — PACKAGE PROMPT EXPORT\n${output.storyboardPrompt}\n\n${output.videoGenerationPrompt}`;
    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `omgio_prompt_${productName.replace(/\s+/g, '_') || 'konsep'}_${duration}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const selectedFormatObj = AD_FORMATS.find((f) => f.id === formatId) || AD_FORMATS[0];

  return (
    <div className="flex min-h-screen bg-[#08090D] text-slate-100 antialiased font-sans">
      {/* Navigation Sidebar (Desktop permanent & Mobile drawer) */}
      <Sidebar
        collapsed={collapsedSidebar}
        onToggleCollapse={() => setCollapsedSidebar(!collapsedSidebar)}
        activeSection={activeSection}
        onSelectSection={(sec) => {
          setActiveSection(sec);
          if (sec === 'output') {
            setActiveMobileTab('output');
          } else {
            setActiveMobileTab('concept');
          }
          if (cursorGuideRef.current) {
            const mapping: Record<string, { target: string; label: string }> = {
              overview: { target: 'step-ai-vision', label: 'Arah: Overview Pipeline' },
              references: { target: 'dropzone-product', label: 'Arah: References Dropzone' },
              'creative-direction': { target: 'jenis-iklan-selector', label: 'Arah: Creative Direction & Format' },
              'creative-tools': { target: 'tool-hook', label: 'Arah: Creative Tools V11' },
              production: { target: 'duration-32s-btn', label: 'Arah: Durasi Produksi' },
              output: { target: 'box-master-storyboard', label: 'Arah: Live Output Preview' },
            };
            if (mapping[sec]) {
              cursorGuideRef.current.flyTo(
                { x: 120, y: window.innerHeight / 2 },
                mapping[sec].target,
                mapping[sec].label
              );
            }
          }
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenLifetimePro={() => setIsLifetimeProOpen(true)}
        currentUser={currentUser}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <Header
          currentUser={currentUser}
          onOpenAuth={() => setIsGoogleAuthOpen(true)}
          onOpenAdmin={() => setIsAdminOpen(true)}
          onOpenLifetimePro={() => setIsLifetimeProOpen(true)}
          onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
        />

        {/* Workspace Body */}
        <main className="flex-1 p-3 sm:p-5 lg:p-6 pb-36 space-y-4 sm:space-y-6 max-w-7xl mx-auto w-full">
          {/* Mobile & Tablet Segmented Tab Switcher (Visible on < xl screens) */}
          <div className="xl:hidden flex items-center p-1 rounded-2xl bg-[#0F111A]/95 border border-white/[0.08] backdrop-blur-md shadow-md sticky top-0 z-20">
            <button
              onClick={() => setActiveMobileTab('concept')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeMobileTab === 'concept'
                  ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-black shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sliders className="h-4 w-4" />
              <span>1. Form Konsep &amp; Aset</span>
            </button>

            <button
              onClick={() => setActiveMobileTab('output')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer relative ${
                activeMobileTab === 'output'
                  ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-black shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileCheck className="h-4 w-4" />
              <span>2. Hasil Storyboard &amp; Prompt</span>
              {output && (
                <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping absolute top-2 right-3" />
              )}
            </button>
          </div>

          {/* Grid Layout: Side-by-Side on Desktop, Tabbed on Mobile/Tablet */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
            {/* 01 Build your concept (Left Column) */}
            <div className={activeMobileTab === 'concept' ? 'block' : 'hidden xl:block'}>
              <ConceptBuilder
                mode={mode}
                setMode={setMode}
                formatId={formatId}
                setFormatId={setFormatId}
                onOpenFormatPicker={() => setIsFormatPickerOpen(true)}
                aspectRatio={aspectRatio}
                setAspectRatio={setAspectRatio}
                engine={engine}
                setEngine={setEngine}
                duration={duration}
                setDuration={setDuration}
                targetAudience={targetAudience}
                setTargetAudience={setTargetAudience}
                brief={brief}
                setBrief={setBrief}
                productName={productName}
                setProductName={setProductName}
                productImages={productImages}
                setProductImages={setProductImages}
                characters={characters}
                setCharacters={setCharacters}
                onApplyPreset={handleApplyPreset}
                onOpenTool={(tool) => {
                  setActiveCreativeTool(tool);
                  cursorGuideRef.current?.flyTo(
                    `tool-${tool}`,
                    `tool-${tool}`,
                    `Arah: Membuka ${tool.toUpperCase()}`
                  );
                }}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
                onReset={handleReset}
                onCopyAll={handleCopyAll}
                onDownloadTxt={handleDownloadTxt}
                onGuideCursorTo={(fromIdOrCoord, targetId, label) => {
                  cursorGuideRef.current?.flyTo(fromIdOrCoord, targetId, label);
                }}
              />
            </div>

            {/* 02 Live Output Preview (Right Column) */}
            <div className={activeMobileTab === 'output' ? 'block' : 'hidden xl:block'}>
              <OutputPreview
                output={output}
                isGenerating={isGenerating}
                duration={duration}
                engine={engine}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Lynk.id Auto-Activation Welcome Notification */}
      {lynkWelcomeToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-lg rounded-2xl border border-amber-500/50 bg-[#0E101B]/95 p-4 text-xs text-amber-200 shadow-2xl backdrop-blur-xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <p className="font-semibold leading-relaxed">{lynkWelcomeToast}</p>
          </div>
          <button
            onClick={() => setLynkWelcomeToast(null)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08]"
          >
            ✕
          </button>
        </div>
      )}

      {/* Modals */}
      <GoogleAuthModal
        isOpen={isGoogleAuthOpen}
        onClose={() => setIsGoogleAuthOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      <LifetimeProModal
        isOpen={isLifetimeProOpen}
        onClose={() => setIsLifetimeProOpen(false)}
        currentUser={currentUser}
        onOpenAuth={() => setIsGoogleAuthOpen(true)}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        currentUser={currentUser}
      />

      <FormatPickerModal
        isOpen={isFormatPickerOpen}
        onClose={() => setIsFormatPickerOpen(false)}
        selectedFormatId={formatId}
        onSelectFormat={(fmt) => {
          setFormatId(fmt.id);
          setIsFormatPickerOpen(false);
          cursorGuideRef.current?.flyTo(
            'jenis-iklan-selector',
            'btn-generate-package-prompt',
            'Arah: Format terpilih, siap generate'
          );
        }}
      />

      <CreativeToolModal
        toolType={activeCreativeTool}
        onClose={() => setActiveCreativeTool(null)}
        productName={productName || 'Produk Unggulan'}
        creatorName={characters[0]?.name || 'Sarah Amanda'}
        brief={brief}
        onApplyBriefSnippet={(snippet) => setBrief((prev) => (prev ? prev + snippet : snippet.trim()))}
      />

      {/* Tatakan Menu Navigasi Nyaman (Bottom Dock) */}
      <BottomNavDock
        activeSection={activeSection}
        onSelectSection={(sec) => {
          setActiveSection(sec);
          if (sec === 'output') {
            setActiveMobileTab('output');
          } else {
            setActiveMobileTab('concept');
          }
          const mapping: Record<string, { target: string; label: string }> = {
            overview: { target: 'step-ai-vision', label: 'Arah: Overview Pipeline' },
            references: { target: 'dropzone-product', label: 'Arah: References Dropzone' },
            'creative-direction': { target: 'jenis-iklan-selector', label: 'Arah: Creative Direction & Format' },
            'creative-tools': { target: 'tool-hook', label: 'Arah: Creative Tools V11' },
            production: { target: 'duration-32s-btn', label: 'Arah: Durasi Produksi' },
            output: { target: 'box-master-storyboard', label: 'Arah: Live Output Preview' },
          };
          if (mapping[sec] && cursorGuideRef.current) {
            cursorGuideRef.current.flyTo(
              { x: window.innerWidth / 2, y: window.innerHeight - 60 },
              mapping[sec].target,
              mapping[sec].label
            );
          }
        }}
        duration={duration}
        setDuration={setDuration}
        mode={mode}
        setMode={setMode}
        onOpenFormatPicker={() => setIsFormatPickerOpen(true)}
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
        onApplyPreset={handleApplyPreset}
        hasOutput={!!output}
        onCopyAll={handleCopyAll}
        onDownloadTxt={handleDownloadTxt}
        onOpenTool={(tool) => {
          setActiveCreativeTool(tool);
          cursorGuideRef.current?.flyTo(
            { x: window.innerWidth / 2, y: window.innerHeight - 60 },
            `tool-${tool}`,
            `Arah: Membuka ${tool.toUpperCase()}`
          );
        }}
      />

      {/* Interactive AI Cursor Guide (Single-Shot Directional Navigation) */}
      <AICursorGuide
        onRegisterHandle={(handle) => {
          cursorGuideRef.current = handle;
        }}
      />
    </div>
  );
}

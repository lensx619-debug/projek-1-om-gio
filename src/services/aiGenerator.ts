import { GenerateParams, GenerationOutput, SocialPlatformPost } from '../types';
import { AD_FORMATS } from '../data/adFormats';

export async function generateCreativePackage(params: GenerateParams): Promise<GenerationOutput> {
  // Simulate professional studio AI inference
  await new Promise((resolve) => setTimeout(resolve, 1400));

  const format = AD_FORMATS.find((f) => f.id === params.formatId) || AD_FORMATS[0];
  const is32s = params.duration === '32s';
  const totalShots = is32s ? 4 : 8;
  const totalPanels = is32s ? 16 : 32;

  const product = params.productName || (params.mode === 'iklan' ? 'Ultra-Luxe Signature Product' : 'Executive Cinema Showcase');
  const creator = params.characters[0] || {
    name: 'Sarah Amanda',
    role: 'Executive Brand Ambassador & UGC Specialist',
    url: '',
    lockedOutfit: 'Tailored Minimalist Cashmere & Linen Ensemble'
  };

  const audience = params.targetAudience || 'Modern discerning consumers, aesthetic lifestyle enthusiasts, high-intent shoppers (Ages 22-45)';
  const customBrief = params.brief || (params.mode === 'iklan'
    ? 'Commercial campaign demonstrating effortless product superiority, high-sensory tactile proof, and compelling conversion appeal.'
    : 'High-engagement cinematic storytelling with emotional resonance, relatable dilemma, and authoritative brand payoff.');

  const storyboardPrompt = buildStoryboardPrompt({
    format,
    is32s,
    totalShots,
    totalPanels,
    product,
    creator,
    audience,
    customBrief,
    engine: params.engine,
    aspectRatio: params.aspectRatio,
    mode: params.mode
  });

  const videoPrompt = buildVideoPrompt({
    format,
    is32s,
    totalShots,
    product,
    creator,
    audience,
    customBrief,
    engine: params.engine,
    aspectRatio: params.aspectRatio,
    mode: params.mode
  });

  const socialPackage = buildSocialPackage({
    product,
    creator,
    audience,
    format
  });

  return {
    id: `og-gen-${Date.now()}`,
    createdAt: new Date().toISOString(),
    storyboardPrompt,
    videoGenerationPrompt: videoPrompt,
    socialPackage,
    rawBrief: customBrief,
    productSummary: product,
    characterSummary: `${creator.name} (${creator.role})`,
    adFormatName: format.name,
    duration: params.duration,
    aspectRatio: params.aspectRatio,
    engine: params.engine,
  };
}

function buildStoryboardPrompt(ctx: any): string {
  const { format, is32s, product, creator, audience, customBrief, engine, mode } = ctx;

  const shotsList: string[] = [];

  const shotThemes = is32s ? [
    { title: 'THE HIGH-IMPACT HOOK & PATTERN INTERRUPT', start: '00:00', end: '00:08', focus: 'Scroll-stopping visual intrigue, magnetic gaze, immediate luxury product silhouette.' },
    { title: 'THE SENSORY DEMO & MACRO VISUAL PROOF', start: '00:08', end: '00:16', focus: 'Macro texture glide, refractive clarity, visceral tactile benefit.' },
    { title: 'THE TRANSFORMATION & AUTHENTIC PAYOFF', start: '00:16', end: '00:24', focus: 'Side-by-side efficacy proof, glowing satisfaction, genuine approval.' },
    { title: 'THE HERO PACKSHOT & COMPELLING CALL TO ACTION', start: '00:24', end: '00:32', focus: 'Golden-hour commercial hero packshot, warm invitation, clear conversion path.' }
  ] : [
    { title: 'THE HIGH-IMPACT HOOK & PATTERN INTERRUPT', start: '00:00', end: '00:08', focus: 'Immediate visual arrest, dynamic anamorphic flare, intense curiosity hook.' },
    { title: 'THE RELATABLE DILEMMA & FRUSTRATION', start: '00:08', end: '00:16', focus: 'Authentic consumer pain point, natural environmental atmosphere.' },
    { title: 'THE LUXURY PRODUCT REVELATION', start: '00:16', end: '00:24', focus: 'Anamorphic light sweep revealing pristine geometry and embossed branding.' },
    { title: 'THE MACRO TEXTURE & INGREDIENT MASTERY', start: '00:24', end: '00:32', focus: 'High-speed 120fps macro fluid dynamics, refractive viscosity test.' },
    { title: 'THE REAL-WORLD USAGE STRESS TEST', start: '00:32', end: '00:40', focus: 'Seamless integration into aspirational daily routine, outfit consistency.' },
    { title: 'THE VISIBLE RESULT & RADIANCE PAYOFF', start: '00:40', end: '00:48', focus: 'Immediate tactile delight, authentic skin micro-texture glow.' },
    { title: 'THE SOCIAL PROOF & CULTURAL RESONANCE', start: '00:48', end: '00:56', focus: 'Aspirational lifestyle validation, organic community consensus.' },
    { title: 'THE FINAL CONVERSION & EXCLUSIVE OFFER', start: '00:56', end: '01:04', focus: 'Hero product pedestal shot, elegant typography, compelling CTA urgency.' }
  ];

  let panelCounter = 1;
  shotThemes.forEach((st, idx) => {
    const shotNum = String(idx + 1).padStart(2, '0');
    shotsList.push(`
=== SHOT ${shotNum} [${st.start} - ${st.end}] — ${st.title} ===
Camera Package: ARRI ALEXA 35 Cinema Sensor, Cooke Anamorphic/i Full Frame Plus 35mm T1.4, 24fps.
Cinematography Tone: Masterclass Commercial Chiaroscuro • Kodak Vision3 500T 5219 Emulation.
Subject Lock: ${mode === 'iklan' ? `creator.png (${creator.name} • Locked Identity) + product.jpg (${product} • Geometric Lock)` : `creator_01.png (${creator.name} • Role Lock)`}
Core Objective: ${st.focus}

[PANEL ${String(panelCounter++).padStart(2, '0')} | 0.0s - 2.0s]
• Visual Action: ${idx === 0 ? `Magnetic opening framing. @creator.png holds @product.jpg at upper chest level, looking straight down the lens with an arresting, authentic expression. Gentle anamorphic horizontal streak catches the product edge.` : `Fluid visual transition from preceding beat. @creator.png gestures toward @product.jpg amidst an elegant, warm-toned architectural interior.`}
• Lighting & Mood: Soft Rembrandt key light through 12x12 diffused silk, 3200K warm rim light separating hair from soft matte dark background.
• Sound & Audio Master: Deep sub-bass cinematic pulse, subtle tactile ASMR foley, crisp broadcast vocal presence.
• Typography Overlay: "${idx === 0 ? 'Tunggu, ini yang selama ini kamu cari.' : 'Terbukti secara klinis dan nyata.'}" (Minimalist Serif / Clean Sans)

[PANEL ${String(panelCounter++).padStart(2, '0')} | 2.0s - 4.0s]
• Visual Action: Macro probe sweep over ${product}. Extreme high-definition focus on physical texture, embossed foil logo, and premium packaging finish with zero digital distortion.
• Lighting & Mood: Precision micro-spotlight with dual rim highlights accentuating curves and liquid viscosity.
• Sound & Audio Master: Visceral tactile foley (satisfying click / silky viscous pour), warm analog synth pad.
• Typography Overlay: "Kemurnian Formula & Kualitas Tanpa Kompromi"

[PANEL ${String(panelCounter++).padStart(2, '0')} | 4.0s - 6.0s]
• Visual Action: Intimate close-up of ${creator.name} interacting with ${product}. Genuine micro-expression of delighted confidence, flawless skin texture with natural pore fidelity.
• Lighting & Mood: Golden-hour window light simulation, shallow depth-of-field (f/1.8), organic bokeh circles.
• Sound & Audio Master: Gentle harmonic acoustic swell, clear authoritative voiceover delivery.
• Typography Overlay: "Hasil Tampak Nyata Sejak Pemakaian Pertama"

[PANEL ${String(panelCounter++).padStart(2, '0')} | 6.0s - 8.0s]
• Visual Action: Smooth Ronin 4D gimbal push-in settling on hero product pedestal. Floating micro-droplets catch ambient amber light. Seamless motion bridge to next beat.
• Lighting & Mood: Warm champagne backlight with soft contrast fill.
• Sound & Audio Master: Uplifting orchestral riser leading into next cinematic beat.
• Typography Overlay: "${idx === shotThemes.length - 1 ? 'Miliki Sekarang • Klik Keranjang Kuning / Bio' : 'Lanjut ke pembuktian nyata...'}"`);
  });

  return `[OM GIO CREATIVE DIRECTOR — EXECUTIVE CINEMA MASTER STORYBOARD PROMPT]
VERSION: V11.1 • Enterprise Role Lock • Commercial Cinema Masterclass
TARGET ENGINE: ${engine === 'allgenerator' ? 'All Generator Video (Veo 3 Lite, Kling 1.5, HeyGen, Sora, Seedance)' : 'Omni 1.1 Flash Engine (Multimodal Cinema Flow)'}
MODE: ${mode === 'iklan' ? 'Mode Iklan Komersial (High-Conversion DNA + Product Reference Lock)' : 'Mode Konten Organik (Authentic Storytelling + Creator Persona Lock)'}
AD FORMAT: ${format.name} (${format.category})
STORYBOARD ASPECT RATIO: 4:3 (Grid Visual Reference Standard)
TOTAL RUNTIME: ${is32s ? '32 Detik (4 Connected Cinema Shots x 8s • 16 Panel Storyboard x 2s)' : '64 Detik (8 Connected Cinema Shots x 8s • 32 Panel Storyboard x 2s)'}
TARGET AUDIENCE: ${audience}

CINEMATOGRAPHY DIRECTIVES:
• Camera System: ARRI ALEXA 35 / ARRI ALEXA Mini LF, Master Anamorphic T1.4 Prime Optics.
• Color Grading Profile: Kodak Vision3 500T (5219) Color Science, ACEScc pipeline, rich obsidian shadows, warm champagne mid-tones, organic film halation.
• Lighting Atmosphere: Chiaroscuro commercial elegance, 12x12 diffused silk key, 3200K tungsten hair light.
• Audio Mastering: 24-bit 96kHz spatial sound, broadcast LUFS -14, bespoke cinematic ambient score + tactile ASMR foley.

REFERENCE ASSET INTEGRATION:
• Product Asset Lock: product.jpg -> [${product}] (Exact geometry, typography, and reflections locked).
• Character Persona Lock: creator.png -> [${creator.name} | Role: ${creator.role} | Wardrobe: ${creator.lockedOutfit || 'Sophisticated minimalist cashmere/linen apparel'}].

CREATIVE BRIEF & CORE OBJECTIVE:
${customBrief}

----------------------------------------------------------------------
SCENE BLUEPRINT (BEAT-BY-BEAT 4:3 STORYBOARD PANELS):
----------------------------------------------------------------------
${shotsList.join('\n')}

----------------------------------------------------------------------
STORYBOARD CONTINUITY & PRODUCTION DIRECTIVES:
• Identity Continuity Rule: Wajah, gaya rambut, dan busana @creator.png terkunci 100% konsisten di seluruh shot tanpa pergeseran fitur wajah atau distorsi anatomi.
• Object Geometry Rule: Proporsi, logo tipografi, dan pantulan material @product.jpg wajib 1:1 identik dengan aset product.jpg.
• Aspect Ratio Blueprint: Format 4:3 memberikan panduan visual multi-panel beresolusi tinggi, siap dimasukkan langsung ke video generator target.`;
}

function buildVideoPrompt(ctx: any): string {
  const { format, is32s, product, creator, audience, customBrief, engine, aspectRatio } = ctx;

  return `// ======================================================================
// OM GIO CREATIVE DIRECTOR — MASTER VIDEO GENERATION PROMPT
// RUNTIME: ${is32s ? '32 SECONDS (4 CONNECTED 8-SECOND SHOTS)' : '64 SECONDS (8 CONNECTED 8-SECOND SHOTS)'}
// ENGINE: ${engine === 'allgenerator' ? 'ALL GENERATOR VIDEO (Veo 3 Lite, Kling AI 1.5, HeyGen, Seedance, Sora)' : 'OMNI 1.1 FLASH ENGINE (Multimodal Cinema Flow)'}
// ASPECT RATIO: ${aspectRatio}
// WORKFLOW: Zero-Approval Direct Cinema Generation (Full Continuity Lock)
// ======================================================================

[CAMERA & CINEMATOGRAPHY SPECS]
Camera Package: ARRI ALEXA 35, Cooke Anamorphic/i Full Frame Plus Prime Lenses (35mm, 50mm, 85mm T1.4 Macro).
Color Pipeline: Kodak Vision3 500T 5219 Emulation, ACEScc color science, natural skin tone reproduction with authentic subsurface scattering (SSS), zero digital clipping, organic 8K film halation.
Lighting Scheme: High-end luxury commercial chiaroscuro, 12x12 diffused muslin key light, 3200K warm rim backlighting, subtle volumetric atmospheric particles.
Sound Design: 24-bit 96kHz spatial stereo mix, broadcast LUFS -14, bespoke cinematic orchestral score blended with tactile ASMR foley (viscous droplets, crisp glass resonance, tactile fabric rustle), pristine studio condenser microphone (Neumann U87) vocal capture.

[ASSET REGISTRATION & IDENTITY LOCK]
--asset-1: creator.png [FACE LOCK: ${creator.name}, Indonesian authentic presenter with natural beauty, hair neatly styled, wearing ${creator.lockedOutfit || 'tailored minimalist luxury attire'}. Zero facial distortion, natural skin pore micro-texture, expressive photorealistic micro-glances]
--asset-2: product.jpg [OBJECT LOCK: ${product}, exact packaging geometry, exact logo typography, luxury material finish, realistic refraction, zero brand hallucination]

[CREATIVE DIRECTION & HOOK DNA]
Format Style: ${format.name}
Target Demographic: ${audience}
Core Narrative: ${customBrief}

[EXECUTIVE VIDEO EXECUTION TIMELINE — CONNECTED 8-SECOND BLOCKS]

SHOT 01 (00:00 - 00:08) — [THE MAGNETIC OPENING HOOK]:
• Shot Framing: Medium close-up (MCU), 35mm anamorphic prime lens, f/1.8 aperture.
• Action: @creator.png holds @product.jpg at chest height with natural elegance, making direct, magnetic eye contact with the viewer. A subtle horizontal anamorphic lens flare glides across the product cap. Creator speaks with relaxed conviction and captivating warmth.
• Camera Motion: Subtle handheld organic breathing motion, 24fps cinema cadence, smooth slow micro-push inward.
• Lighting: 4500K soft key light with warm 3200K tungsten rim light kissing hair and shoulders.
• Indonesian Dialogue / VO: "Jujur, kalian harus lihat ini. Kalau kalian mencari solusi terbaik yang beneran terasa bedanya dari hari pertama, ini jawabannya."
• Audio & SFX: Elegant atmospheric whoosh, soft ASMR tactile snap, broadcast-clarity vocal presence.

SHOT 02 (00:08 - 00:16) — [THE MACRO SENSORY PROOF]:
• Shot Framing: Extreme macro probe lens sweep (90mm macro, f/2.8).
• Action: High-speed 60fps slowed to 24fps commercial macro demonstration of @product.jpg. Ultra-crisp capture of physical texture, refractive viscosity, premium packaging finish, and effortless application.
• Camera Motion: Precision motorized slider glide from right to left, perfectly tracking the tactile interaction.
• Lighting: High-contrast commercial rim lighting accentuating crystal-clear droplets and metallic sheen.
• Indonesian Dialogue / VO: "Lihat teksturnya, formulanya langsung menyerap sempurna tanpa rasa lengket sama sekali. Rasanya beneran mewah di kulit."
• Audio & SFX: Visceral ASMR droplet resonance, deep cinematic sub-bass pulse, delicate chime.

SHOT 03 (00:16 - 00:24) — [THE TRANSFORMATION & DELIGHT]:
• Shot Framing: Medium profile turning into dynamic over-the-shoulder perspective.
• Action: @creator.png demonstrates the immediate visual payoff of @product.jpg. Genuine beaming smile of satisfaction, admiring the real-time result in a vanity mirror. Authentic glowing skin micro-texture.
• Camera Motion: Smooth Ronin 4D gimbal orbital arc, transitioning gracefully around the subject.
• Lighting: Golden hour afternoon sunlight streaming through sheer curtains, soft natural bokeh highlights.
• Indonesian Dialogue / VO: "Hasilnya kelihatan langsung se-fresh ini. Ga heran kalau ini selalu habis dan jadi rekomendasi nomor satu."
• Audio & SFX: Uplifting ambient orchestral strings swell, subtle warm room tone.

SHOT 04 (00:24 - 00:32) — [THE HERO PACKSHOT & CALL TO ACTION]:
• Shot Framing: Hero packshot centered, @creator.png in soft background focus gesturing warmly toward conversion zone.
• Action: @product.jpg stands on a minimalist textured stone pedestal with warm amber rim light. @creator.png gives an approving nod and warm smile. Floating clean end-card text overlay seamlessly integrated.
• Camera Motion: Slow cinematic pedestal elevation shot with gentle forward push.
• Lighting: Warm champagne spotlight with deep obsidian negative fill.
• Indonesian Dialogue / VO: "Jangan tunggu kehabisan promo spesialnya. Yuk langsung checkout sekarang lewat keranjang kuning di bawah!"
• Audio & SFX: Confident harmonic final chord resolution, subtle notification confirmation chime.

[GLOBAL RENDER DIRECTIVES & NEGATIVE PROMPT]
Resolution: 4K UHD Master (3840x2160 / 2160x3840)
Frame Rate: 24.000 fps True Cinema Cadence
Color Master: ACEScc Cinema Master Grade • Kodak Vision3 500T Look
Negative Prompt: low quality, blurry, deformed hands, extra fingers, cartoonish, warped text, bad anatomy, inconsistent face, floating bottles, cheap plastic CGI, generic stock video, flickering artifacts, overexposed highlights, plastic skin, video noise.`;
}

function buildSocialPackage(ctx: any): SocialPlatformPost[] {
  const { product, creator } = ctx;

  return [
    {
      platform: 'TikTok',
      hook: `🚨 BUKAN PROMOSI BIASA! Kalau kalian mau yang beneran ngasih hasil nyata tanpa ribet, kalian wajib simak ini sampai habis...`,
      caption: `Jujur ga nyangka ${product} bakal se-game changing ini! Kualitasnya beneran kelas atas dan perubahannya keliatan dari pertama kali coba 😭✨\n\nBuat kalian yang mau buktikan sendiri sebelum promonya selesai, buruan ya!\n\n👇 Klik keranjang kuning di kiri bawah sekarang mumpung stok masih ready!`,
      cta: 'Dapatkan Promo Spesial di Keranjang Kuning 🛒',
      hashtags: ['#RacunTikTok', '#ReviewJujur', '#ProductViral', '#KualitasMewah', '#TrendingFYP']
    },
    {
      platform: 'Instagram',
      hook: `The definition of pure elegance & real results. Ini alasan kenapa ${product} jadi holy grail baru aku! ✨`,
      caption: `Dari kemasannya yang mewah sampai formulasinya yang beneran efektif, ${product} beneran melampaui ekspektasi. Pemakaian teratur bikin perubahannya makin keliatan nyata.\n\nSwipe left untuk liat detail macro tekstur dan cara pakainya!\n\n🔗 Link pemesanan resmi langsung ada di bio profil kami.`,
      cta: 'Tap Link di Bio untuk Dapatkan Diskon Eksklusif 🔗',
      hashtags: ['#LuxuryEssentials', '#DailyRoutine', '#ReviewIndonesia', '#GlowUpRoutine', '#AestheticLiving']
    },
    {
      platform: 'Facebook',
      hook: `Rekomendasi Terbaik & Terpercaya: Solusi praktis dengan hasil optimal yang sudah terbukti nyata.`,
      caption: `Bagi Anda yang mengutamakan kualitas tinggi dan hasil yang terbukti, ${product} adalah pilihan yang tepat. Hadir dengan formulasi mutakhir dan standar keamanan terbaik.\n\nSimak video selengkapnya dan rasakan perbedaannya sendiri hari ini.`,
      cta: 'Kunjungi Website Resmi & Belanja Sekarang 🛒',
      hashtags: ['#RekomendasiTerbaik', '#ProdukUnggulan', '#SolusiPraktis', '#UlasanTerpercaya']
    }
  ];
}

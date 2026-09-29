import { PresetData } from '../types';

// Helper to create SVG data URLs for high quality visual placeholders
function createSvgDataUrl(bgGrad: string, iconSvg: string, text: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        ${bgGrad}
      </linearGradient>
    </defs>
    <rect width="600" height="600" rx="36" fill="url(#g)" />
    <g transform="translate(180, 150) scale(10)" stroke="#ffffff" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
      ${iconSvg}
    </g>
    <text x="300" y="450" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="700" fill="#ffffff" text-anchor="middle">${text}</text>
    <text x="300" y="490" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="rgba(255,255,255,0.7)" text-anchor="middle">Om Gio Creative Director Reference</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const PRESETS: PresetData[] = [
  {
    id: 'skincare-serum',
    name: 'Skincare Glow Serum',
    icon: '🧴',
    mode: 'iklan',
    formatId: 'product-demo',
    aspectRatio: '9:16',
    engine: 'omni11flash',
    duration: '32s',
    targetAudience: 'Wanita 20-35 tahun dengan masalah kulit kusam, dehidrasi, dan flek hitam perkotaan.',
    brief: 'Tampilkan efek glass-skin instan dari serum niacinamide 10% + hyaluronic acid. Tonjolkan tekstur tetesan serum bening kental yang meresap dalam 3 detik tanpa rasa lengket, diakhiri dengan pantulan glowing alami.',
    productName: 'AuraGlow Phyto-Barrier Serum 30ml',
    productImages: [
      {
        name: 'auraglow_bottle_front.jpg',
        url: createSvgDataUrl(
          '<stop offset="0%" stop-color="#ec4899"/><stop offset="100%" stop-color="#8b5cf6"/>',
          '<path d="M9 3h6v3H9z"/><path d="M10 6v3a4 4 0 0 1-4 4v7a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-7a4 4 0 0 1-4-4V6"/><circle cx="12" cy="16" r="1"/>',
          'AuraGlow Serum'
        )
      },
      {
        name: 'auraglow_dropper_macro.jpg',
        url: createSvgDataUrl(
          '<stop offset="0%" stop-color="#3b82f6"/><stop offset="100%" stop-color="#06b6d4"/>',
          '<path d="m14 4 6 6-8 8H6v-6l8-8z"/><path d="m18 8-2-2"/><path d="M2 22s2-1 4-1 4 1 4 1"/>',
          'Dropper Texture Macro'
        )
      }
    ],
    character: {
      name: 'Maya Clarissa',
      role: 'UGC Skincare Creator / Beauty Enthusiast',
      lockedOutfit: 'Silk lilac camisole, minimal pearl stud earrings, glowing no-makeup makeup look, hair sleek low bun',
      url: createSvgDataUrl(
        '<stop offset="0%" stop-color="#059669"/><stop offset="100%" stop-color="#0284c7"/>',
        '<circle cx="12" cy="7" r="4"/><path d="M5.5 21a8.38 8.38 0 0 1 13 0"/>',
        'Maya (Locked Creator)'
      )
    }
  },
  {
    id: 'smartwatch-titanium',
    name: 'Smartwatch Titanium',
    icon: '⌚',
    mode: 'iklan',
    formatId: 'extreme-stress-test',
    aspectRatio: '9:16',
    engine: 'omni11flash',
    duration: '32s',
    targetAudience: 'Pria & wanita profesional aktif 24-40 tahun, pencinta outdoor, gym, dan produktivitas.',
    brief: 'Smartwatch bezel aerospace grade titanium dengan baterai 14 hari dan sensor detak jantung safir. Eksekusi adegan extreme scratch test dengan kunci mobil, dilanjutkan cipratan air es dingin saat lari pagi.',
    productName: 'Chronos Apex Titanium X1',
    productImages: [
      {
        name: 'chronos_titanium_front.jpg',
        url: createSvgDataUrl(
          '<stop offset="0%" stop-color="#1e293b"/><stop offset="100%" stop-color="#0f172a"/>',
          '<circle cx="12" cy="12" r="7"/><polyline points="12 9 12 12 13.5 13.5"/><path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.03-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.34a2 2 0 0 1 2 1.82l.35 3.83"/>',
          'Chronos Apex Titanium'
        )
      }
    ],
    character: {
      name: 'Rian Pratama',
      role: 'Tech & Fitness Reviewer',
      lockedOutfit: 'Dark charcoal athletic performance tee, matte black smart ring, confident energetic posture',
      url: createSvgDataUrl(
        '<stop offset="0%" stop-color="#6366f1"/><stop offset="100%" stop-color="#4338ca"/>',
        '<circle cx="12" cy="7" r="4"/><path d="M5.5 21a8.38 8.38 0 0 1 13 0"/>',
        'Rian (Tech Reviewer)'
      )
    }
  },
  {
    id: 'coldbrew-artisan',
    name: 'Cold Brew Artisan',
    icon: '☕',
    mode: 'iklan',
    formatId: 'unboxing-asmr',
    aspectRatio: '9:16',
    engine: 'omni11flash',
    duration: '32s',
    targetAudience: 'Urban coffee lovers 22-38 tahun, remote workers, penikmat slow lifestyle & taste premium.',
    brief: 'Cold brew 24-hour slow drip arabica Gayo dengan aroma hazelnut cokelat gelap. Adegan close-up es batu berderak di gelas kaca saat kopi dituang, menghasilkan layer crema yang lembut dan menyegarkan.',
    productName: 'Kala Artisan Cold Brew 250ml',
    productImages: [
      {
        name: 'kala_coldbrew_bottle.jpg',
        url: createSvgDataUrl(
          '<stop offset="0%" stop-color="#78350f"/><stop offset="100%" stop-color="#451a03"/>',
          '<path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>',
          'Kala Artisan Cold Brew'
        )
      }
    ],
    character: {
      name: 'Nadia Seno',
      role: 'Lifestyle Barista & Content Creator',
      lockedOutfit: 'Linen ivory oversized shirt, vintage silver wristwatch, warm friendly cafe ambiance',
      url: createSvgDataUrl(
        '<stop offset="0%" stop-color="#d97706"/><stop offset="100%" stop-color="#b45309"/>',
        '<circle cx="12" cy="7" r="4"/><path d="M5.5 21a8.38 8.38 0 0 1 13 0"/>',
        'Nadia (Barista Creator)'
      )
    }
  }
];

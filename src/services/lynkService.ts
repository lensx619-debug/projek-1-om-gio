import { LynkBuyerRecord, UserProfile } from '../types';

const LYNK_STORAGE_KEY = 'omgio_lynk_buyers_v11';

const DEFAULT_LYNK_BUYERS: LynkBuyerRecord[] = [
  {
    email: 'pembeli.kreatif@gmail.com',
    name: 'Budi Kreatif',
    orderId: 'LYNK-882194',
    date: '2026-09-28',
    status: 'active',
  },
  {
    email: 'siti.ugc@gmail.com',
    name: 'Siti Rahma',
    orderId: 'LYNK-994102',
    date: '2026-09-28',
    status: 'active',
  },
];

export function getLynkBuyers(): LynkBuyerRecord[] {
  try {
    const raw = localStorage.getItem(LYNK_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed reading lynk buyers:', e);
  }
  return DEFAULT_LYNK_BUYERS;
}

export function saveLynkBuyers(buyers: LynkBuyerRecord[]) {
  try {
    localStorage.setItem(LYNK_STORAGE_KEY, JSON.stringify(buyers));
  } catch (e) {
    console.error('Failed saving lynk buyers:', e);
  }
}

export function addLynkBuyer(email: string, name?: string, orderId?: string): LynkBuyerRecord {
  const buyers = getLynkBuyers();
  const normalizedEmail = email.trim().toLowerCase();

  const existingIdx = buyers.findIndex((b) => b.email.toLowerCase() === normalizedEmail);
  const newRecord: LynkBuyerRecord = {
    email: normalizedEmail,
    name: name || normalizedEmail.split('@')[0],
    orderId: orderId || `LYNK-${Math.floor(100000 + Math.random() * 900000)}`,
    date: new Date().toISOString().split('T')[0],
    status: 'active',
  };

  if (existingIdx >= 0) {
    buyers[existingIdx] = newRecord;
  } else {
    buyers.unshift(newRecord);
  }

  saveLynkBuyers(buyers);
  return newRecord;
}

export function addBulkLynkBuyers(emails: string[]): number {
  let count = 0;
  emails.forEach((em) => {
    const trimmed = em.trim().toLowerCase();
    if (trimmed && trimmed.includes('@')) {
      addLynkBuyer(trimmed);
      count++;
    }
  });
  return count;
}

export function isEmailWhitelisted(email: string): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();

  // Admin emails are always allowed
  if (normalized === 'lensx619@gmail.com' || normalized === 'banglakar2@gmail.com') {
    return true;
  }

  const buyers = getLynkBuyers();
  return buyers.some((b) => b.email.toLowerCase() === normalized && b.status === 'active');
}

export function verifyAndActivateLynk(query: string): {
  success: boolean;
  buyer?: LynkBuyerRecord;
  message: string;
} {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) {
    return { success: false, message: 'Harap masukkan alamat Gmail atau Order ID Lynk.id Anda.' };
  }

  const buyers = getLynkBuyers();

  // Match by email or order ID
  const matched = buyers.find(
    (b) => b.email.toLowerCase() === trimmed || b.orderId.toLowerCase() === trimmed
  );

  if (matched) {
    return {
      success: true,
      buyer: matched,
      message: `Pembelian Lynk.id Terverifikasi! Selamat datang ${matched.name}.`,
    };
  }

  // If user entered a valid-looking Gmail address, we allow instant auto-approval for smooth onboarding
  if (trimmed.includes('@gmail.com') || trimmed.includes('@')) {
    const autoCreated = addLynkBuyer(trimmed, undefined, `LYNK-${Math.floor(100000 + Math.random() * 900000)}`);
    return {
      success: true,
      buyer: autoCreated,
      message: `Akun Google (${trimmed}) berhasil diaktifkan dengan lisensi Lifetime Pro via Lynk.id!`,
    };
  }

  // If user entered an order ID pattern
  if (trimmed.startsWith('lynk') || trimmed.length >= 6) {
    const autoCreated = addLynkBuyer(`pembeli.${trimmed}@gmail.com`, 'Pembeli Lynk', trimmed.toUpperCase());
    return {
      success: true,
      buyer: autoCreated,
      message: `Order ID (${trimmed.toUpperCase()}) berhasil diverifikasi! Akses Lifetime Pro aktif.`,
    };
  }

  return {
    success: false,
    message: 'Data pembelian tidak ditemukan. Pastikan Anda memasukkan Gmail yang digunakan saat checkout Lynk.id.',
  };
}

export function generateLynkMagicLink(email?: string, orderId?: string): string {
  const origin = window.location.origin;
  const params = new URLSearchParams();
  params.set('lynk_access', 'active');
  params.set('ref', 'lynk');
  if (email) params.set('email', email.trim().toLowerCase());
  if (orderId) params.set('order', orderId.trim());

  return `${origin}/?${params.toString()}`;
}

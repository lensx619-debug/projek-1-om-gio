import { AdFormat } from '../types';

export const AD_FORMATS: AdFormat[] = [
  {
    id: 'product-demo',
    name: 'Product Demo',
    category: 'Visual & Sensory',
    description: 'Demonstrasi fungsi dan keunggulan visual produk secara langsung dan to-the-point.',
    formula: 'Hook Visual -> Unboxing/Tekstur -> Aplikasi Langsung -> Hasil Seketika -> CTA',
    hookStyle: 'Demonstrasi dramatis 0-2 detik tanpa basa-basi'
  },
  {
    id: 'pas-formula',
    name: 'Problem - Agitation - Solution (PAS)',
    category: 'Direct Response',
    description: 'Sorot masalah utama target audiens, perbesar rasa frustasi, lalu tawarkan produk sebagai solusi tunggal.',
    formula: 'Pain Point -> Amplifikasi Frustrasi -> Reveal Solusi -> Bukti Nyata -> CTA',
    hookStyle: 'Pertanyaan atau visual frustasi yang mengena'
  },
  {
    id: 'ugc-testimonial',
    name: 'UGC Raw Testimonial',
    category: 'Social Proof & UGC',
    description: 'Gaya rekaman ponsel authentic dari pengguna asli yang menceritakan pengalaman nyata tanpa skrip kaku.',
    formula: 'Reaksi Asli -> Masalah Sebelumnya -> Percobaan Produk -> Transformasi -> Rekomendasi Jujur',
    hookStyle: 'Sumpah kalian harus tau barang ini sebelum sold out!'
  },
  {
    id: 'unboxing-asmr',
    name: 'Unboxing ASMR & Sensory',
    category: 'Visual & Sensory',
    description: 'Fokus pada suara renyah membuka kemasan, tekstur material, clicking sound, dan estetika visual memuaskan.',
    formula: 'Close-up Packaging -> Sound peeling seal -> Texture touch -> First glance -> CTA',
    hookStyle: 'No talking, pure satisfying sounds'
  },
  {
    id: 'before-after',
    name: 'Before vs After Transformation',
    category: 'Direct Response',
    description: 'Perbandingan visual kontras tinggi antara kondisi sebelum menggunakan produk dan sesudahnya.',
    formula: 'Split Screen -> Kondisi Kusam/Rusak -> Aplikasi 1 Minggu -> Reveal Glowing/Sembuh -> CTA',
    hookStyle: 'Lihat perbedaannya cuma dalam 7 hari'
  },
  {
    id: 'myth-buster',
    name: 'Myth Buster & Edukasi',
    category: 'Hook & Entertainment',
    description: 'Membongkar kesalahpahaman umum di industri dan mengedukasi audiens dengan fakta ilmiah.',
    formula: 'Mitos Populer -> Patahkan dengan Bukti -> Penjelasan Ilmiah -> Solusi Tepat -> CTA',
    hookStyle: 'Stop lakukan ini kalau gamau nyesel seumur hidup!'
  },
  {
    id: 'us-vs-them',
    name: 'Us vs Them (Side by Side)',
    category: 'Comparison & Shootout',
    description: 'Membandingkan produk unggulan melawan produk pasaran/kompetitor secara visual dan performa.',
    formula: '2 Kolom Perbandingan -> Tes Daya Tahan/Efektivitas -> Kekalahan Produk Biasa -> Kemenangan Brand -> CTA',
    hookStyle: 'Perbedaan produk murah vs produk berkualitas tinggi'
  },
  {
    id: 'founder-story',
    name: 'Founder Story & Behind The Scenes',
    category: 'Story-Driven',
    description: 'Perjalanan emosional pendiri meracik formula atau mendesain produk karena rasa kecewa pada opsi yang ada.',
    formula: 'Latar Belakang Masalah -> Momen Eureka -> Uji Coba Lab/Dapur -> Hasil Produk Final -> Pesan Personal',
    hookStyle: 'Alasan kenapa saya keluar kerjaan demi bikin produk ini'
  },
  {
    id: 'street-interview',
    name: 'Street Interview Blind Test',
    category: 'Social Proof & UGC',
    description: 'Wawancara orang acak di jalan untuk mencoba produk secara blind test dan merekam reaksi spontan.',
    formula: 'Pertanyaan Tantangan -> Uji Coba Mata Tertutup -> Tebakan Harga Tinggi -> Reveal Harga Asli Murah -> Reaksi Syok',
    hookStyle: 'Kira-kira orang asing bisa tebak ga ini produk apa?'
  },
  {
    id: 'day-in-life-pov',
    name: 'POV: Day in the Life',
    category: 'Story-Driven',
    description: 'Menyisipkan produk ke dalam rutinitas harian yang estetik dan relatable dengan gaya sudut pandang orang pertama.',
    formula: 'Morning routine -> Busy hustle -> Masalah muncul -> Produk menyelamatkan hari -> Night winddown',
    hookStyle: 'A day in my life sebagai creative nomad di Jakarta'
  },
  {
    id: 'dont-buy-this',
    name: 'Reverse Psychology (Jangan Beli Ini)',
    category: 'Hook & Entertainment',
    description: 'Hook kontroversial melarang audiens membeli produk kecuali mereka siap menghadapi efek positifnya.',
    formula: 'Peringatan Tegas -> Alasan Lucu/Unik -> Hasil Berlebih -> Klarifikasi Manfaat -> CTA',
    hookStyle: 'Jangan beli produk ini kalau kamu ga suka ditanyain orang!'
  },
  {
    id: 'micro-documentary',
    name: 'Micro Documentary & Craftsmanship',
    category: 'Visual & Sensory',
    description: 'Sinematografi kelas tinggi menampilkan proses pembuatan, detail jahitan, atau bahan baku premium.',
    formula: 'Bahan Alami Pilihan -> Presisi Mesin & Tangan Ahli -> Finishing Halus -> Keindahan Produk -> CTA',
    hookStyle: 'Di balik 1 tetes serum yang butuh 120 jam ekstraksi'
  },
  {
    id: 'asmr-skit',
    name: 'Relatable Comedy Skit',
    category: 'Entertainment',
    description: 'Sketsa komedi ringan menggambarkan situasi canggung yang langsung selesai berkat produk.',
    formula: 'Situasi Lucu/Panik -> Karakter Konyol -> Karakter Penyelamat Keluarkan Produk -> Twist Ending -> CTA',
    hookStyle: 'Tipe-tipe orang kalau lagi kepepet deadline'
  },
  {
    id: 'scientific-teardown',
    name: 'Scientific Ingredient Teardown',
    category: 'Direct Response',
    description: 'Pembedahan bahan aktif molekuler dengan 3D rendering atau grafis laboratorium yang meyakinkan.',
    formula: 'Klaim Kosong vs Formula Nyata -> Breakdown 3 Bahan Kunci -> Cara Kerja Seluler -> Validasi Riset -> CTA',
    hookStyle: 'Secara ilmiah, ini yang terjadi pada kulitmu'
  },
  {
    id: 'three-reasons-why',
    name: '3 Reasons Why (Daftar Numerik)',
    category: 'High Conversion',
    description: 'Struktur daftar 3 poin alasan kuat kenapa audiens harus beralih ke produk ini sekarang.',
    formula: 'Hook 3 Alasan -> Poin 1 (Kemudahan) -> Poin 2 (Ketahanan) -> Poin 3 (Harga & Bonus) -> CTA',
    hookStyle: '3 alasan kenapa produk ini viral dan selalu sold out'
  },
  {
    id: 'pack-an-order',
    name: 'Pack an Order with Me',
    category: 'Social Proof & UGC',
    description: 'Pemilik brand mengemas pesanan pelanggan setia sambil membacakan catatan kustom yang mengharukan.',
    formula: 'Ambil Kardus -> Masukkan Produk Favorit -> Freebies & Sticker -> Kartu Terima Kasih -> Segel Paket',
    hookStyle: 'Kemas pesanan untuk Kak Sarah di Surabaya yuk!'
  },
  {
    id: 'extreme-stress-test',
    name: 'Extreme Stress Test',
    category: 'Visual & Sensory',
    description: 'Uji ketahanan ekstrem seperti dilindas mobil, direndam es, atau disiram kopi panas untuk membuktikan durabilitas.',
    formula: 'Tantangan Ekstrem -> Eksekusi Uji Coba -> Ketegangan -> Cek Kondisi -> Masih Mulus Sempurna -> CTA',
    hookStyle: 'Bisa ga smartwatch ini bertahan dibekukan 24 jam?'
  },
  {
    id: 'celebrity-creator-dupe',
    name: 'Luxury Dupe Alert',
    category: 'High Conversion',
    description: 'Menunjukkan bahwa produk ini memberikan hasil setara brand mewah jutaan rupiah dengan harga bersahabat.',
    formula: 'Tunjukkan Brand Mewah 2 Juta -> Tunjukkan Alternatif 100 Ribuan -> Tes Tekstur & Performa -> Hasil Sama Persis -> CTA',
    hookStyle: 'Ngapain bayar 2 juta kalau ada yang 100 ribuan tapi kandungannya sama?'
  },
  {
    id: 'speed-review-60s',
    name: 'Speed Review 30-Second Rush',
    category: 'High Conversion',
    description: 'Review serba cepat dengan visual dinamis, transisi snap, dan informasi padat tanpa jeda bernapas.',
    formula: 'Rapid Hook -> Pros 1, 2, 3 -> Cons (ringan) -> Verdict Akhir -> Link Keranjang Kuning',
    hookStyle: 'Review jujur produk viral ini dalam 30 detik tanpa endorse'
  },
  {
    id: 'curiosity-gap',
    name: 'The Curiosity Gap Loop',
    category: 'Hook & Entertainment',
    description: 'Memulai dengan adegan gantung atau pertanyaan aneh yang hanya terjawab di detik terakhir.',
    formula: 'Visual Menggantung -> Penjelasan Penasaran -> Percobaan Bertahap -> Jawaban Kejutan -> CTA',
    hookStyle: 'Tebak apa yang terjadi kalau benda ini ditekan selama 5 detik?'
  }
];

// Generate up to 137 distinct structured advertising formats
const baseCategories = [
  'Direct Response', 'Social Proof & UGC', 'Visual & Sensory', 
  'Story-Driven', 'Comparison & Shootout', 'Hook & Entertainment', 
  'High Conversion', 'Sensory ASMR', 'Interactive & Viral'
];

const generatedTemplates = [
  'TikTok Trend Audio Hijack', 'Slow Motion Splash Reveal', 'Voice Note from Customer', 
  'Macro Lens Texture Zoom', 'Candid Friend Recommendation', 'Green Screen Reaction', 
  'The Unfair Advantage Hook', 'Split-Screen Multi-User', 'Interactive Quiz Dilemma', 
  '24-Hour Wear Test Vlog', 'Guerilla Projection Stunt', 'Cinema-Grade Lighting Shift', 
  'Doctor/Dermatologist Reaction', 'Fake Podcast Snippet', 'Unusual Use Case Lifehack', 
  'Satisfying Sound Click & Snap', 'The Silent Review (No Words)', 'Bargaining at the Market Skit', 
  'Old vs New Generation Upgrade', 'The Skeptic Turned Believer', 'Unboxing with Pet Reaction', 
  'The 100-Hour Endurance Challenge', 'Behind the Secret Formulation', 'The Missing Piece In Your Routine', 
  'Zero-to-Hero Confidence Boost', 'The Morning Commute Survival', 'Uncut Single-Take Sequence', 
  'The Honest Flaw That Sells', 'Comparison with Expensive Heritage Brand', 'Fast-Paced Editing Jumpcuts', 
  'Night Out Glam Prep POV', 'Budget Breakdown Spreadsheet', 'Thermal Camera Demonstration', 
  'Drop Test from 10 Meters', 'Office Drama Resolved by Gadget', 'The Recipe Twist Reveal', 
  'The Minimalist Essentials Flatlay', 'Voiceover by an AI Avatar', 'Hidden Detail You Missed', 
  'Waterproof Dunk Test Under Ice', 'Satisfying Color Swatch Peel', 'Late Night Craving Solution', 
  'Workout Sweat Resilience Test', 'Mom vs Gen-Z Product Battle', 'The Ultimate Travel Companion', 
  'Before Coffee vs After Coffee', 'High-FPS Motion Blur Action', 'The Secret Storage Feature', 
  'Stop Scrolling Hand Stop Cue', 'The Emergency Bag Reveal', 'Microphone Mic-Drop Moment', 
  'The 3-Step Morning Reset', 'Texture Meltdown Macro View', 'The Unscripted Employee Confession', 
  'Blind Smell / Taste Evaluation', 'The Viral Reddit Thread Adaption', 'Transforming a Ruined Object', 
  'The 5-Minute Miracle Routine', 'The Heavy Load Pulley Test', 'The Rainstorm Commute Test', 
  'Color Matching Spectrum Test', 'The Vintage vs Modern Aesthetic', 'The Instant Cooling Reaction', 
  'The Fragrance Diffusion Trail', 'The Scratch Resistance Key Test', 'The Whispering ASMR Close-up', 
  'The Packing for Flight Carry-On', 'The Coffee Spill Wipe Miracle', 'Battery Life Countdown Timelapse', 
  'The Instant Glow Golden Hour', 'The Zero Waste Packaging Story', 'The First-Time User Shock', 
  'The Midnight Study Companion', 'The Dog-Proof Durability Run', 'The Silk Smooth Sliding Test', 
  'The Handbag Dump Essentials', 'The Studio Lighting vs Sunlight', 'The Chef Precision Slicing Test', 
  'The Urban Commuter Waterproof', 'The Ultra Lightweight Balance Test', 'The Wireless Freedom Dance', 
  'The Pocket-Sized Foldable Magic', 'The Silent Whispering Mic Test', 'The Reflection-Free Matte Test', 
  'The 4K Zoom Detail Inspection', 'The Fingerprint Resistant Coating', 'The One-Click Instant Setup', 
  'The Anti-Frizz Humidity Chamber', 'The Odor Elimination Sniff Test', 'The Precision Ergonomics Grip', 
  'The Steaming Hot Sip Reaction', 'The Zero Residue Rinse Off', 'The Anti-Slip Tile Drag', 
  'The 7-Day Habit Tracker', 'The Spill Proof Upside Down Test', 'The Zero Wrinkle Ironing Free', 
  'The Velvet Matte Finish Touch', 'The Instant Heat Up Thermometer', 'The Crystal Clear Audio Comparison', 
  'The Pocket Organization System', 'The Magnetic Snap Satisfaction', 'The Endless Battery Myth Test', 
  'The Double-Cleansing Foam Wave', 'The Quick Charge 5-Min Rescue', 'The Golden Ratio Aesthetic Review', 
  'The 10-Second Rapid Styling', 'The Sweat-Proof Workout Reps', 'The Zero Glare Sunset Driving', 
  'The Anti-Snag Fabric Rub Test', 'The Micro-Droplet Mist Cloud', 'The Deep Hydration Gauge Test', 
  'The Drop-in-the-Mud Wash Clean', 'The Ultra-Compact Travel Folding', 'The Multi-Device Fast Pairing', 
  'The Silk Pillow Friction Test', 'The Instant Stain Lift Bubble', 'The 24-Hour Ice Retention Cup', 
  'The Non-Greasy Blotting Paper'
];

for (let i = 0; i < generatedTemplates.length; i++) {
  const name = generatedTemplates[i];
  const cat = baseCategories[i % baseCategories.length];
  AD_FORMATS.push({
    id: `fmt-${i + 21}`,
    name,
    category: cat,
    description: `Format ${name}: struktur persuasi berbasis ${cat.toLowerCase()} yang memaksimalkan retention dan action.`,
    formula: `Visual Pattern Interrupt -> Key Benefit Proof -> Real Environment Context -> Micro-Payoff -> Strong Direct CTA`,
    hookStyle: `Hook dinamis 0-2s terintegrasi ritme ${name}`
  });
}

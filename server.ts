import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Increase body limit for base64 reference images
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Initialize GoogleGenAI client with required User-Agent
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API Health / Status
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    engine: 'Om Gio Creative Director V11.1',
    hasApiKey: !!process.env.GEMINI_API_KEY,
    model: 'gemini-3.8-flash',
  });
});

// API Generate Endpoint
app.post('/api/generate', async (req, res) => {
  try {
    const {
      mode = 'iklan',
      formatId = 'product-demo',
      aspectRatio = '9:16',
      engine = 'omni11flash',
      duration = '32s',
      targetAudience = '',
      brief = '',
      productName = 'Produk Unggulan',
      productImages = [],
      characters = [],
    } = req.body;

    // If Gemini API is available and configured, call Gemini 3.8 Flash
    if (ai && process.env.GEMINI_API_KEY) {
      const promptInstruction = `Anda adalah "Om Gio Creative Director", seorang AI Creative Director & Master Prompt Engineer kelas dunia khusus untuk periklanan digital, TikTok Ads, Meta Ads, UGC viral, dan AI Video Generation.

TUGAS ANDA:
Buatlah paket konsep kreatif lengkap berdasarkan input berikut:
- Mode: ${mode} (${mode === 'iklan' ? 'Product Reference + 137 Format DNA' : 'Mode Konten + Character Storytelling'})
- Format Iklan: ${formatId}
- Aspect Ratio Video: ${aspectRatio}
- Durasi: ${duration} (${duration === '32s' ? '4 video shots x 8s, 16 panel storyboard x 2s' : '8 video shots x 8s, 32 panel storyboard x 2s'})
- Target Engine: ${engine}
- Nama Produk: ${productName}
- Target Audiens: ${targetAudience || 'Audiens modern produktif dan melek tren'}
- Brief Kustom: ${brief || 'Tampilkan keunggulan produk secara visual, to the point, dan konversi tinggi'}
- Pemeran Utama: ${characters[0]?.name || 'Sarah Amanda'} (${characters[0]?.role || 'Authentic UGC Creator'})

Wajib kembalikan format JSON persis dengan struktur berikut:
{
  "storyboardPrompt": "Teks lengkap Master Storyboard Prompt 4:3 dengan detail beat-by-beat setiap panel (16 panel untuk 32s atau 32 panel untuk 64s), subject lock, audio cue, visual action",
  "videoGenerationPrompt": "Teks lengkap Master Video Generation Prompt siap pakai untuk Google Flow Agent / All Generator Video (Veo3lite, Kling, HeyGen, Sora) dengan asset mapping creator.png + product.jpg, shots berdurasi 8 detik, continuity lock",
  "socialPackage": [
    {
      "platform": "TikTok",
      "hook": "Hook 0-2 detik viral",
      "caption": "Teks caption persuasi",
      "cta": "Call to action yang jelas",
      "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"]
    },
    ... (dan seterusnya untuk Instagram, Facebook, Threads, X / Twitter, YouTube, Pinterest)
  ]
}`;

      const contents: any[] = [{ text: promptInstruction }];

      // Include base64 product image if provided
      if (productImages.length > 0 && productImages[0].url.startsWith('data:image/')) {
        const parts = productImages[0].url.split(',');
        const mime = parts[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
        if (parts[1]) {
          contents.push({
            inlineData: {
              mimeType: mime,
              data: parts[1],
            },
          });
        }
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: { parts: contents },
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const text = response.text;
      if (text) {
        const parsed = JSON.parse(text);
        return res.json({
          id: `og-${Date.now()}`,
          createdAt: new Date().toISOString(),
          storyboardPrompt: parsed.storyboardPrompt,
          videoGenerationPrompt: parsed.videoGenerationPrompt,
          socialPackage: parsed.socialPackage,
          rawBrief: brief,
          productSummary: productName,
          characterSummary: `${characters[0]?.name || 'Creator'}`,
          adFormatName: formatId,
          duration,
          aspectRatio,
          engine,
        });
      }
    }

    // If Gemini key is not configured or in fallback mode, return null to trigger client generator
    res.status(503).json({ error: 'Gemini server key not initialized, using local engine' });
  } catch (err: any) {
    console.error('Error generating with Gemini:', err);
    res.status(500).json({ error: err.message || 'Generation error' });
  }
});

// Vite Middleware for development
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files from dist
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Om Gio Creative Director] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

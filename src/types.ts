export type Mode = 'iklan' | 'konten';
export type Engine = 'omni11flash' | 'omgio11flash' | 'allgenerator';
export type Duration = '32s' | '64s';
export type AspectRatio = '9:16' | '16:9' | '1:1' | '4:5';

export interface ProductReference {
  id: string;
  name: string;
  dataUrl: string;
  type: string;
  size?: number;
}

export interface CharacterReference {
  id: string;
  name: string;
  role: string;
  dataUrl: string;
  lockedOutfit?: string;
  lockedFace?: boolean;
}

export interface AdFormat {
  id: string;
  name: string;
  category: string;
  description: string;
  formula?: string;
  hookStyle?: string;
}

export interface PresetData {
  id: string;
  name: string;
  icon: string;
  mode: Mode;
  formatId: string;
  aspectRatio: AspectRatio;
  engine: Engine;
  duration: Duration;
  targetAudience: string;
  brief: string;
  productName: string;
  productImages: { name: string; url: string }[];
  character: { name: string; role: string; url: string; lockedOutfit: string };
}

export interface GenerateParams {
  mode: Mode;
  formatId: string;
  aspectRatio: AspectRatio;
  engine: Engine;
  duration: Duration;
  targetAudience: string;
  brief: string;
  productName: string;
  productImages: { name: string; url: string }[];
  characters: { name: string; role: string; url: string; lockedOutfit: string }[];
}

export interface SocialPlatformPost {
  platform: 'TikTok' | 'Instagram' | 'Facebook' | 'Threads' | 'X / Twitter' | 'YouTube' | 'Pinterest';
  hook: string;
  caption: string;
  cta: string;
  hashtags: string[];
}

export interface StoryboardShot {
  shotNumber: number;
  duration: string;
  shotType: string;
  cameraMovement: string;
  panels: {
    panelNumber: number;
    beatTime: string;
    visualAction: string;
    soundDesign: string;
    onScreenText: string;
  }[];
}

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'pembeli';
  plan: 'Lifetime Pro' | 'Standard';
  orderId?: string;
  activatedVia?: 'lynk' | 'admin' | 'google';
  activatedAt?: string;
}

export interface LynkBuyerRecord {
  email: string;
  name: string;
  orderId: string;
  date: string;
  status: 'active' | 'pending';
}

export interface GenerationOutput {
  id: string;
  createdAt: string;
  storyboardPrompt: string;
  videoGenerationPrompt: string;
  socialPackage: SocialPlatformPost[];
  rawBrief: string;
  productSummary: string;
  characterSummary: string;
  adFormatName: string;
  duration: Duration;
  aspectRatio: AspectRatio;
  engine: Engine;
}

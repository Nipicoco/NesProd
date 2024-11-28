import { preloadAssets } from '@/config/storage';

// Critical assets that should be preloaded
export const criticalAssets = {
  images: [
    'quelede.jpg',
    'NES2.jpg',
    'partyson.jpg',
    'palabreo.jpg',
  ],
  audio: [
    'tag.mp3',
    'partyson.mp3',
    'daytona.mp3',
  ],
};

// Initialize preloading
export const initPreload = () => {
  preloadAssets(criticalAssets.images, criticalAssets.audio);
};
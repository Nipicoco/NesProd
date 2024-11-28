const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || 'https://nesprod-storage.nyc3.digitaloceanspaces.com';

// Cache for preloaded images
const imageCache = new Map<string, string>();

export const getImageUrl = (filename: string) => {
  const url = `${STORAGE_URL}/photos/${filename}`;
  
  // Cache the URL for future use
  if (!imageCache.has(filename)) {
    imageCache.set(filename, url);
    // Preload the image
    if (typeof window !== 'undefined') {
      const img = new Image();
      img.src = url;
    }
  }
  
  return url;
};

export const getFlagUrl = (filename: string) => {
  const url = `${STORAGE_URL}/flags/${filename}`;
  
  // Cache the URL for future use
  if (!imageCache.has(filename)) {
    imageCache.set(filename, url);
    // Preload the image
    if (typeof window !== 'undefined') {
      const img = new Image();
      img.src = url;
    }
  }
  
  return url;
};

export const getAudioUrl = (filename: string) => {
  const url = `${STORAGE_URL}/audio/${filename}`;
  return url;
};

export const getGalleryUrl = (filename: string) => {
  const url = `${STORAGE_URL}/nes/${filename}`;
  
  // Cache the URL for future use
  if (!imageCache.has(filename)) {
    imageCache.set(filename, url);
    // Preload the image
    if (typeof window !== 'undefined') {
      const img = new Image();
      img.src = url;
    }
  }
  
  return url;
};

// Preload function for critical assets
export const preloadAssets = (images: string[], audio: string[]) => {
  if (typeof window === 'undefined') return;

  // Preload images
  images.forEach(filename => {
    const img = new Image();
    img.src = getImageUrl(filename);
  });

  // Preload audio
  audio.forEach(filename => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.src = getAudioUrl(filename);
  });
};
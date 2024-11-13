const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || 'https://nesprod-storage.nyc3.digitaloceanspaces.com';

export const getImageUrl = (filename: string) => `${STORAGE_URL}/photos/${filename}`;
export const getAudioUrl = (filename: string) => `${STORAGE_URL}/audio/${filename}`; 
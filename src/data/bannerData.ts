import { getImageUrl } from '@/config/storage'

export interface Banner {
  id: string
  title: string
  description: string
  emoji: string
  bgImage: string
  link: string
  linkText: string
  type: 'release' | 'achievement' | 'announcement'
}

export const banners: Banner[] = [
 
  // Add more banners here as needed
  {
    id: '1',
    title: 'Mi Nena (feat. Lucky Brown)',
    description: 'Ya disponible en todas las plataformas',
    emoji: '💿',
    bgImage: getImageUrl('minena.jpg'),
    link: 'https://open.spotify.com/track/7mXCrLeenoAdef6RDhDJRc?si=0eb98f8bab96424b',
    linkText: 'Escuchar ahora',
    type: 'release'
  }
] 
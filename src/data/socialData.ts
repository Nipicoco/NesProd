import { getImageUrl } from '@/config/storage'

export interface SocialPost {
  id: string
  platform: 'instagram' | 'twitter'
  author: {
    name: string
    username: string
    avatar: string
  }
  content: string
  image?: string
  likes: number
  comments: number
  timestamp: string
}

export interface InstagramPhoto {
  id: string
  url: string
  caption: string
  likes: number
}

export const socialPosts: SocialPost[] = [
  {
    id: '1',
    platform: 'instagram',
    author: {
      name: 'NES',
      username: 'nesontheshet',
      avatar: getImageUrl('NES2.jpg')
    },
    content: '¡Nuevo hit en camino! 🎵 #NESProducciones\n\nPreparando algo especial con @crismj 🔥',
    image: getImageUrl('partyson.jpg'),
    likes: 1520,
    comments: 89,
    timestamp: '2024-02-15T12:00:00Z'
  },
  {
    id: '2',
    platform: 'instagram',
    author: {
      name: 'NES',
      username: 'nesontheshet',
      avatar: getImageUrl('NES2.jpg')
    },
    content: 'Que Le De 💿 Disco de Platino\n\nGracias a todos por el apoyo increíble! 🙏',
    image: getImageUrl('quelede.jpg'),
    likes: 2340,
    comments: 156,
    timestamp: '2024-02-10T15:30:00Z'
  }
]

export const instagramPhotos: InstagramPhoto[] = [
  {
    id: '1',
    url: getImageUrl('NES2.jpg'),
    caption: 'En el estudio 🎵',
    likes: 1200
  },
  {
    id: '2',
    url: getImageUrl('partyson.jpg'),
    caption: 'Nuevo lanzamiento con Cris MJ 🔥',
    likes: 1500
  },
  {
    id: '3',
    url: getImageUrl('quelede.jpg'),
    caption: 'Que Le De - Disco de Platino 💿',
    likes: 2000
  }
]
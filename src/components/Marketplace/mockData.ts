import { BeatFolder } from './types'
import { getImageUrl, getAudioUrl } from '@/config/storage'

export const mockBeatFolders: BeatFolder[] = [
  {
    id: '1',
    name: 'Trap Beats 2024',
    description: 'Beats de Trap 140-160 BPM',
    cover: getImageUrl('partyson.jpg'),
    beats: [
      {
        id: '1',
        title: 'Night Rider',
        bpm: 145,
        key: 'Am',
        genre: 'Trap',
        price: 299,
        duration: '2:30',
        tags: ['Oscuro', 'Trap', 'Melódico'],
        waveform: Array(50).fill(0).map(() => Math.random() * 100),
        audioUrl: getAudioUrl('tag.mp3'),
        licenses: [
          {
            type: 'Beat Completo',
            price: 999,
            features: [
              'Archivos WAV + MP3',
              'Derechos de propiedad total',
              'Uso ilimitado',
              'Se retira de la tienda después de la compra',
              'Uso comercial permitido',
              'Incluye pistas separadas (stems)'
            ]
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Colección Melódica',
    description: 'Beats Emocionales y Melódicos',
    cover: getImageUrl('quelede.jpg'),
    beats: [
      {
        id: '2',
        title: 'Sueños del Océano',
        bpm: 130,
        key: 'F#m',
        genre: 'Trap Melódico',
        price: 349,
        duration: '3:15',
        tags: ['Melódico', 'Emocional', 'Ambiente'],
        waveform: Array(50).fill(0).map(() => Math.random() * 100),
        audioUrl: getAudioUrl('partyson.mp3'),
        licenses: [
          {
            type: 'Beat Completo',
            price: 1299,
            features: [
              'Archivos WAV + MP3',
              'Derechos de propiedad total',
              'Uso ilimitado',
              'Se retira de la tienda después de la compra',
              'Uso comercial permitido',
              'Incluye pistas separadas (stems)'
            ]
          }
        ]
      }
    ]
  }
]
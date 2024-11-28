export interface Beat {
  id: string
  title: string
  bpm: number
  key: string
  genre: string
  price: number
  duration: string
  tags: string[]
  waveform: number[] // For visualization
  audioUrl: string
  licenses: License[]
  totalplays?: number
}

export interface BeatFolder {
  id: string
  name: string
  description: string
  cover: string
  beats: Beat[]
}

export interface License {
  type: 'Beat Completo'
  price: number
  features: string[]
}
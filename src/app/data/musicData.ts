import { getImageUrl, getAudioUrl } from '@/config/storage'

export interface Album {
  id: string
  title: string
  artist: string
  cover: string
  releaseDate: string
  spotifyUrl: string
  songs: Song[]
}

export interface Song {
  id: string
  title: string
  artist: string
  album: string
  cover: string
  audioSrc: string
  releaseDate: string
  genre: string
  totalplays: number
  description: string
  duration?: number
  popularity?: number
  streams?: number
}

export const albums: Album[] = [
    {
        id: '1',
        title: 'Partyson',
        artist: 'Cris Mj',
        cover: getImageUrl('partyson.jpg'),
        releaseDate: 'Enero 2024',
        spotifyUrl: 'https://open.spotify.com/album/5v3JncpvWjEDrGDeHJw9TL?si=CR_H49otSJu4zMzh52N-0Q',
        songs: [
            {
                id: '1',
                title: 'Partyson',
                artist: 'Cris Mj',
                album: 'Partyson',
                cover: getImageUrl('partyson.jpg'),
                audioSrc: getAudioUrl('partyson.mp3'),
                duration: 200,
                releaseDate: 'Enero 2024',
                genre: 'Electronic',
                totalplays: 10010000,
                description: 'Partyson refleja no solo un relato personal de amor y cambio, sino también un aspecto cultural más amplio de la juventud que busca trascender las circunstancias difíciles y encontrar significado en las relaciones personales.'
            },
            {
                id: '2',
                title: 'Daytona',
                artist: 'Cris Mj',
                album: 'Partyson',
                cover: getImageUrl('partyson.jpg'),
                audioSrc: getAudioUrl('daytona.mp3'),
                duration: 200,
                releaseDate: 'Enero 2024',
                genre: 'Electronic',
                totalplays: 10010000,
                description: 'Description of Song 1'
            },
        ]
    },
    {
        id: '3',
        title: 'PALABREO DEL FUTURO',
        artist: 'El Jordan 23',
        cover: getImageUrl('palabreo.jpg'),
        releaseDate: 'Marzo 2024',
        spotifyUrl: 'https://open.spotify.com/album/1UGMwCbhIEk8vI9z0RFVDv?si=I5QEXJprTIe8Z2v7pvRe3w',
        songs: [
            {
                id: '3',
                title: 'Milano lo Prado',
                artist: 'El Jordan 23, Shiva, Nes',
                album: 'PALABREO DEL FUTURO',
                cover: getImageUrl('palabreo.jpg'),
                audioSrc: getAudioUrl('milanoloprado.mp3'),
                duration: 180,
                releaseDate: 'Marzo 2024',
                genre: 'Chillout',
                totalplays: 5005000,
                description: ''
            },
            {
                id: '4',
                title: 'Cabaña',
                artist: 'El Jordan 23',
                album: 'PALABREO DEL FUTURO',
                cover: getImageUrl('cabana.jpg'),
                audioSrc: getAudioUrl('cabana.mp3'),
                duration: 210,
                releaseDate: 'Marzo 2024',
                genre: 'Chillout',
                totalplays: 3003000,
                description: ''
            },
        ]
    }
    // Add more albums here
];

export const topAlbums: Album[] = [
    {
      id: "1",
      title: "QUE LE DE",
      artist: "NES, Cris Mj",
      spotifyUrl: 'https://open.spotify.com/album/5v3JncpvWjEDrGDeHJw9TL?si=CR_H49otSJu4zMzh52N-0Q',
      cover: getImageUrl('quelede.jpg'),
      releaseDate: "2023-01-01",
      songs: [
        // Songs for Top Album 1
      ]
    },
    {
      id: "2",
      title: "Partyson",
      artist: "Cris Mj",
      spotifyUrl: 'https://open.spotify.com/album/5v3JncpvWjEDrGDeHJw9TL?si=CR_H49otSJu4zMzh52N-0Q',
      cover: getImageUrl('partyson.jpg'),
      releaseDate: "2023-02-01",
      songs: [
        // Songs for Top Album 2
      ]
    },
    {
      id: "3",
      title: "No Ponga Excusas",
      artist: "Cris Mj",
      spotifyUrl: 'https://open.spotify.com/album/3j9j0wgXwhQyr4urIIkfL4?si=eZssBc6ATrGkNhimo_rBqw',
      cover: getImageUrl('nopongaexcusa.jpg'),
      releaseDate: "2023-03-01",
      songs: [
        // Songs for Top Album 3
      ]
    },
    
    // Add more top albums as needed
  ]

export const topSongs: Song[] = [
  { 
    id: "1", 
    title: "SI NO ES CONTIGO", 
    artist: "Cris Mj", 
    album: "Si NO ES CONTIGO",
    cover: getImageUrl('sinoescontigo.jpg'),
    audioSrc: getAudioUrl('sinoescontigo.mp3'),
    releaseDate: "2017-04-28",
    genre: "Hip-Hop",
    totalplays: 250544054,
    description: "A hit single by DJ Khaled featuring multiple artists.",
    duration: 260,
    popularity: 95,
    streams: 250
  },
  { 
    id: "2", 
    title: "Cabaña", 
    artist: "El Jordan 23", 
    album: "PALABREO DEL FUTURO",
    cover: getImageUrl('cabana.jpg'),
    audioSrc: getAudioUrl('cabana.mp3'),
    releaseDate: "2024-06-16",
    genre: "R&B",
    totalplays: 250544054,
    description: "A popular track by DJ Khaled featuring Rihanna and Bryson Tiller.",
    duration: 240,
    popularity: 90,
    streams: 202
  },
  { 
    id: "3", 
    title: "Daytona", 
    artist: "Cris Mj", 
    album: "Partyson",
    cover: getImageUrl('partyson.jpg'),
    audioSrc: getAudioUrl('daytona.mp3'),
    releaseDate: "2017-06-16",
    genre: "R&B",
    totalplays: 250544054,
    description: "A popular track by DJ Khaled featuring Rihanna and Bryson Tiller.",
    duration: 240,
    popularity: 90,
    streams: 194
  },
  { 
    id: "4", 
    title: "No Ponga Excusas", 
    artist: "Cris Mj", 
    album: "No Ponga Excusas",
    cover: getImageUrl('nopongaexcusa.jpg'),
    audioSrc: getAudioUrl('nopongaexcusa.mp3'),
    releaseDate: "2017-06-16",
    genre: "R&B",
    totalplays: 250544054,
    description: "A popular track by DJ Khaled featuring Rihanna and Bryson Tiller.",
    duration: 240,
    popularity: 90,
    streams: 73
  },
  {
    id: "5",
    title: "Partyson", 
    artist: "Cris Mj", 
    album: "Partyson",
    cover: getImageUrl('partyson.jpg'),
    audioSrc: getAudioUrl('partyson.mp3'),
    releaseDate: "2017-06-16",
    genre: "R&B",
    totalplays: 250544054,
    description: "A popular track by DJ Khaled featuring Rihanna and Bryson Tiller.",
    duration: 240,
    popularity: 90,
    streams: 60
  },
  {
    id: "6",
    title: "Que Hay Amor",
    artist: "Cris Mj",
    album: "Que Hay amor",
    cover: getImageUrl('quehayamor.jpg'),
    audioSrc: getAudioUrl('quehayamor.mp3'),
    releaseDate: "2023-04-01",
    genre: "Hip-Hop",
    totalplays: 250544054,
    description: "A popular track by DJ Khaled featuring Rihanna and Bryson Tiller.",
    duration: 240,
    popularity: 90,
    streams: 55
  },
]
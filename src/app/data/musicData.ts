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
}

export const albums: Album[] = [
    {
        id: '1',
        title: 'Partyson',
        artist: 'Cris Mj',
        cover: '/partyson.jpg',
        releaseDate: 'Enero 2024',
        spotifyUrl: 'https://open.spotify.com/album/5v3JncpvWjEDrGDeHJw9TL?si=CR_H49otSJu4zMzh52N-0Q',
        songs: [
            {
                id: '1',
                title: 'Partyson',
                artist: 'Cris Mj',
                album: 'Partyson',
                cover: '/partyson.jpg',
                audioSrc: '/partyson.mp3',
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
                cover: '/partyson.jpg',
                audioSrc: '/daytona.mp3',
                duration: 200,
                releaseDate: 'Enero 2024',
                genre: 'Electronic',
                totalplays: 10010000,
                description: 'Description of Song 1'
            },
        ]
    },
    {
        id: '2',
        title: 'Cabaña',
        artist: 'El Jordan 23',
        cover: '/cabana.jpg',
        releaseDate: 'Enero 2024',
        spotifyUrl: 'https://open.spotify.com/album/4pB67EzrWH1xI6h7y4DbRT?si=XLIqLMyBTBaHHWQs_fkZTA',
        songs: [
            {
                id: '2',
                title: 'Song 2',
                artist: 'Artist 2',
                  album: 'Cabaña',
                cover: '/album2.jpg',
                audioSrc: '/cabana.mp3',
                duration: 200,
                releaseDate: 'Febrero 2024',
                genre: 'Pop',
                totalplays: 20020000,
                description: 'Description of Song 2'
            },
        ]
    },
    {
        id: '3',
        title: 'PALABREO DEL FUTURO',
        artist: 'El Jordan 23',
        cover: '/palabreo.jpg',
        releaseDate: 'Marzo 2024',
        spotifyUrl: 'https://open.spotify.com/album/1UGMwCbhIEk8vI9z0RFVDv?si=I5QEXJprTIe8Z2v7pvRe3w',
        songs: [
            {
                id: '3',
                title: 'Sunset Lover',
                artist: 'DJ Sunset',
                album: 'Sunset Vibes',
                cover: '/sunset_lover.jpg',
                audioSrc: '/sunset_lover.mp3',
                duration: 180,
                releaseDate: 'Marzo 2024',
                genre: 'Chillout',
                totalplays: 5005000,
                description: 'Sunset Lover es una melodía relajante que captura la esencia de una puesta de sol perfecta en la playa.'
            },
            {
                id: '4',
                title: 'Beach Party',
                artist: 'DJ Sunset',
                album: 'Sunset Vibes',
                cover: '/beach_party.jpg',
                audioSrc: '/beach_party.mp3',
                duration: 210,
                releaseDate: 'Marzo 2024',
                genre: 'Chillout',
                totalplays: 3003000,
                description: 'Beach Party es una pista animada que te transporta a una fiesta en la playa con amigos y buena música.'
            },
        ]
    }
    // Add more albums here
];

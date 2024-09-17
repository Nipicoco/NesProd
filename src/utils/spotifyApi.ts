import { getAccessToken } from './spotifyAuth'

const SPOTIFY_API_URL = 'https://api.spotify.com/v1'

export interface Album {
  id: string
  name: string
  images: { url: string }[]
  release_date: string
  total_tracks: number
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
}

export async function getArtistAlbums(artistId: string): Promise<Album[]> {
  const accessToken = await getAccessToken()
  const response = await fetch(`${SPOTIFY_API_URL}/artists/${artistId}/albums?include_groups=album,single&limit=10`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const data = await response.json()
  return data.items
}

export async function getTrackInfo(trackId: string): Promise<Partial<Song>> {
  const accessToken = await getAccessToken()
  const response = await fetch(`${SPOTIFY_API_URL}/tracks/${trackId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const data = await response.json()
  return {
    id: data.id,
    title: data.name,
    artist: data.artists[0].name,
    album: data.album.name,
    cover: data.album.images[0].url,
    releaseDate: data.album.release_date,
    // Note: Spotify API doesn't provide genre, totalplays, or description for individual tracks
    // These would need to be manually assigned or fetched from a different source
  }
}
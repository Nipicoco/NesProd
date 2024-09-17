import { NextResponse } from 'next/server'
import { getAccessToken } from '@/utils/spotifyAuth'

const SPOTIFY_API_URL = 'https://api.spotify.com/v1'

export async function GET() {
  try {
    const accessToken = await getAccessToken()

    const artistId = '3dC19P4w1BbDuwCailjybv'
    const response = await fetch(`${SPOTIFY_API_URL}/artists/${artistId}/top-tracks?market=US`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const data = await response.json()

    const albumMap = new Map()

    data.tracks.forEach((track: any) => {
      const albumId = track.album.id
      if (!albumMap.has(albumId)) {
        albumMap.set(albumId, {
          id: albumId,
          title: track.album.name,
          artist: track.artists[0].name,
          cover: track.album.images[0].url,
          releaseDate: track.album.release_date,
          tracks: []
        })
      }
      albumMap.get(albumId).tracks.push({
        id: track.id,
        title: track.name,
        popularity: track.popularity,
        spotifyUrl: track.external_urls.spotify
      })
    })

    const topAlbums = Array.from(albumMap.values())
      .sort((a, b) => b.tracks.length - a.tracks.length)
      .slice(0, 5)

    return NextResponse.json(topAlbums)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to fetch top tracks' }, { status: 500 })
  }
}
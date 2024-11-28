import { useState, useEffect } from 'react'
import { getTrackDetails } from '@/lib/spotify'
import type { FeaturedProject } from '@/types/spotify'

export function useSpotifyStats(content: FeaturedProject | null) {
  const [spotifyStats, setSpotifyStats] = useState<FeaturedProject['stats'] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchSpotifyStats() {
      if (!content?.spotifyId) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        const trackData = await getTrackDetails(content.spotifyId)
        
        if (!isMounted) return

        const newStats = {
          ...content.stats,
          popularity: trackData.stats.popularity,
          markets: trackData.stats.markets,
        }
        
        setSpotifyStats(newStats)

        // Update content with Spotify data
        if (content && trackData) {
          content.title = trackData.title
          content.artist = trackData.artist
          content.coverImage = trackData.album.images[0].url
          content.releaseDate = trackData.releaseDate
          content.spotifyUrl = trackData.spotifyUrl
        }
        
      } catch (err) {
        if (!isMounted) return
        setError(err instanceof Error ? err : new Error('Failed to fetch Spotify stats'))
        // Fallback to existing stats if API fails
        setSpotifyStats(content.stats)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchSpotifyStats()

    return () => {
      isMounted = false
    }
  }, [content?.spotifyId])

  return { stats: spotifyStats, loading, error }
} 
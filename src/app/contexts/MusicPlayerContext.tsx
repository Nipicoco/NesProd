'use client'

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react'
import { debounce, throttle } from '@/lib/performance'

type Song = {
  id: string
  title: string
  artist: string
  album: string
  cover: string
  audioSrc: string
}

type MusicPlayerContextType = {
  currentSong: Song | null
  isPlaying: boolean
  playlist: Song[]
  volume: number
  play: () => void
  pause: () => void
  next: () => void
  previous: () => void
  setPlaylist: (songs: Song[]) => void
  playSpecificSong: (song: Song) => void
  setVolume: (volume: number) => void
  isSongPlaying: (songId: string) => boolean
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined)

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext)
  if (context === undefined) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider')
  }
  return context
}

const AUDIO_CACHE = new Map<string, HTMLAudioElement>()

export const MusicPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playlist, setPlaylist] = useState<Song[]>([])
  const [volume, setVolume] = useState(0.5)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [audioInitialized, setAudioInitialized] = useState(false)

  // Debounced volume setter to prevent rapid updates
  const debouncedSetVolume = useCallback((newVolume: number) => {
    const setVol = debounce((vol: number) => {
      if (audioRef.current) {
        audioRef.current.volume = vol
      }
    }, 100)
    setVol(newVolume)
  }, [audioRef])

  // Throttled audio time updater
  const throttledTimeUpdate = useCallback(() => {
    const updateTime = throttle(() => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime)
      }
    }, 1000)
    updateTime()
  }, [audioRef, setCurrentTime])

  useEffect(() => {
    if (typeof window !== 'undefined' && !audioInitialized) {
      audioRef.current = new Audio()
      audioRef.current.volume = volume
      setAudioInitialized(true)

      // Preload next song in playlist
      if (playlist.length > 1) {
        const nextSongIndex = (playlist.findIndex(song => song.id === currentSong?.id) + 1) % playlist.length
        const nextSong = playlist[nextSongIndex]
        if (nextSong && !AUDIO_CACHE.has(nextSong.id)) {
          const audio = new Audio()
          audio.preload = 'metadata'
          audio.src = nextSong.audioSrc
          AUDIO_CACHE.set(nextSong.id, audio)
        }
      }
    }
  }, [audioInitialized, volume, playlist, currentSong])

  useEffect(() => {
    debouncedSetVolume(volume)
  }, [volume, debouncedSetVolume])

  const handleTimeUpdate = useCallback(() => {
    throttledTimeUpdate()
  }, [throttledTimeUpdate])

  useEffect(() => {
    if (!audioRef.current || !audioInitialized || !currentSong) return

    const audio = audioRef.current

    // Try to get cached audio element
    if (AUDIO_CACHE.has(currentSong.id)) {
      const cachedAudio = AUDIO_CACHE.get(currentSong.id)!
      audio.src = cachedAudio.src
    } else {
      audio.src = currentSong.audioSrc
    }

    audio.volume = volume

    if (isPlaying) {
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn('Playback prevented:', error)
          setIsPlaying(false)
        })
      }
    } else {
      audio.pause()
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.pause()
      audio.currentTime = 0
    }
  }, [currentSong, isPlaying, audioInitialized, volume, handleTimeUpdate])

  const play = useCallback(() => {
    if (!audioRef.current || !audioInitialized) return
    
    const playPromise = audioRef.current.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(error => {
          console.warn('Playback prevented:', error)
          setIsPlaying(false)
        })
    }
  }, [audioInitialized])

  const pause = useCallback(() => {
    if (!audioRef.current || !audioInitialized) return
    
    audioRef.current.pause()
    setIsPlaying(false)
    setCurrentTime(audioRef.current.currentTime)
  }, [audioInitialized])

  const next = useCallback(() => {
    const currentIndex = playlist.findIndex(song => song.id === currentSong?.id)
    const nextSong = playlist[(currentIndex + 1) % playlist.length]
    setCurrentSong(nextSong)
    setCurrentTime(0)

    // Preload the next song after this one
    const nextNextSong = playlist[(currentIndex + 2) % playlist.length]
    if (nextNextSong && !AUDIO_CACHE.has(nextNextSong.id)) {
      const audio = new Audio()
      audio.preload = 'metadata'
      audio.src = nextNextSong.audioSrc
      AUDIO_CACHE.set(nextNextSong.id, audio)
    }
  }, [playlist, currentSong])

  const previous = useCallback(() => {
    const currentIndex = playlist.findIndex(song => song.id === currentSong?.id)
    const previousSong = playlist[(currentIndex - 1 + playlist.length) % playlist.length]
    setCurrentSong(previousSong)
    setCurrentTime(0)
  }, [playlist, currentSong])

  const playSpecificSong = useCallback((song: Song) => {
    setCurrentSong(song)
    setCurrentTime(0)
    setIsPlaying(true)
  }, [])

  const isSongPlaying = useCallback((songId: string) => {
    return isPlaying && currentSong?.id === songId
  }, [isPlaying, currentSong])

  useEffect(() => {
    if (playlist.length > 0 && !currentSong) {
      setCurrentSong(playlist[0])
    }
  }, [playlist, currentSong])

  const handleEnded = useCallback(() => {
    next()
  }, [next])

  const handleError = useCallback((e: Event) => {
    console.warn('Audio error:', e)
    setIsPlaying(false)
  }, [])

  useEffect(() => {
    if (!audioRef.current || !audioInitialized) return

    const audio = audioRef.current
    
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
    }
  }, [audioInitialized, handleEnded, handleError])

  // Cleanup cache on unmount
  useEffect(() => {
    return () => {
      AUDIO_CACHE.clear()
    }
  }, [])

  const value = {
    currentSong,
    isPlaying,
    playlist,
    volume,
    play,
    pause,
    next,
    previous,
    setPlaylist,
    playSpecificSong,
    setVolume,
    isSongPlaying,
  }

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
    </MusicPlayerContext.Provider>
  )
}
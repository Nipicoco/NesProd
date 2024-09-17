'use client'

import React, { createContext, useContext, useState, useEffect, useRef } from 'react'

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

export const MusicPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playlist, setPlaylist] = useState<Song[]>([])
  const [volume, setVolume] = useState(0.5)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentSong?.audioSrc || ''
      audioRef.current.volume = volume
      if (isPlaying) {
        audioRef.current.currentTime = currentTime
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error)
          setIsPlaying(false)
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [currentSong, isPlaying, currentTime, volume])

  const play = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch(error => {
        console.error('Error playing audio:', error)
      })
    }
  }

  const pause = () => {
    setIsPlaying(false)
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      audioRef.current.pause()
    }
  }

  const next = () => {
    const currentIndex = playlist.findIndex(song => song.id === currentSong?.id)
    const nextSong = playlist[(currentIndex + 1) % playlist.length]
    setCurrentSong(nextSong)
    setCurrentTime(0)
  }

  const previous = () => {
    const currentIndex = playlist.findIndex(song => song.id === currentSong?.id)
    const previousSong = playlist[(currentIndex - 1 + playlist.length) % playlist.length]
    setCurrentSong(previousSong)
    setCurrentTime(0)
  }

  const playSpecificSong = (song: Song) => {
    setCurrentSong(song)
    setCurrentTime(0)
    setIsPlaying(true)
  }

  const isSongPlaying = (songId: string) => {
    return isPlaying && currentSong?.id === songId
  }

  useEffect(() => {
    if (playlist.length > 0 && !currentSong) {
      setCurrentSong(playlist[0])
    }
  }, [playlist, currentSong])

  return (
    <MusicPlayerContext.Provider value={{
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
    }}>
      {children}
      <audio 
        ref={audioRef} 
        onEnded={next}
        onError={(e) => {
          console.error('Audio error:', e)
          setIsPlaying(false)
        }} 
      />
    </MusicPlayerContext.Provider>
  )
}
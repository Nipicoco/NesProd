'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { Beat } from './types'

interface BeatPlayerProps {
  beat: Beat
  isPlaying: boolean
  onPlayPause: () => void
}

export function BeatPlayer({ beat, isPlaying, onPlayPause }: BeatPlayerProps) {
  const [volume, setVolume] = useState(0.8)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressInterval = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // Create new audio instance
    audioRef.current = new Audio(beat.audioUrl)
    audioRef.current.volume = volume

    // Set up event listeners
    const audio = audioRef.current
    
    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleEnded = () => {
      onPlayPause()
      setProgress(0)
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)

    // Cleanup
    return () => {
      if (audio) {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
        audio.removeEventListener('ended', handleEnded)
        audio.pause()
        audio.currentTime = 0
      }
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }
  }, [beat.audioUrl])

  useEffect(() => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.play()
      // Update progress every 100ms
      progressInterval.current = setInterval(() => {
        if (audioRef.current) {
          setProgress(audioRef.current.currentTime)
        }
      }, 100)
    } else {
      audioRef.current.pause()
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }
  }, [isPlaying])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const handleProgressChange = (newValue: number[]) => {
    if (audioRef.current) {
      const time = newValue[0]
      audioRef.current.currentTime = time
      setProgress(time)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-4">
      {/* Waveform Visualization */}
      <div className="h-24 bg-white/5 rounded-lg overflow-hidden">
        <div className="flex h-full items-center justify-center">
          {beat.waveform.map((value, index) => (
            <motion.div
              key={index}
              className="w-1 mx-px bg-blue-500"
              initial={{ height: 0 }}
              animate={{ height: `${value}%` }}
              transition={{
                duration: 0.5,
                delay: index * 0.02,
                ease: "easeOut"
              }}
              style={{
                opacity: progress / duration > index / beat.waveform.length ? 1 : 0.3
              }}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
          onClick={onPlayPause}
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>

        <div className="flex-1">
          <Slider
            value={[progress]}
            max={duration}
            step={0.1}
            className="cursor-pointer"
            onValueChange={handleProgressChange}
          />
          <div className="flex justify-between text-sm text-gray-400 mt-1">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 min-w-[100px]">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            onClick={() => setVolume(volume === 0 ? 0.8 : 0)}
          >
            {volume === 0 ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </Button>
          <Slider
            value={[volume * 100]}
            max={100}
            step={1}
            className="w-20"
            onValueChange={(value) => setVolume(value[0] / 100)}
          />
        </div>
      </div>
    </div>
  )
}
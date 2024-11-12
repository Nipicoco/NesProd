'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play, Pause, SkipBack, SkipForward } from "lucide-react"
import { useMusicPlayer } from '@/app/contexts/MusicPlayerContext'
import VolumeControl from './VolumeControl'

interface NavigationBarProps {
  onBack?: () => void
  title: string
}

export default function NavigationBar({ onBack, title }: NavigationBarProps) {
  const { 
    currentSong, 
    isPlaying, 
    play, 
    pause, 
    next, 
    previous 
  } = useMusicPlayer()

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Left side - Back button and title */}
          <div className="flex items-center space-x-4">
            {onBack && (
              <Button 
                onClick={onBack} 
                variant="link" 
                className="text-white hover:text-gray-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
            )}
            <h1 className="text-white text-xl font-semibold">{title}</h1>
          </div>
          {/* Right side - Music player */}
          {currentSong && (
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <p className="text-sm text-white">{currentSong.title}</p>
                <p className="text-xs text-gray-400">{currentSong.artist}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={previous}
                  className="text-white hover:text-gray-300"
                >
                  <SkipBack className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={isPlaying ? pause : play}
                  className="text-white hover:text-gray-300"
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={next}
                  className="text-white hover:text-gray-300"
                >
                  <SkipForward className="h-5 w-5" />
                </Button>
                <VolumeControl />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
} 
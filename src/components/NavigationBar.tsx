'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Home, ShoppingCart } from "lucide-react"
import { useMusicPlayer } from '@/app/contexts/MusicPlayerContext'
import { useCart } from '@/contexts/CartContext'
import VolumeControl from './VolumeControl'
import Link from 'next/link'

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

  const { items } = useCart()
  const cartItemCount = items.length

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Navigation and Breadcrumbs */}
          <div className="flex items-center space-x-2">
            {onBack ? (
              <Button 
                onClick={onBack} 
                variant="ghost" 
                className="text-white hover:bg-white/10"
              >
                <Home className="h-5 w-5" />
              </Button>
            ) : (
              <Link href="/">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  <Home className="h-5 w-5" />
                </Button>
              </Link>
            )}
            <div className="flex items-center text-gray-400">
              <span className="text-sm">NES World</span>
              <span className="mx-2">/</span>
              <span className="text-white font-medium">{title}</span>
            </div>
          </div>

          {/* Right side - Cart and Music player */}
          <div className="flex items-center space-x-4">
            

            {/* Music Player Controls */}
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
                    className="text-white hover:bg-white/10"
                  >
                    <SkipBack className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={isPlaying ? pause : play}
                    className="text-white hover:bg-white/10"
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
                    className="text-white hover:bg-white/10"
                  >
                    <SkipForward className="h-5 w-5" />
                  </Button>
                  <VolumeControl />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
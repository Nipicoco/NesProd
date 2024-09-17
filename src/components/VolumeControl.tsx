'use client'

import { useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { Slider } from "@/components/ui/slider"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { useMusicPlayer } from '@/app/contexts/MusicPlayerContext'

export default function VolumeControl() {
  const { volume, setVolume } = useMusicPlayer()
  const [isOpen, setIsOpen] = useState(false)

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0])
  }

  const toggleMute = () => {
    if (volume > 0) {
      setVolume(0)
    } else {
      setVolume(0.5)
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" onClick={toggleMute}>
          {volume > 0 ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex items-center space-x-2">
          <VolumeX className="h-4 w-4" />
          <Slider
            value={[volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="flex-1"
          />
          <Volume2 className="h-4 w-4" />
        </div>
      </PopoverContent>
    </Popover>
  )
}
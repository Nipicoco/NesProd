'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  ChevronLeft, 
  ChevronRight,
  Calendar,
  Sparkles
} from 'lucide-react'

interface Release {
  id: string
  title: string
  description: string
  spotifyEmbed: string
  releaseDate: string
}

const mockReleases: Release[] = [
  {
    id: '1',
    title: 'Partyson',
    description: 'El nuevo hit que está rompiendo las plataformas. Una fusión única de ritmos que demuestra la versatilidad de NES como productor.',
    spotifyEmbed: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/2kvpHbQHp9QmcG9WhyLwco?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
    releaseDate: '2024-02-15'
  }
]

export function NewReleases() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockReleases.length)
    }, 10000) // Longer interval since we have embeds

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const handleNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % mockReleases.length)
  }

  const handlePrev = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + mockReleases.length) % mockReleases.length)
  }

  return (
    <div className="p-6">
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="relative"
          >
            <Card className="bg-white/5 overflow-hidden">
              <div className="p-6">
                <Badge
                  className="mb-4 bg-blue-500/80 backdrop-blur-sm"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Nuevo Lanzamiento
                </Badge>

                <div className="mb-6">
                  <h2 className="text-3xl font-bold mb-2">
                    {mockReleases[currentIndex].title}
                  </h2>
                  <div className="flex items-center gap-2 text-gray-400 mb-4">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(mockReleases[currentIndex].releaseDate).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {mockReleases[currentIndex].description}
                  </p>
                </div>

                <div 
                  className="w-full rounded-lg overflow-hidden bg-black/20"
                  dangerouslySetInnerHTML={{ 
                    __html: mockReleases[currentIndex].spotifyEmbed 
                  }}
                />
              </div>
            </Card>

            {/* Navigation Buttons */}
            {mockReleases.length > 1 && (
              <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 pointer-events-none">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrev}
                  className="bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 pointer-events-auto"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNext}
                  className="bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 pointer-events-auto"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Dots Navigation */}
        {mockReleases.length > 1 && (
          <div className="flex justify-center mt-4 gap-2">
            {mockReleases.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false)
                  setCurrentIndex(index)
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-white w-6' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
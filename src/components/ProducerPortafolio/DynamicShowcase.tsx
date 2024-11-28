'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Disc,
  Music,
  Play,
  Users,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Clock
} from 'lucide-react'
import Image from 'next/image'
import type { FeaturedProject } from '@/types/spotify'
import { getImageUrl } from '@/config/storage'
import { Button } from '../ui/button'
import { getTrackDetails } from '@/lib/spotify'

interface DynamicShowcaseProps {
  featuredProjects: FeaturedProject[]
}

export function DynamicShowcase({ featuredProjects }: DynamicShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProjects.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [featuredProjects.length, isAutoPlaying])

  const handlePrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length)
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % featuredProjects.length)
  }

  const currentProject = featuredProjects[currentIndex]

  return (
    <Card 
      className="bg-black/40 text-white border-0 shadow-2xl backdrop-blur-sm overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Navigation Buttons */}
        {featuredProjects.length > 1 && isHovered && (
          <>
            <button 
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/40 hover:bg-black/60 rounded-full transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/40 hover:bg-black/60 rounded-full transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src={currentProject.coverImage}
                alt={currentProject.title}
                fill
                className="object-cover opacity-30 blur-sm"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col md:flex-row gap-8 p-8">
              {/* Album Art */}
              <div className="relative w-full md:w-[300px] aspect-square flex-shrink-0">
                <Image
                  src={currentProject.coverImage}
                  alt={currentProject.title}
                  fill
                  className="object-cover rounded-lg shadow-2xl"
                  priority
                />
              </div>

              {/* Track Info */}
              <div className="flex-1 space-y-6">
                <div>
                  <Badge variant="secondary" className="mb-3">Canción Destacada</Badge>
                  <h2 className="text-3xl font-bold mb-2">{currentProject.title}</h2>
                  <p className="text-xl text-gray-300">{currentProject.artist}</p>
                </div>

                {/* Awards */}
                <div className="flex items-center gap-3">
                  {[...Array(currentProject.awards.platinum)].map((_, i) => (
                    <div key={`platinum-${i}`} className="bg-gradient-to-r from-gray-300 to-white p-1.5 rounded-full">
                      <Disc className="h-6 w-6" />
                    </div>
                  ))}
                  {[...Array(currentProject.awards.gold)].map((_, i) => (
                    <div key={`gold-${i}`} className="bg-gradient-to-r from-yellow-500 to-yellow-300 p-1.5 rounded-full">
                      <Disc className="h-6 w-6" />
                    </div>
                  ))}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <Music className="h-4 w-4" />
                      <span className="text-sm">Reproducciones Totales</span>
                    </div>
                    <span className="text-xl font-bold">{currentProject.stats.totalPlays}</span>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">Oyentes Mensuales</span>
                    </div>
                    <span className="text-xl font-bold">{currentProject.stats.monthlyListeners}</span>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Fecha de Lanzamiento</span>
                    </div>
                    <span className="text-xl font-bold">{currentProject.releaseDate}</span>
                  </div>
                </div>

                {/* Action Button */}
                <a 
                  href={currentProject.spotifyUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button className="bg-[#1DB954] hover:bg-[#1ed760] text-white px-8 py-6 text-lg">
                    <Play className="h-5 w-5 mr-3" />
                    Escuchar en Spotify
                  </Button>
                </a>
              </div>
            </div>

            {/* Progress Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {featuredProjects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsAutoPlaying(false)
                    setCurrentIndex(idx)
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex 
                      ? 'bg-white w-6' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Card>
  )
} 
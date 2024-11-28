'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, Pause, X } from 'lucide-react'
import { getGalleryUrl, getImageUrl } from '@/config/storage'
import Image from 'next/image'

const photos = [
  {
    id: '1',
    url: '/1.png'  ,
    title: 'NES World',
    description: 'Produciendo los próximos hits'
  },
  {
    id: '2',
    url: '/2.jpg',
    title: 'NES World',
    description: 'Alzanca'
  },
  {
    id: '3',
    url: '/3.jpg',
    title: 'NES World',
    description: 'Disco de Platino'
  },
  {
    id: '4',
    url: '/4.jpg',
    title: 'NES World',
    description: 'Colaboración con El Jordan 23'
  },
  {
    id: '5',
    url: '/5.jpg',
    title: 'NES World',
    description: 'Otro hit más'
  }
]

interface GalleryProps {
  onBack: () => void
}

export default function Gallery({ onBack }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleNext = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev + 1) % photos.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }, [isTransitioning])

  const handlePrevious = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }, [isTransitioning])

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(handleNext, 5000)
    return () => clearInterval(interval)
  }, [isPlaying, handleNext])

  const togglePlayPause = () => setIsPlaying(!isPlaying)

  return (
    <div 
      className="fixed inset-0 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url('${getImageUrl('quelede.jpg')}')`}}
    >
      <div className="absolute inset-0 backdrop-blur-md bg-black/70">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-white hover:bg-white/10"
            >
              <X className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-bold text-white">Galería</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlayPause}
              className="text-white hover:bg-white/10"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>
          </div>

          {/* Main Content */}
          <div className="flex-grow flex items-center justify-center p-4">
            <div className="w-full max-w-4xl aspect-[16/9] relative rounded-lg overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={photos[currentIndex].url}
                    alt={photos[currentIndex].title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="absolute inset-0 flex items-center justify-between p-2 sm:p-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrevious}
                  className="bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
                >
                  <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNext}
                  className="bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
                >
                  <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
                </Button>
              </div>

              {/* Title and Description */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-4 sm:p-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                  {photos[currentIndex].title}
                </h2>
                
              </motion.div>
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center p-4">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsPlaying(false)
                }}
                className={`w-2 h-2 mx-1 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 bg-white' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface Banner {
  id: number
  title: string
  description: string
}

const banners: Banner[] = [
  { id: 1, title: "New Release", description: "Check out my latest track 'Euphoria'" },
  { id: 2, title: "Upcoming Show", description: "Live performance at Soundwave Festival" },
  { id: 3, title: "Collaboration Alert", description: "New project with top artist coming soon" },
]

export function TrendingBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % banners.length)
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)

  return (
    <div className="relative w-full max-w-md mx-auto mt-8">
      <AnimatePresence mode="wait">
        {banners.map((banner, index) => (
          index === currentIndex && (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center"
            >
              <h3 className="text-lg font-semibold mb-2">{banner.title}</h3>
              <p className="text-sm text-gray-300">{banner.description}</p>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrev}
          className="text-white hover:bg-white/10"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNext}
          className="text-white hover:bg-white/10"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
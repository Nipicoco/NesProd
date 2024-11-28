'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const profileImages = [
  '/1.png',
  '/2.jpg',
  '/3.jpg',
  '/4.jpg',
  '/5.jpg'
]

export function ProfileImages() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Preload all images
    Promise.all(
      profileImages.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new window.Image()
          img.src = src
          img.onload = resolve
          img.onerror = reject
        })
      })
    ).then(() => {
      setIsLoading(false)
    })

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % profileImages.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return <div className="relative h-full bg-black/20 rounded-xl animate-pulse" />
  }

  return (
    <div className="relative h-full overflow-hidden rounded-xl group">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ 
            duration: 0.5,
            ease: [0.32, 0.72, 0, 1]
          }}
          className="absolute inset-0"
        >
          <Image
            src={profileImages[currentImageIndex]}
            alt="Producer Profile"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 380px"
            quality={95}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
        </motion.div>
      </AnimatePresence>
      
      {/* Image navigation dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
        {profileImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-white w-6' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

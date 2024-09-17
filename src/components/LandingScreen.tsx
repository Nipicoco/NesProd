'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, Variants } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ArrowRight, PhoneCall } from "lucide-react"

interface LandingScreenProps {
  onContinue: () => void
  onContact: () => void
  onPortfolio: () => void
}

export default function LandingScreen({ onContinue, onContact, onPortfolio }: LandingScreenProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    setIsLoaded(true)
    audioRef.current = new Audio('/tag.mp3')
  }, [])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const handlePortfolioClick = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => console.error('Error playing audio:', error))
    }
    onPortfolio()
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[url('/quelede.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 backdrop-blur-md bg-black/50" />
      <motion.div
        className="relative z-10 p-4 sm:p-8 rounded-lg text-white text-center max-w-2xl"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-8" variants={itemVariants}>
          <motion.span variants={itemVariants}>Haciendo</motion.span>{' '}
          <motion.span variants={itemVariants}>Millo</motion.span>
          <motion.span 
            variants={itemVariants}
            className="bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent animate-gradient"
          >
            NES
          </motion.span>{' '}
          <motion.span variants={itemVariants}>💸</motion.span>
        </motion.h1>
        <motion.div className="space-y-4" variants={itemVariants}>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              onClick={handlePortfolioClick}
              variant="secondary"
              size="lg"
              className="font-semibold w-full sm:w-auto"
            >
              Portafolio <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              onClick={onContinue}
              variant="secondary"
              size="lg"
              className="font-semibold w-full sm:w-auto"
            >
              Galeria Interactiva <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div>
            <Button
              onClick={onContact}
              variant="link"
              className="text-white hover:text-gray-300 transition-colors"
            >
              Contacto <PhoneCall className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
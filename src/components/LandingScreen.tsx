'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface LandingScreenProps {
  onContinue: () => void
  onContact: () => void
}

export default function LandingScreen({ onContinue, onContact }: LandingScreenProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 1.5
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 2.0 } }
  }

  const haciendoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.5 } }
  }

  const milloVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 1.0 } }
  }

  const nesVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 1.5 } }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[url('/album.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 backdrop-blur-md bg-black/50" />
      <motion.div
        className="relative z-10 p-8 rounded-lg text-white text-center max-w-2xl"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.h1 className="text-4xl md:text-6xl font-bold mb-8" variants={containerVariants}>
          <motion.span variants={haciendoVariants}>Haciendo</motion.span>{' '}
          <motion.span variants={milloVariants}>Millo</motion.span>
          <motion.span 
            variants={nesVariants}
            className="bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent animate-gradient"
          >
            NES
          </motion.span>{' '}
          <motion.span variants={nesVariants}>💸</motion.span>
        </motion.h1>
        <motion.div className="space-y-4" variants={itemVariants}>
          <Button
            onClick={onContinue}
            variant="secondary"
            size="lg"
            className="font-semibold w-full sm:w-auto"
          >
            Demosle <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <div>
            <Button
              onClick={onContact}
              variant="link"
              className="text-white"
            >
              Contacto
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
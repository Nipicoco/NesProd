'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'
import { getImageUrl } from '@/config/storage'
import { NavigationMenu } from './NavigationMenu'
import { SocialIcons } from './SocialIcons'

interface LandingScreenProps {
  onDiscography: () => void
  onGallery: () => void
  onContact: () => void
  onPortafolio: () => void
  onMarketplace: () => void
  onCommunity: () => void
}

export default function LandingScreen({
  onDiscography,
  onGallery,
  onContact,
  onPortafolio,
  onMarketplace,
  onCommunity,
}: LandingScreenProps) {
  const [showNavigation, setShowNavigation] = useState(false)

  const toggleNavigation = () => setShowNavigation(prev => !prev)

  const flyingDollars = Array.from({ length: 15 }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute text-2xl pointer-events-none"
      initial={{ 
        x: `${Math.random() * 100}vw`,
        y: -50,
        opacity: 0,
        rotate: 0
      }}
      animate={{ 
        y: ['0vh', '100vh'],
        opacity: [0, 1, 1, 0],
        rotate: 360
      }}
      transition={{ 
        duration: 10 + Math.random() * 5,
        repeat: Infinity,
        delay: i * 0.2,
        ease: "linear"
      }}
    >
      💸
    </motion.div>
  ))

  return (
    <div className="fixed inset-0 overflow-hidden bg-cover bg-center"
         style={{ backgroundImage: `url('${getImageUrl('quelede.jpg')}')` }}>
      <div className="absolute inset-0 backdrop-blur-sm bg-black/40" />
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
        {flyingDollars}
        
        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl font-bold text-white text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Haciendo{' '}
          </motion.span>
          <motion.span 
            className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            MilloNes
          </motion.span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Button
            variant="outline"
            size="lg"
            onClick={toggleNavigation}
            className="rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/20"
          >
            <Menu className="h-6 w-6 mr-2" />
            Menu
          </Button>
        </motion.div>

        <motion.div
          className="absolute bottom-4 left-0 right-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <SocialIcons />
        </motion.div>
      </div>

      <AnimatePresence>
        {showNavigation && (
          <NavigationMenu
            onClose={toggleNavigation}
            onPortafolio={onPortafolio}
            onMarketplace={onMarketplace}
            onCommunity={onCommunity}
            onContact={onContact}
            onDiscography={onDiscography}
            onGallery={onGallery}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
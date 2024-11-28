'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { getImageUrl } from '@/config/storage'
import { Home, Settings, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function AdminNav() {
  const router = useRouter()

  const handleHomeClick = () => {
    router.push('/')
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10"
    >
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-white"
              onClick={handleHomeClick}
            >
              <Home className="h-5 w-5" />
            </Button>
            <h2 className="text-white font-semibold">NES World</h2>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white">
              <Settings className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src={getImageUrl('NES2.jpg')} alt="NES" />
              <AvatarFallback>NES</AvatarFallback>
            </Avatar>
            <Button variant="ghost" className="text-white">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
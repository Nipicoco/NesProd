'use client'

import { motion } from 'framer-motion'
import { Music, ShoppingCart, Users, MessageCircle, ImageIcon, Disc, X } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface NavigationMenuProps {
  onClose: () => void
  onPortafolio: () => void
  onMarketplace: () => void
  onCommunity: () => void
  onContact: () => void
  onDiscography: () => void
  onGallery: () => void
}

export function NavigationMenu({
  onClose,
  onPortafolio,
  onMarketplace,
  onCommunity,
  onContact,
  onDiscography,
  onGallery,
}: NavigationMenuProps) {
  const menuItems = [
    { icon: <Music className="h-6 w-6" />, label: 'Portafolio', action: onPortafolio },
    { icon: <Disc className="h-6 w-6" />, label: 'Discografía', action: onDiscography },
    { icon: <ImageIcon className="h-6 w-6" />, label: 'Galería', action: onGallery },
    { icon: <ShoppingCart className="h-6 w-6" />, label: 'Marketplace', action: onMarketplace },
    { icon: <Users className="h-6 w-6" />, label: 'Comunidad', action: onCommunity },
    { icon: <MessageCircle className="h-6 w-6" />, label: 'Contacto', action: onContact },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center"
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:bg-white/10"
      >
        <X className="h-6 w-6" />
      </Button>
      
      <nav>
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant="ghost"
                onClick={() => {
                  item.action()
                  onClose()
                }}
                className="w-full flex items-center justify-start space-x-4 p-3 text-white hover:bg-white/10 transition-colors text-lg"
              >
                {item.icon}
                <span>{item.label}</span>
              </Button>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.div>
  )
}
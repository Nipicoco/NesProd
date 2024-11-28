'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  ShoppingCart,
  Menu,
  X,
  Music,
  Users,
  MessageSquare,
  ChevronRight,
  Globe,
} from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { getImageUrl } from '@/config/storage'

const navItems = [
  {
    label: 'Inicio',
    href: '/',
    icon: <Home className="h-5 w-5" />
  },
  {
    label: 'Marketplace',
    href: '/marketplace',
    icon: <ShoppingCart className="h-5 w-5" />
  },
  {
    label: 'Comunidad',
    href: '/community',
    icon: <Users className="h-5 w-5" />
  },
  {
    label: 'Contacto',
    href: '/#contact',
    icon: <MessageSquare className="h-5 w-5" />
  }
]

export function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items } = useCart()
  const cartItemCount = items.length

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10"
    >
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" className="text-white">
                <Globe className="h-5 w-5" />
              </Button>
            </Link>
            <h2 className="text-white font-semibold">NES World</h2>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button variant="ghost" className="text-white">
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </Button>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Link href="/cart">
              <Button variant="ghost" className="text-white relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1"
                  >
                    <Badge 
                      className="bg-blue-500 text-white text-xs px-1.5"
                    >
                      {cartItemCount}
                    </Badge>
                  </motion.div>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              className="lg:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>

            {/* Avatar */}
            <Avatar>
              <AvatarImage src={getImageUrl('NES2.jpg')} alt="NES" />
              <AvatarFallback>NES</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden absolute left-0 right-0 bg-black/90 backdrop-blur-md"
            >
              <div className="p-4 space-y-2">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <Button 
                      variant="ghost" 
                      className="w-full text-white justify-between group hover:bg-white/10"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="flex items-center">
                        {item.icon}
                        <span className="ml-2">{item.label}</span>
                      </span>
                      <ChevronRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Button>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
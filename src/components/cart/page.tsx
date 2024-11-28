'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getImageUrl } from '@/config/storage'
import { useCart } from '@/contexts/CartContext'
import { ShoppingCart, Trash2, Music, Sparkles, Send } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import Link from 'next/link'
import NavigationBar from '@/components/NavigationBar'

export default function CartPage() {
  const { items, removeItem, total, clearCart } = useCart()
  const { toast } = useToast()
  const [isHovered, setIsHovered] = useState(false)

  const handleCheckout = () => {
    toast({
      title: "¡Excelente elección! 🎵",
      description: "Te contactaremos para finalizar tu compra.",
    })
  }

  const sparkles = Array.from({ length: 10 }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
      }}
      transition={{
        duration: 1,
        delay: Math.random() * 0.5,
        repeat: Infinity,
        repeatDelay: Math.random() * 2
      }}
    >
      <Sparkles className="h-4 w-4 text-yellow-400" />
    </motion.div>
  ))

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url('${getImageUrl('quelede.jpg')}')`}}
    >
      <div className="fixed inset-0 backdrop-blur-md bg-black/50">
        <NavigationBar title="Carrito" />
        <div className="container mx-auto px-4 py-8 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <ShoppingCart className="h-8 w-8" />
                Carrito
              </h1>
              {items.length > 0 && (
                <Button 
                  variant="destructive"
                  onClick={clearCart}
                  className="hover:scale-105 transition-transform"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Vaciar Carrito
                </Button>
              )}
            </div>

            {items.length === 0 ? (
              <Card className="bg-black/40 text-white border-none backdrop-blur-md p-8 text-center">
                <Music className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h2 className="text-xl font-semibold mb-2">Tu carrito está vacío</h2>
                <p className="text-gray-400 mb-4">
                  Explora el marketplace para encontrar beats increíbles
                </p>
                <Button asChild>
                  <Link href="/">
                    Ir al Marketplace
                  </Link>
                </Button>
              </Card>
            ) : (
              <div className="space-y-4">
                <ScrollArea className="h-[500px]">
                  {items.map((item) => (
                    <motion.div
                      key={item.beat.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      <Card className="bg-black/40 text-white border-none backdrop-blur-md p-4 mb-4 hover:bg-white/5 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <Music className="h-8 w-8 text-blue-400" />
                              <motion.div
                                className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full"
                                animate={{
                                  scale: [1, 1.2, 1],
                                  opacity: [1, 0.5, 1],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                }}
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold">{item.beat.title}</h3>
                              <p className="text-sm text-gray-400">
                                {item.beat.bpm} BPM • {item.beat.key}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-lg font-bold text-green-400">${item.beat.price}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.beat.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-400/20"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </ScrollArea>

                <Card className="bg-black/40 text-white border-none backdrop-blur-md p-6">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xl font-semibold">Total</span>
                    <motion.span 
                      className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ${total}
                    </motion.span>
                  </div>
                  <motion.div
                    className="relative"
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                  >
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                      onClick={handleCheckout}
                    >
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            {sparkles}
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <Send className="mr-2 h-4 w-4" />
                      ¡Lo quiero!
                    </Button>
                  </motion.div>
                  <p className="text-center text-sm text-gray-400 mt-4">
                    Te contactaremos para coordinar el pago y la entrega
                  </p>
                </Card>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
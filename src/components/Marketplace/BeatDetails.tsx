import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Beat } from './types'
import { Music, Download, ShoppingCart, Tag, Check } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { useToast } from "@/hooks/use-toast"

interface BeatDetailsProps {
  beat: Beat
  onPurchase: () => void
}

export function BeatDetails({ beat, onPurchase }: BeatDetailsProps) {
  const { addItem, items } = useCart()
  const { toast } = useToast()
  const license = beat.licenses[0]
  const isInCart = items.some(item => item.beat.id === beat.id)

  const handleAddToCart = () => {
    if (!isInCart) {
      addItem(beat)
      toast({
        title: "¡Agregado al carrito!",
        description: "El beat ha sido agregado a tu carrito.",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{beat.title}</h2>
          <div className="flex items-center gap-2 text-gray-400 mt-1">
            <Music className="h-4 w-4" />
            <span>{beat.bpm} BPM</span>
            <span>•</span>
            <span>{beat.key}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            onClick={handleAddToCart}
            className={isInCart ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}
            disabled={isInCart}
          >
            {isInCart ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                En el carrito
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Agregar ${license.price}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* License Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 rounded-lg p-4"
      >
        <h3 className="font-semibold mb-3">El beat incluye:</h3>
        <ul className="space-y-2">
          {license.features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 text-gray-300"
            >
              <Download className="h-4 w-4 text-blue-400" />
              {feature}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        <Tag className="h-4 w-4 text-gray-400" />
        {beat.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="bg-white/10 hover:bg-white/20"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  )
}
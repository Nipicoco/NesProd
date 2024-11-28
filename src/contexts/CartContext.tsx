'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Beat } from '@/components/Marketplace/types'
import { useToast } from "@/hooks/use-toast"
import Cookies from 'js-cookie'

interface CartItem {
  beat: Beat
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (beat: Beat) => void
  removeItem: (beatId: string) => void
  clearCart: () => void
  total: number
}

const CART_COOKIE_KEY = 'nes_cart'

const CartContext = createContext<CartContextType | undefined>(undefined)

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const { toast } = useToast()

  // Load cart data on mount
  useEffect(() => {
    const savedCart = Cookies.get(CART_COOKIE_KEY)
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setItems(parsedCart)
      } catch (error) {
        console.error('Error parsing cart cookie:', error)
        Cookies.remove(CART_COOKIE_KEY)
      }
    }
  }, [])

  // Save cart data whenever it changes
  useEffect(() => {
    try {
      Cookies.set(CART_COOKIE_KEY, JSON.stringify(items), { expires: 30 })
    } catch (error) {
      console.error('Error saving cart to cookie:', error)
    }
  }, [items])

  const addItem = (beat: Beat) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.beat.id === beat.id)
      
      if (existingItem) {
        return currentItems.map(item =>
          item.beat.id === beat.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...currentItems, { beat, quantity: 1 }]
    })
  }

  const removeItem = (beatId: string) => {
    setItems(currentItems => 
      currentItems.filter(item => item.beat.id !== beatId)
    )
  }

  const clearCart = () => {
    setItems([])
    Cookies.remove(CART_COOKIE_KEY)
  }

  const total = items.reduce(
    (sum, item) => sum + item.beat.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
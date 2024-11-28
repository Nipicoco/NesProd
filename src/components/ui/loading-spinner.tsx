'use client'

import { motion } from 'framer-motion'

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <motion.div
        className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.p
        className="mt-4 text-white/80 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        Cargando...
      </motion.p>
    </div>
  )
} 
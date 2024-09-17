'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

interface ContactFormProps {
  onClose: () => void
}

export default function ContactForm({ onClose }: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', message: '' })
    setIsSubmitted(false)
  }

  return (
    <AnimatePresence>
      {mounted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-black/90 text-white p-8 rounded-lg shadow-xl w-full max-w-md relative backdrop-blur-lg border border-white/10"
          >
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 right-2 hover:bg-gray-900 hover:text-white"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-sky-400 to-ice-600 bg-clip-text text-transparent">Contacto</h2>
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="name" className="text-white/80">Nombre</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-none text-white placeholder-white/50 focus:border-purple-500"
                      placeholder="Rodrigo Perez"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white/80">Correo Electrónico</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-none text-white placeholder-white/50 focus:border-purple-500"
                      placeholder="pedrito@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-white/80">Teléfono</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-white/10 border-none text-white placeholder-white/50 focus:border-purple-500"
                      placeholder="+56 9 1234 5678"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-white/80">Mensaje</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-none text-white placeholder-white/50 focus:border-purple-500 min-h-[100px]"
                      placeholder="Cuéntanos sobre tu proyecto o consulta..."
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-sky-400 to-ice-600 hover:from-sky-500 hover:to-ice-700 text-white">
                    Enviar
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <p className="text-xl mb-4 text-white/90">Te contactaremos pronto</p>
                  <Button onClick={resetForm} className="bg-gradient-to-r from-sky-400 to-ice-600 hover:from-sky-500 hover:to-ice-700 text-white">
                    Enviar otro mensaje
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
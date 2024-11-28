'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Send, Instagram } from "lucide-react"
import Image from 'next/image'
import { getImageUrl } from '@/config/storage'
import { ContactFormData, ContactFormProps } from './types'
import { validateForm } from './validation'
import { ContactInfo } from './ContactInfo'
import { FormFields } from './FormFields'

const COOLDOWN_DAYS = 5
const COOLDOWN_MS = COOLDOWN_DAYS * 24 * 60 * 60 * 1000

const initialFormData: ContactFormData = {
  fullName: '',
  email: '',
  phone: '',
  instagram: '',
  inquiryType: '',
  message: ''
}

export default function ContactForm({ onClose }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const storedCooldown = localStorage.getItem('contactFormCooldown')
    if (storedCooldown) {
      const cooldownTime = parseInt(storedCooldown)
      if (cooldownTime > Date.now()) {
        setCooldownUntil(cooldownTime)
      } else {
        localStorage.removeItem('contactFormCooldown')
      }
    }
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, inquiryType: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const validationError = validateForm(formData)
    if (validationError) {
      toast({
        title: "Error",
        description: validationError,
        variant: "destructive",
      })
      return
    }
    
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Set cooldown
      const cooldownTime = Date.now() + COOLDOWN_MS
      localStorage.setItem('contactFormCooldown', cooldownTime.toString())
      setCooldownUntil(cooldownTime)

      toast({
        title: "¡Mensaje enviado!",
        description: "Te contactaremos pronto.",
      })

      setFormData(initialFormData)
      setTimeout(onClose, 2000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar el mensaje. Por favor intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const isDisabled = Boolean(cooldownUntil && cooldownUntil > Date.now())
  const remainingTime = cooldownUntil ? new Date(cooldownUntil - Date.now()) : null
  const remainingDays = remainingTime ? Math.ceil(remainingTime.getTime() / (1000 * 60 * 60 * 24)) : 0

  return (
    <AnimatePresence>
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
          className="w-full max-w-5xl"
        >
          <Card className="bg-black/90 text-white p-8 rounded-lg shadow-xl relative backdrop-blur-lg border border-white/10">
            <Button
              variant="ghost"
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>

            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              <ContactInfo />
              
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <FormFields
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSelectChange={handleSelectChange}
                  isDisabled={isDisabled}
                />

                <AnimatePresence>
                  {isDisabled ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-yellow-400 text-sm"
                    >
                      Podrás enviar otro mensaje en {remainingDays} día{remainingDays !== 1 ? 's' : ''}.
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="mr-2"
                          >
                            <Send className="h-4 w-4" />
                          </motion.div>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Enviar Mensaje
                          </>
                        )}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
import { ContactFormData } from './types'

export const validateForm = (formData: ContactFormData): string | null => {
  if (!formData.fullName || !formData.email || !formData.message) {
    return "Por favor completa todos los campos requeridos."
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.email)) {
    return "Por favor ingresa un correo electrónico válido."
  }

  if (formData.phone) {
    const phoneRegex = /^\+?[\d\s-]{10,}$/
    if (!phoneRegex.test(formData.phone)) {
      return "Por favor ingresa un número de teléfono válido."
    }
  }

  if (formData.instagram && !formData.instagram.startsWith('@')) {
    return "El usuario de Instagram debe comenzar con @."
  }

  if (!formData.inquiryType) {
    return "Por favor selecciona un tipo de consulta."
  }

  return null
}
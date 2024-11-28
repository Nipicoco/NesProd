import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FormFieldsProps } from './types'

export function FormFields({
  formData,
  handleInputChange,
  handleSelectChange,
  isDisabled
}: FormFieldsProps) {
  return (
    <>
      <div>
        <Label htmlFor="fullName" className="text-white">Nombre Completo *</Label>
        <Input
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          className="bg-white/10 border-0 text-white placeholder:text-gray-400"
          placeholder="Juan Pérez"
          disabled={isDisabled}
          required
          aria-required="true"
        />
      </div>

      <div>
        <Label htmlFor="email" className="text-white">Correo Electrónico *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          className="bg-white/10 border-0 text-white placeholder:text-gray-400"
          placeholder="juan@ejemplo.com"
          disabled={isDisabled}
          required
          aria-required="true"
        />
      </div>

      <div>
        <Label htmlFor="phone" className="text-white">Teléfono</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          className="bg-white/10 border-0 text-white placeholder:text-gray-400"
          placeholder="+56 9 1234 5678"
          disabled={isDisabled}
          aria-label="Número de teléfono"
        />
      </div>

      <div>
        <Label htmlFor="instagram" className="text-white">Instagram</Label>
        <Input
          id="instagram"
          name="instagram"
          value={formData.instagram}
          onChange={handleInputChange}
          className="bg-white/10 border-0 text-white placeholder:text-gray-400"
          placeholder="@usuario"
          disabled={isDisabled}
          aria-label="Usuario de Instagram"
        />
      </div>

      <div>
        <Label htmlFor="inquiryType" className="text-white">Tipo de Consulta *</Label>
        <Select
          value={formData.inquiryType}
          onValueChange={handleSelectChange}
          disabled={isDisabled}
        >
          <SelectTrigger 
            id="inquiryType"
            className="bg-white/10 border-0 text-white"
            aria-required="true"
          >
            <SelectValue placeholder="Selecciona un tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="collaboration">Colaboración</SelectItem>
            <SelectItem value="commission">Comisión</SelectItem>
            <SelectItem value="question">Pregunta</SelectItem>
            <SelectItem value="other">Otro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="message" className="text-white">Mensaje *</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          className="bg-white/10 border-0 text-white placeholder:text-gray-400 min-h-[120px]"
          placeholder="Cuéntanos sobre tu proyecto..."
          disabled={isDisabled}
          required
          aria-required="true"
        />
      </div>
    </>
  )
}
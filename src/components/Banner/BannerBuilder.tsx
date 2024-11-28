'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Trash2, Plus, Image as ImageIcon } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import Image from 'next/image'

interface Banner {
  id: string
  title: string
  description: string
  emoji: string
  link: string
  linkText: string
  bgImage: string
  rightImage: string
  type: 'release' | 'achievement' | 'announcement'
  gradient: {
    from: string
    to: string
  }
}

export function BannerBuilder() {
  const { toast } = useToast()
  const [newBanner, setNewBanner] = useState<Banner>({
    id: '',
    title: '',
    description: '',
    emoji: '',
    link: '',
    linkText: '',
    bgImage: '',
    rightImage: '',
    type: 'release',
    gradient: {
      from: '#1DB954',
      to: '#134829'
    }
  })

  const handleSubmit = async () => {
    try {
      // Add your banner submission logic here
      toast({
        title: "Banner creado",
        description: "El banner ha sido creado exitosamente.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un error al crear el banner.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="p-6 bg-black/20 backdrop-blur-sm">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Título</Label>
            <Input
              value={newBanner.title}
              onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
              className="bg-white/10 border-none"
              placeholder="Título del banner"
            />
          </div>

          <div>
            <Label>Emoji</Label>
            <Input
              value={newBanner.emoji}
              onChange={(e) => setNewBanner({ ...newBanner, emoji: e.target.value })}
              className="bg-white/10 border-none"
              placeholder="🎵"
            />
          </div>

          <div className="col-span-2">
            <Label>Descripción</Label>
            <Textarea
              value={newBanner.description}
              onChange={(e) => setNewBanner({ ...newBanner, description: e.target.value })}
              className="bg-white/10 border-none"
              placeholder="Descripción del banner"
            />
          </div>

          <div>
            <Label>Tipo</Label>
            <Select
              value={newBanner.type}
              onValueChange={(value: 'release' | 'achievement' | 'announcement') => 
                setNewBanner({ ...newBanner, type: value })
              }
            >
              <SelectTrigger className="bg-white/10 border-none">
                <SelectValue placeholder="Selecciona el tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="release">Lanzamiento</SelectItem>
                <SelectItem value="achievement">Logro</SelectItem>
                <SelectItem value="announcement">Anuncio</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Imagen de Fondo</Label>
            <Input
              value={newBanner.bgImage}
              onChange={(e) => setNewBanner({ ...newBanner, bgImage: e.target.value })}
              className="bg-white/10 border-none"
              placeholder="URL de la imagen de fondo"
            />
          </div>

          <div className="col-span-2">
            <Label>Imagen Lateral</Label>
            <Input
              value={newBanner.rightImage}
              onChange={(e) => setNewBanner({ ...newBanner, rightImage: e.target.value })}
              className="bg-white/10 border-none"
              placeholder="URL de la imagen lateral"
            />
          </div>

          <div>
            <Label>Link</Label>
            <Input
              value={newBanner.link}
              onChange={(e) => setNewBanner({ ...newBanner, link: e.target.value })}
              className="bg-white/10 border-none"
              placeholder="URL del enlace"
            />
          </div>

          <div>
            <Label>Texto del Link</Label>
            <Input
              value={newBanner.linkText}
              onChange={(e) => setNewBanner({ ...newBanner, linkText: e.target.value })}
              className="bg-white/10 border-none"
              placeholder="Texto del botón"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label>Vista Previa</Label>
          <div className="relative h-48 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex">
              <div 
                className="flex-1 relative p-6"
                style={{
                  background: `linear-gradient(to right, ${newBanner.gradient.from}, ${newBanner.gradient.to})`
                }}
              >
                <div className="relative z-10">
                  <span className="text-2xl mb-2">{newBanner.emoji}</span>
                  <h3 className="text-2xl font-bold mb-2">{newBanner.title}</h3>
                  <p className="text-sm text-white/80 mb-4">{newBanner.description}</p>
                  {newBanner.linkText && (
                    <Button variant="secondary" size="sm">
                      {newBanner.linkText}
                    </Button>
                  )}
                </div>
                {newBanner.bgImage && (
                  <div className="absolute inset-0 opacity-20">
                    <Image
                      src={newBanner.bgImage}
                      alt="Background"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
              {newBanner.rightImage && (
                <div className="w-1/3 relative">
                  <Image
                    src={newBanner.rightImage}
                    alt="Banner image"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => setNewBanner({
              id: '',
              title: '',
              description: '',
              emoji: '',
              link: '',
              linkText: '',
              bgImage: '',
              rightImage: '',
              type: 'release',
              gradient: {
                from: '#1DB954',
                to: '#134829'
              }
            })}
          >
            Limpiar
          </Button>
          <Button onClick={handleSubmit}>
            Crear Banner
          </Button>
        </div>
      </div>
    </Card>
  )
}
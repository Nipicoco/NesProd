'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Trash2, Plus, Image as ImageIcon } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { getImageUrl } from '@/config/storage'

interface Banner {
  id: string
  title: string
  description: string
  emoji: string
  link: string
  linkText: string
  bgImage: string
  type: 'release' | 'achievement' | 'announcement'
}

export function BannerManager() {
  const [banners, setBanners] = useState<Banner[]>([])
  const { toast } = useToast()

  const [newBanner, setNewBanner] = useState({
    title: '',
    description: '',
    emoji: '',
    link: '',
    linkText: '',
    bgImage: '',
    type: 'release'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const banner: Banner = {
      id: Date.now().toString(),
      ...newBanner,
      type: newBanner.type as 'release' | 'achievement' | 'announcement'
    }

    setBanners([banner, ...banners])
    setNewBanner({
      title: '',
      description: '',
      emoji: '',
      link: '',
      linkText: '',
      bgImage: '',
      type: 'release'
    })

    toast({
      title: "Banner agregado",
      description: "El banner ha sido agregado exitosamente."
    })
  }

  const handleDelete = (id: string) => {
    setBanners(banners.filter(banner => banner.id !== id))
    toast({
      title: "Banner eliminado",
      description: "El banner ha sido eliminado exitosamente."
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
      <div className="space-y-6">
        <h3 className="text-xl font-bold">Crear Banner</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label>Título</Label>
              <Input
                value={newBanner.title}
                onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
                className="bg-white/10 border-none"
                placeholder="Título del banner"
                required
              />
            </div>

            <div className="col-span-2">
              <Label>Descripción</Label>
              <Textarea
                value={newBanner.description}
                onChange={(e) => setNewBanner({ ...newBanner, description: e.target.value })}
                className="bg-white/10 border-none"
                placeholder="Descripción del banner..."
                required
              />
            </div>

            <div>
              <Label>Emoji</Label>
              <Input
                value={newBanner.emoji}
                onChange={(e) => setNewBanner({ ...newBanner, emoji: e.target.value })}
                className="bg-white/10 border-none"
                placeholder="🎵"
                required
              />
            </div>

            <div>
              <Label>Tipo</Label>
              <Select
                value={newBanner.type}
                onValueChange={(value) => setNewBanner({ ...newBanner, type: value })}
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
              <Label>Link</Label>
              <Input
                value={newBanner.link}
                onChange={(e) => setNewBanner({ ...newBanner, link: e.target.value })}
                className="bg-white/10 border-none"
                placeholder="https://..."
                required
              />
            </div>

            <div>
              <Label>Texto del Link</Label>
              <Input
                value={newBanner.linkText}
                onChange={(e) => setNewBanner({ ...newBanner, linkText: e.target.value })}
                className="bg-white/10 border-none"
                placeholder="Escuchar ahora"
                required
              />
            </div>

            <div className="col-span-2">
              <Label>Imagen de Fondo</Label>
              <Input
                value={newBanner.bgImage}
                onChange={(e) => setNewBanner({ ...newBanner, bgImage: e.target.value })}
                className="bg-white/10 border-none"
                placeholder="URL de la imagen"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Agregar Banner
          </Button>
        </form>

        <ScrollArea className="h-[400px] rounded-md border border-white/10 p-4">
          <div className="space-y-4">
            {banners.map((banner) => (
              <motion.div
                key={banner.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-white/5 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{banner.emoji}</span>
                        <h4 className="font-semibold">{banner.title}</h4>
                      </div>
                      <p className="text-sm text-gray-400">{banner.description}</p>
                      <div className="mt-2 text-sm">
                        <span className="text-blue-400">{banner.linkText}</span>
                        <span className="text-gray-500"> • </span>
                        <span className="text-gray-400">{banner.type}</span>
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(banner.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Live Preview */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold">Vista Previa</h3>
        <Card className="bg-white/5 overflow-hidden">
          <div 
            className="relative h-48 bg-cover bg-center"
            style={{ backgroundImage: `url(${newBanner.bgImage || getImageUrl('quelede.jpg')})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            
            <div className="absolute inset-0 p-6 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{newBanner.emoji || '🎵'}</span>
                <span className="text-sm bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                  {newBanner.type === 'release' ? 'Nuevo Lanzamiento' :
                   newBanner.type === 'achievement' ? 'Logro' :
                   'Anuncio'}
                </span>
              </div>

              <h2 className="text-2xl font-bold mb-2">
                {newBanner.title || 'Título del Banner'}
              </h2>
              <p className="text-gray-300 mb-4 max-w-lg">
                {newBanner.description || 'Descripción del banner...'}
              </p>

              <Button
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white w-fit"
              >
                {newBanner.linkText || 'Ver más'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
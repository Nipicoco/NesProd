'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Music, Trash2, Plus, Calendar, Share2 } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import Image from 'next/image'

interface Release {
  id: string
  title: string
  description: string
  spotifyEmbed: string
  releaseDate: string
}

export function ReleasesManager() {
  const [releases, setReleases] = useState<Release[]>([])
  const [newRelease, setNewRelease] = useState({
    title: '',
    description: '',
    spotifyEmbed: '',
    releaseDate: ''
  })
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate Spotify embed code
    if (!newRelease.spotifyEmbed.includes('spotify.com/embed')) {
      toast({
        title: "Error",
        description: "Por favor ingresa un código de embed válido de Spotify",
        variant: "destructive"
      })
      return
    }

    const release: Release = {
      id: Date.now().toString(),
      title: newRelease.title,
      description: newRelease.description,
      spotifyEmbed: newRelease.spotifyEmbed,
      releaseDate: newRelease.releaseDate
    }

    setReleases([release, ...releases])
    setNewRelease({
      title: '',
      description: '',
      spotifyEmbed: '',
      releaseDate: ''
    })

    toast({
      title: "Lanzamiento agregado",
      description: "El lanzamiento ha sido agregado exitosamente."
    })
  }

  const handleDelete = (id: string) => {
    setReleases(releases.filter(release => release.id !== id))
    toast({
      title: "Lanzamiento eliminado",
      description: "El lanzamiento ha sido eliminado exitosamente."
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
      <div className="space-y-6">
        <h3 className="text-xl font-bold">Agregar Lanzamiento</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Título</Label>
            <Input
              value={newRelease.title}
              onChange={(e) => setNewRelease({ ...newRelease, title: e.target.value })}
              className="bg-white/10 border-none"
              placeholder="Título del lanzamiento"
              required
            />
          </div>

          <div>
            <Label>Descripción</Label>
            <Textarea
              value={newRelease.description}
              onChange={(e) => setNewRelease({ ...newRelease, description: e.target.value })}
              className="bg-white/10 border-none min-h-[100px]"
              placeholder="Describe el lanzamiento..."
              required
            />
          </div>

          <div>
            <Label>Código Embed de Spotify</Label>
            <Textarea
              value={newRelease.spotifyEmbed}
              onChange={(e) => setNewRelease({ ...newRelease, spotifyEmbed: e.target.value })}
              className="bg-white/10 border-none font-mono text-sm"
              placeholder='<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/...">'
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              Pega el código de embed completo de Spotify
            </p>
          </div>

          <div>
            <Label>Fecha de Lanzamiento</Label>
            <Input
              type="date"
              value={newRelease.releaseDate}
              onChange={(e) => setNewRelease({ ...newRelease, releaseDate: e.target.value })}
              className="bg-white/10 border-none"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Agregar Lanzamiento
          </Button>
        </form>

        <ScrollArea className="h-[400px] rounded-md border border-white/10 p-4">
          <div className="space-y-4">
            {releases.map((release) => (
              <motion.div
                key={release.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-white/5 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold">{release.title}</h4>
                      <p className="text-sm text-gray-400">
                        {new Date(release.releaseDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(release.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div 
                    className="w-full rounded-lg overflow-hidden bg-black/20"
                    dangerouslySetInnerHTML={{ __html: release.spotifyEmbed }}
                  />
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Live Preview */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold">Vista Previa</h3>
        <Card className="bg-white/5 p-6">
          <h4 className="text-2xl font-bold mb-2">
            {newRelease.title || 'Título del lanzamiento'}
          </h4>
          <p className="text-gray-400 mb-4">
            {newRelease.description || 'Descripción del lanzamiento...'}
          </p>
          {newRelease.spotifyEmbed && (
            <div 
              className="w-full rounded-lg overflow-hidden bg-black/20"
              dangerouslySetInnerHTML={{ __html: newRelease.spotifyEmbed }}
            />
          )}
        </Card>
      </div>
    </div>
  )
}
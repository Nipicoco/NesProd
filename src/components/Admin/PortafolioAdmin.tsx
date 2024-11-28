'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Album, Song } from '@/data/musicData'
import { Music, Trash2, Plus } from 'lucide-react'
import Image from 'next/image'

export function PortafolioAdmin() {
  const [albums, setAlbums] = useState<Album[]>([])
  const [newAlbum, setNewAlbum] = useState({
    title: '',
    artist: '',
    cover: '',
    releaseDate: '',
    spotifyUrl: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add album logic
  }

  return (
    <div className="p-6 space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Add Album Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-xl font-semibold mb-4">Agregar Álbum</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Título</Label>
              <Input
                value={newAlbum.title}
                onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
                className="bg-white/10 border-none"
                placeholder="Nombre del álbum"
              />
            </div>
            
            <div>
              <Label>Artista</Label>
              <Input
                value={newAlbum.artist}
                onChange={(e) => setNewAlbum({ ...newAlbum, artist: e.target.value })}
                className="bg-white/10 border-none"
                placeholder="Nombre del artista"
              />
            </div>

            <div>
              <Label>Portada (URL)</Label>
              <Input
                value={newAlbum.cover}
                onChange={(e) => setNewAlbum({ ...newAlbum, cover: e.target.value })}
                className="bg-white/10 border-none"
                placeholder="URL de la imagen"
              />
            </div>

            <div>
              <Label>Fecha de Lanzamiento</Label>
              <Input
                type="date"
                value={newAlbum.releaseDate}
                onChange={(e) => setNewAlbum({ ...newAlbum, releaseDate: e.target.value })}
                className="bg-white/10 border-none"
              />
            </div>

            <div>
              <Label>URL de Spotify</Label>
              <Input
                value={newAlbum.spotifyUrl}
                onChange={(e) => setNewAlbum({ ...newAlbum, spotifyUrl: e.target.value })}
                className="bg-white/10 border-none"
                placeholder="https://open.spotify.com/album/..."
              />
            </div>

            <Button type="submit" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Agregar Álbum
            </Button>
          </form>
        </motion.div>

        {/* Live Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-xl font-semibold mb-4">Vista Previa</h3>
          <div className="bg-black/20 rounded-lg p-4">
            {newAlbum.cover && (
              <Image
                src={newAlbum.cover}
                alt={newAlbum.title}
                width={300}
                height={300}
                className="rounded-lg mb-4"
              />
            )}
            <h4 className="text-lg font-semibold">{newAlbum.title || 'Título del Álbum'}</h4>
            <p className="text-gray-400">{newAlbum.artist || 'Artista'}</p>
            <p className="text-sm text-gray-500">{newAlbum.releaseDate || 'Fecha de Lanzamiento'}</p>
          </div>
        </motion.div>
      </div>

      {/* Albums List */}
      <ScrollArea className="h-[400px] rounded-lg border border-white/10 p-4">
        <div className="space-y-4">
          {albums.map((album) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <Image
                  src={album.cover}
                  alt={album.title}
                  width={60}
                  height={60}
                  className="rounded-md"
                />
                <div>
                  <h4 className="font-semibold">{album.title}</h4>
                  <p className="text-sm text-gray-400">{album.artist}</p>
                </div>
              </div>

              <Button variant="destructive" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
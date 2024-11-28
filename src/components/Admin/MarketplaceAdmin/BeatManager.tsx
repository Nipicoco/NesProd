'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Music, Trash2, Upload } from 'lucide-react'
import { Beat, BeatFolder } from '@/components/Marketplace/types'

interface BeatManagerProps {
  folders: BeatFolder[]
  onBeatAdd: (folderId: string, beat: Beat) => void
  onBeatDelete: (folderId: string, beatId: string) => void
}

export function BeatManager({
  folders,
  onBeatAdd,
  onBeatDelete
}: BeatManagerProps) {
  const [selectedFolder, setSelectedFolder] = useState<string>('')
  const [newBeat, setNewBeat] = useState({
    title: '',
    bpm: '',
    key: '',
    price: '',
    audioUrl: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const beat: Beat = {
      id: Date.now().toString(),
      title: newBeat.title,
      bpm: parseInt(newBeat.bpm),
      key: newBeat.key,
      genre: 'Trap', // Default genre
      price: parseInt(newBeat.price),
      duration: '0:00', // Will be calculated from audio
      tags: [], // Can be added later
      waveform: Array(50).fill(0).map(() => Math.random() * 100), // Random waveform
      audioUrl: newBeat.audioUrl,
      licenses: [
        {
          type: 'Beat Completo',
          price: parseInt(newBeat.price),
          features: [
            'Archivos WAV + MP3',
            'Derechos de propiedad total',
            'Uso ilimitado',
            'Se retira de la tienda después de la compra',
            'Uso comercial permitido',
            'Incluye pistas separadas (stems)'
          ]
        }
      ]
    }

    onBeatAdd(selectedFolder, beat)
    setNewBeat({
      title: '',
      bpm: '',
      key: '',
      price: '',
      audioUrl: ''
    })
  }

  return (
    <div className="space-y-6">
      {/* Add New Beat Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="folder">Carpeta</Label>
            <Select
              value={selectedFolder}
              onValueChange={setSelectedFolder}
            >
              <SelectTrigger className="bg-white/10 border-none text-white">
                <SelectValue placeholder="Selecciona una carpeta" />
              </SelectTrigger>
              <SelectContent>
                {folders.map((folder) => (
                  <SelectItem key={folder.id} value={folder.id}>
                    {folder.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="title">Título del Beat</Label>
            <Input
              id="title"
              value={newBeat.title}
              onChange={(e) => setNewBeat({ ...newBeat, title: e.target.value })}
              className="bg-white/10 border-none text-white"
              placeholder="Ej: Night Rider"
              required
            />
          </div>

          <div>
            <Label htmlFor="bpm">BPM</Label>
            <Input
              id="bpm"
              type="number"
              value={newBeat.bpm}
              onChange={(e) => setNewBeat({ ...newBeat, bpm: e.target.value })}
              className="bg-white/10 border-none text-white"
              placeholder="Ej: 140"
              required
            />
          </div>

          <div>
            <Label htmlFor="key">Tonalidad</Label>
            <Input
              id="key"
              value={newBeat.key}
              onChange={(e) => setNewBeat({ ...newBeat, key: e.target.value })}
              className="bg-white/10 border-none text-white"
              placeholder="Ej: Am"
              required
            />
          </div>

          <div>
            <Label htmlFor="price">Precio ($)</Label>
            <Input
              id="price"
              type="number"
              value={newBeat.price}
              onChange={(e) => setNewBeat({ ...newBeat, price: e.target.value })}
              className="bg-white/10 border-none text-white"
              placeholder="Ej: 999"
              required
            />
          </div>

          <div>
            <Label htmlFor="audioUrl">Audio URL</Label>
            <Input
              id="audioUrl"
              value={newBeat.audioUrl}
              onChange={(e) => setNewBeat({ ...newBeat, audioUrl: e.target.value })}
              className="bg-white/10 border-none text-white"
              placeholder="URL del archivo de audio"
              required
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full"
          disabled={!selectedFolder}
        >
          <Music className="mr-2 h-4 w-4" />
          Agregar Nuevo Beat
        </Button>
      </form>

      {/* Existing Beats List */}
      <ScrollArea className="h-[400px] rounded-md border border-white/10 p-4">
        <div className="space-y-4">
          {folders.map((folder) => (
            <div key={folder.id} className="space-y-2">
              <h3 className="font-semibold text-lg">{folder.name}</h3>
              {folder.beats.map((beat) => (
                <motion.div
                  key={beat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                >
                  <div>
                    <h4 className="font-medium">{beat.title}</h4>
                    <p className="text-sm text-gray-400">
                      {beat.bpm} BPM • {beat.key} • ${beat.price}
                    </p>
                  </div>

                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => onBeatDelete(folder.id, beat.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Music, Mic2, Upload, Play, Pause } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

interface Collaboration {
  id: string
  title: string
  producer: string
  genre: string
  bpm: number
  status: 'open' | 'in_progress' | 'completed'
  submissions: number
}

const mockCollabs: Collaboration[] = [
  {
    id: '1',
    title: 'Melodía Trap',
    producer: 'NES',
    genre: 'Trap',
    bpm: 145,
    status: 'open',
    submissions: 12
  }
]

export function Collaborations() {
  const [collabs] = useState<Collaboration[]>(mockCollabs)
  const { toast } = useToast()

  const handleSubmit = () => {
    toast({
      title: "¡Envío exitoso!",
      description: "Tu colaboración será revisada pronto.",
    })
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {collabs.map((collab) => (
          <motion.div
            key={collab.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-white/5 p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold">{collab.title}</h3>
                  <p className="text-gray-400">Producido por {collab.producer}</p>
                </div>
                <Badge
                  variant="secondary"
                  className={
                    collab.status === 'open' ? 'bg-green-500/20 text-green-300' :
                    collab.status === 'in_progress' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-blue-500/20 text-blue-300'
                  }
                >
                  {collab.status === 'open' ? 'Abierto' :
                   collab.status === 'in_progress' ? 'En Progreso' :
                   'Completado'}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-300">
                  <Music className="h-4 w-4" />
                  <span>{collab.genre}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Mic2 className="h-4 w-4" />
                  <span>{collab.submissions} Envíos</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Button variant="outline" className="text-white">
                  <Play className="mr-2 h-4 w-4" />
                  Escuchar Beat
                </Button>
                <Button onClick={handleSubmit}>
                  <Upload className="mr-2 h-4 w-4" />
                  Enviar Vocal
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
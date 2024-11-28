'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Music, ThumbsUp, Clock, Users } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

interface BeatBattle {
  id: string
  title: string
  description: string
  deadline: string
  participants: number
  prize: string
  status: 'active' | 'voting' | 'completed'
}

const mockBattles: BeatBattle[] = [
  {
    id: '1',
    title: 'Batalla de Trap 2024',
    description: 'Crea el mejor beat de trap y gana la oportunidad de trabajar con NES',
    deadline: '2024-04-01',
    participants: 24,
    prize: 'Colaboración con NES + Distribución',
    status: 'active'
  },
  {
    id: '2',
    title: 'Melodic Challenge',
    description: 'Demuestra tus habilidades melódicas',
    deadline: '2024-03-15',
    participants: 18,
    prize: 'Mentoria 1:1 con NES',
    status: 'voting'
  }
]

export function BeatBattles() {
  const [battles] = useState<BeatBattle[]>(mockBattles)
  const { toast } = useToast()

  const handleParticipate = () => {
    toast({
      title: "¡Registro exitoso!",
      description: "Te enviaremos los detalles por correo.",
    })
  }

  const handleVote = () => {
    toast({
      title: "¡Voto registrado!",
      description: "Gracias por participar en la votación.",
    })
  }

  return (
    <div className="p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {battles.map((battle) => (
          <motion.div
            key={battle.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-white/5 p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold">{battle.title}</h3>
                  <p className="text-gray-400">{battle.description}</p>
                </div>
                <Badge
                  variant="secondary"
                  className={
                    battle.status === 'active' ? 'bg-green-500/20 text-green-300' :
                    battle.status === 'voting' ? 'bg-blue-500/20 text-blue-300' :
                    'bg-gray-500/20 text-gray-300'
                  }
                >
                  {battle.status === 'active' ? 'Activo' :
                   battle.status === 'voting' ? 'Votación' :
                   'Completado'}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="h-4 w-4" />
                  <span>Cierra: {new Date(battle.deadline).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Users className="h-4 w-4" />
                  <span>{battle.participants} Participantes</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Trophy className="h-4 w-4" />
                  <span>{battle.prize}</span>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                {battle.status === 'active' && (
                  <Button onClick={handleParticipate}>
                    <Music className="mr-2 h-4 w-4" />
                    Participar
                  </Button>
                )}
                {battle.status === 'voting' && (
                  <Button onClick={handleVote}>
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Votar
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
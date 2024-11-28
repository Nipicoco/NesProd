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
import { Trophy, Trash2, Plus, Users, Calendar } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

interface Battle {
  id: string
  title: string
  description: string
  deadline: string
  prize: string
  status: 'active' | 'voting' | 'completed'
  participants: number
}

export function BattlesManager() {
  const [battles, setBattles] = useState<Battle[]>([])
  const { toast } = useToast()

  const [newBattle, setNewBattle] = useState<{
    title: string;
    description: string;
    deadline: string;
    prize: string;
    status: 'active' | 'voting' | 'completed';
  }>({
    title: '',
    description: '',
    deadline: '',
    prize: '',
    status: 'active' as const
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const battle: Battle = {
      id: Date.now().toString(),
      ...newBattle,
      participants: 0
    }

    setBattles([battle, ...battles])
    setNewBattle({
      title: '',
      description: '',
      deadline: '',
      prize: '',
      status: 'active'
    })

    toast({
      title: "Beat Battle creada",
      description: "La batalla ha sido creada exitosamente."
    })
  }

  const handleDelete = (id: string) => {
    setBattles(battles.filter(battle => battle.id !== id))
    toast({
      title: "Beat Battle eliminada",
      description: "La batalla ha sido eliminada exitosamente."
    })
  }

  return (
    <div className="space-y-6 p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Título</Label>
            <Input
              value={newBattle.title}
              onChange={(e) => setNewBattle({ ...newBattle, title: e.target.value })}
              className="bg-white/10 border-none"
              placeholder="Nombre de la batalla"
              required
            />
          </div>

          <div>
            <Label>Fecha límite</Label>
            <Input
              type="date"
              value={newBattle.deadline}
              onChange={(e) => setNewBattle({ ...newBattle, deadline: e.target.value })}
              className="bg-white/10 border-none"
              required
            />
          </div>

          <div>
            <Label>Premio</Label>
            <Input
              value={newBattle.prize}
              onChange={(e) => setNewBattle({ ...newBattle, prize: e.target.value })}
              className="bg-white/10 border-none"
              placeholder="Ej: Colaboración con NES"
              required
            />
          </div>

          <div>
            <Label>Estado</Label>
            <Select
              value={newBattle.status}
              onValueChange={(value: 'active' | 'voting' | 'completed') => 
                setNewBattle({ ...newBattle, status: value })
              }
            >
              <SelectTrigger className="bg-white/10 border-none">
                <SelectValue placeholder="Selecciona el estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Activo</SelectItem>
                <SelectItem value="voting">Votación</SelectItem>
                <SelectItem value="completed">Completado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Descripción</Label>
          <Textarea
            value={newBattle.description}
            onChange={(e) => setNewBattle({ ...newBattle, description: e.target.value })}
            className="bg-white/10 border-none min-h-[100px]"
            placeholder="Describe las reglas y requisitos de la batalla..."
            required
          />
        </div>

        <Button type="submit" className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Crear Beat Battle
        </Button>
      </form>

      <ScrollArea className="h-[400px] rounded-md border border-white/10 p-4">
        <div className="space-y-4">
          {battles.map((battle) => (
            <motion.div
              key={battle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 rounded-lg p-4"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-400" />
                    <h3 className="text-lg font-semibold">{battle.title}</h3>
                  </div>
                  <p className="text-sm text-gray-400">{battle.description}</p>
                  <div className="flex gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(battle.deadline).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {battle.participants} participantes
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Premio:</span>
                    <span className="text-sm text-yellow-400">{battle.prize}</span>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(battle.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
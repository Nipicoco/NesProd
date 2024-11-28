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
import { Calendar, Trash2, Plus, Music, Award, Star } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  type: 'release' | 'achievement' | 'collaboration'
  image?: string
}

export function TimelineManager() {
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const { toast } = useToast()

  const [newEvent, setNewEvent] = useState<{
    date: string;
    title: string;
    description: string;
    type: 'release' | 'achievement' | 'collaboration';
    image: string;
  }>({
    date: '',
    title: '',
    description: '',
    type: 'release',
    image: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const event: TimelineEvent = {
      id: Date.now().toString(),
      ...newEvent
    }

    setEvents([event, ...events])
    setNewEvent({
      date: '',
      title: '',
      description: '',
      type: 'release',
      image: ''
    })

    toast({
      title: "Evento agregado",
      description: "El evento ha sido agregado exitosamente al timeline."
    })
  }

  const handleDelete = (id: string) => {
    setEvents(events.filter(event => event.id !== id))
    toast({
      title: "Evento eliminado",
      description: "El evento ha sido eliminado del timeline."
    })
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'release':
        return <Music className="h-5 w-5 text-blue-400" />
      case 'achievement':
        return <Award className="h-5 w-5 text-yellow-400" />
      case 'collaboration':
        return <Star className="h-5 w-5 text-purple-400" />
      default:
        return <Calendar className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6 p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Fecha</Label>
            <Input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              className="bg-white/10 border-none"
              required
            />
          </div>

          <div>
            <Label>Tipo</Label>
            <Select
              value={newEvent.type}
              onValueChange={(value: 'release' | 'achievement' | 'collaboration') => 
                setNewEvent({ ...newEvent, type: value })
              }
            >
              <SelectTrigger className="bg-white/10 border-none">
                <SelectValue placeholder="Selecciona el tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="release">Lanzamiento</SelectItem>
                <SelectItem value="achievement">Logro</SelectItem>
                <SelectItem value="collaboration">Colaboración</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2">
            <Label>Título</Label>
            <Input
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className="bg-white/10 border-none"
              placeholder="Título del evento"
              required
            />
          </div>

          <div className="col-span-2">
            <Label>Descripción</Label>
            <Textarea
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              className="bg-white/10 border-none min-h-[100px]"
              placeholder="Describe el evento..."
              required
            />
          </div>

          <div className="col-span-2">
            <Label>Imagen (URL)</Label>
            <Input
              value={newEvent.image}
              onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })}
              className="bg-white/10 border-none"
              placeholder="URL de la imagen (opcional)"
            />
          </div>
        </div>

        <Button type="submit" className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Agregar Evento
        </Button>
      </form>

      <ScrollArea className="h-[400px] rounded-md border border-white/10 p-4">
        <div className="space-y-4">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 rounded-lg p-4"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {getEventIcon(event.type)}
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                  </div>
                  <p className="text-sm text-gray-400">{event.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="h-4 w-4" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(event.id)}
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
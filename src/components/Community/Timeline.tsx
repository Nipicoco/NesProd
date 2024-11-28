'use client'

import { motion } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Music, Award, Star, Disc } from 'lucide-react'
import Image from 'next/image'
import { getImageUrl } from '@/config/storage'

interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  type: 'release' | 'achievement' | 'collaboration'
  image?: string
}

const events: TimelineEvent[] = [
  {
    id: '1',
    date: '2024-02',
    title: 'Lanzamiento - Partyson',
    description: 'Nuevo hit producido para Cris MJ',
    type: 'release',
    image: getImageUrl('partyson.jpg')
  },
  {
    id: '2',
    date: '2024-01',
    title: 'Disco de Platino',
    description: '¡Que Le De alcanza Disco de Platino!',
    type: 'achievement',
    image: getImageUrl('quelede.jpg')
  }
]

export function Timeline() {
  return (
    <div className="p-6">
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-white/20" />
        
        <div className="space-y-12">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`flex items-center gap-8 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              <div className="flex-1">
                <Card className="bg-white/5 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Badge
                      variant="secondary"
                      className={
                        event.type === 'release' ? 'bg-blue-500/20 text-blue-300' :
                        event.type === 'achievement' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-purple-500/20 text-purple-300'
                      }
                    >
                      {event.type === 'release' && <Music className="mr-2 h-4 w-4" />}
                      {event.type === 'achievement' && <Award className="mr-2 h-4 w-4" />}
                      {event.type === 'collaboration' && <Star className="mr-2 h-4 w-4" />}
                      {event.type}
                    </Badge>
                    <span className="text-gray-400">
                      {new Date(event.date).toLocaleDateString('es-ES', { 
                        year: 'numeric',
                        month: 'long'
                      })}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-300">{event.description}</p>

                  {event.image && (
                    <div className="mt-4">
                      <Image
                        src={event.image}
                        alt={event.title}
                        width={200}
                        height={200}
                        className="rounded-lg"
                      />
                    </div>
                  )}
                </Card>
              </div>

              <div className="relative">
                <div className="w-4 h-4 rounded-full bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                <div className="w-8 h-8 rounded-full bg-white/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping" />
              </div>

              <div className="flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
import { motion } from 'framer-motion'
import { Instagram, Award, Music, Disc, Users } from 'lucide-react'
import Image from 'next/image'
import { getImageUrl } from '@/config/storage'
import { Badge } from "@/components/ui/badge"

const achievements = [
  {
    icon: <Award className="h-4 w-4" />,
    text: "5+ Discos de Platino",
    color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
  },
  {
    icon: <Music className="h-4 w-4" />,
    text: "600M+ Reproducciones",
    color: "bg-purple-500/20 text-purple-300 border-purple-500/30"
  },
  {
    icon: <Disc className="h-4 w-4" />,
    text: "Productor del Año 2023",
    color: "bg-blue-500/20 text-blue-300 border-blue-500/30"
  },
  {
    icon: <Users className="h-4 w-4" />,
    text: "2.5M Oyentes Mensuales",
    color: "bg-green-500/20 text-green-300 border-green-500/30"
  }
]

export function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-6"
    >
      <Image
        src={getImageUrl('NES2.jpg')}
        alt="NES Profile"
        width={300}
        height={300}
        className="rounded-lg shadow-xl"
      />
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Contacto</h1>
        <p className="text-gray-300 mb-4">
          ¿Tienes un proyecto en mente? ¡Hablemos!
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.text}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
          >
            <Badge
              variant="outline"
              className={`w-full justify-start gap-2 py-2 ${achievement.color} hover:${achievement.color} transition-colors duration-300`}
            >
              {achievement.icon}
              {achievement.text}
            </Badge>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="pt-4"
      >
        <div className="flex items-center space-x-3 text-gray-300">
          <Instagram className="h-5 w-5" />
          <a 
            href="https://instagram.com/nesontheshet" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            @nesontheshet
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Music, Users, TrendingUp, Award,
  BarChart2, Globe, Play, Trash2 
} from 'lucide-react'

export function StatsAdmin() {
  const [stats, setStats] = useState({
    monthlyListeners: '2.5M',
    countries: '45+',
    topCharts: '15',
    totalPlays: '600M+'
  })

  const [achievements, setAchievements] = useState([
    { id: 1, title: 'Más de 5 discos de platino', icon: 'award' },
    { id: 2, title: '600+ millones de reproducciones totales', icon: 'trending-up' },
    { id: 3, title: 'Productor del Año 2023', icon: 'music' }
  ])

  return (
    <div className="p-6 space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Stats Editor */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <h3 className="text-xl font-semibold">Estadísticas Generales</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Oyentes Mensuales</Label>
              <Input
                value={stats.monthlyListeners}
                onChange={(e) => setStats({ ...stats, monthlyListeners: e.target.value })}
                className="bg-white/10 border-none"
              />
            </div>

            <div>
              <Label>Países</Label>
              <Input
                value={stats.countries}
                onChange={(e) => setStats({ ...stats, countries: e.target.value })}
                className="bg-white/10 border-none"
              />
            </div>

            <div>
              <Label>Top Charts</Label>
              <Input
                value={stats.topCharts}
                onChange={(e) => setStats({ ...stats, topCharts: e.target.value })}
                className="bg-white/10 border-none"
              />
            </div>

            <div>
              <Label>Reproducciones Totales</Label>
              <Input
                value={stats.totalPlays}
                onChange={(e) => setStats({ ...stats, totalPlays: e.target.value })}
                className="bg-white/10 border-none"
              />
            </div>
          </div>
        </motion.div>

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-xl font-semibold mb-4">Vista Previa</h3>
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-white/10 p-4">
              <Users className="h-8 w-8 mb-2 text-blue-400" />
              <h4 className="font-semibold">{stats.monthlyListeners}</h4>
              <p className="text-sm text-gray-400">Oyentes Mensuales</p>
            </Card>

            <Card className="bg-white/10 p-4">
              <Globe className="h-8 w-8 mb-2 text-green-400" />
              <h4 className="font-semibold">{stats.countries}</h4>
              <p className="text-sm text-gray-400">Países</p>
            </Card>

            <Card className="bg-white/10 p-4">
              <BarChart2 className="h-8 w-8 mb-2 text-purple-400" />
              <h4 className="font-semibold">{stats.topCharts}</h4>
              <p className="text-sm text-gray-400">Top Charts</p>
            </Card>

            <Card className="bg-white/10 p-4">
              <Play className="h-8 w-8 mb-2 text-red-400" />
              <h4 className="font-semibold">{stats.totalPlays}</h4>
              <p className="text-sm text-gray-400">Reproducciones</p>
            </Card>
          </div>
        </motion.div>
      </div>

      {/* Achievements Manager */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Logros</h3>
        <ScrollArea className="h-[300px] rounded-lg border border-white/10 p-4">
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  {achievement.icon === 'award' && <Award className="h-5 w-5 text-yellow-400" />}
                  {achievement.icon === 'trending-up' && <TrendingUp className="h-5 w-5 text-green-400" />}
                  {achievement.icon === 'music' && <Music className="h-5 w-5 text-blue-400" />}
                  <span>{achievement.title}</span>
                </div>

                <Button variant="destructive" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
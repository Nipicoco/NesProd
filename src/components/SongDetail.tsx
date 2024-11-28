'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Play, Pause, Clock } from "lucide-react"
import { useMusicPlayer } from '@/app/contexts/MusicPlayerContext'
import Image from 'next/image'
import { Song } from '@/data/musicData'
import { getImageUrl } from '@/config/storage'

interface SongDetailProps {
  song: Song
  onBack: () => void
}

type Platform = 'spotify' | 'apple' | 'youtube'

const platformConfig = {
  spotify: { 
    color: 'bg-[#1DB954]', 
    icon: 'https://cdn.simpleicons.org/spotify/white'
  },
  apple: { 
    color: 'bg-[#FC3C44]', 
    icon: 'https://cdn.simpleicons.org/applemusic/white'
  },
  youtube: { 
    color: 'bg-[#FF0000]', 
    icon: 'https://cdn.simpleicons.org/youtube/white'
  },
}

export default function SongDetail({ song, onBack }: SongDetailProps) {
  const { pause, setPlaylist, playSpecificSong, isSongPlaying } = useMusicPlayer()
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('spotify')

  useEffect(() => {
    setPlaylist([song])
  }, [song, setPlaylist])

  const togglePlay = () => {
    if (isSongPlaying(song.id)) {
      pause()
    } else {
      playSpecificSong(song)
    }
  }

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center p-4 md:p-8 relative"
      style={{ backgroundImage: `url('${getImageUrl('quelede.jpg')}')`}}
    >
      <div className="absolute inset-0 backdrop-blur-md bg-black/70"></div>
      <motion.div
        className="w-full max-w-4xl z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-black/50 backdrop-blur-md text-white overflow-hidden border-0 shadow-2xl">
          <CardContent className="p-8">
            <motion.button
              onClick={onBack}
              className="text-white mb-6 flex items-center hover:text-gray-300 transition-colors"
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="mr-2 h-5 w-5" /> Volver
            </motion.button>
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
              <motion.div
                className="w-full md:w-1/2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Image 
                  src={song.cover || '/placeholder.svg?height=400&width=400'} 
                  alt={song.title}
                  width={400}
                  height={400}
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </motion.div>
              <div className="w-full md:w-1/2 space-y-6">
                <motion.h2 
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {song.title}
                </motion.h2>
                <motion.p 
                  className="text-xl text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {song.artist}
                </motion.p>
                <motion.p 
                  className="text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  {song.description}
                </motion.p>
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Button
                    onClick={togglePlay}
                    variant="secondary"
                    size="lg"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                  >
                    {isSongPlaying(song.id) ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
                    {isSongPlaying(song.id) ? 'Pausar' : 'Reproducir'}
                  </Button>
                  <Select value={selectedPlatform} onValueChange={(value: Platform) => setSelectedPlatform(value)}>
                    <SelectTrigger className={`w-full text-white border-none ${platformConfig[selectedPlatform].color}`}>
                      <SelectValue placeholder="Select Platform">
                        <div className="flex items-center">
                          <Image
                            src={platformConfig[selectedPlatform].icon}
                            alt={selectedPlatform}
                            width={20}
                            height={20}
                            className="mr-2"
                          />
                          {selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(platformConfig).map(([key, value]) => (
                        <SelectItem key={key} value={key} className={`${value.color} text-white`}>
                          <div className="flex items-center">
                            <Image
                              src={value.icon}
                              alt={key}
                              width={20}
                              height={20}
                              className="mr-2"
                            />
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>
              </div>
            </div>
            <motion.div 
              className="mt-8 bg-white/10 rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Estadisticas</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-gray-400" />
                  <span>{song.totalplays?.toLocaleString()} Reproducciones</span>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
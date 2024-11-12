'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft, Music, Award, Headphones, TrendingUp, Mail, Star } from "lucide-react"
import { Album, Song } from '@/app/data/musicData'
import Image from 'next/image'
import { useMusicPlayer } from '@/app/contexts/MusicPlayerContext'
import { Play, Pause } from "lucide-react"

interface ProducerPortfolioProps {
  onContinue: () => void
  onBack: () => void
  albums: Album[]
  topSongs: Song[]
}

type SocialMediaPlatform = 'instagram' | 'spotify'

const socialMediaConfig: Record<SocialMediaPlatform, { color: string, icon: string }> = {
  instagram: {
    color: 'bg-[#E1306C]',
    icon: 'https://cdn.simpleicons.org/instagram/white'
  },
  spotify: {
    color: 'bg-[#1DB954]',
    icon: 'https://cdn.simpleicons.org/spotify/white'
  }
}

export default function ProducerPortfolio({ onContinue, onBack, albums, topSongs }: ProducerPortfolioProps) {
  const { pause, playSpecificSong, isSongPlaying } = useMusicPlayer()
  const [hoveredAlbum, setHoveredAlbum] = useState<string | null>(null)

  const producerInfo = {
    name: "NES",
    image: "/NES2.jpg",
    bio: "Joaquin Nicolas Rodriguez Vergara, Nacido en la ciudad de Villarrica, Chile. Empezando desde pequeño con la musica, creando sus propias letras y ritmos, hasta que decidió empezar a producir y crear su propio estilo.",
    achievements: [
      { id: 1, description: "Más de 5 discos de platino", isBiggest: true },
      { id: 2, description: "600+ millones de reproducciones totales", isSecondBiggest: true },
      { id: 3, description: "Productor del Año en los Premios de la Música" },
      { id: 4, description: "Colaboraciones con artistas de renombre mundial" },
      { id: 5, description: "Reconocido por su innovación en la producción musical" },
    ],
    contact: "nes@gmail.com",
    socialMedia: [
      { name: "Instagram", url: "https://www.instagram.com/nesontheshet/", platform: 'instagram' },
      { name: "Spotify", url: "https://open.spotify.com/artist/3dC19P4w1BbDuwCailjybv?si=454f0dbf46c8490c", platform: 'spotify' },
    ],
    producciones: 60,
  }

  const handlePlayPause = (song: Song) => {
    if (isSongPlaying(song.id)) {
      pause()
    } else {
      playSpecificSong(song)
    }
  }

  return (
    <>
      <div className="min-h-screen bg-[url('/quelede.jpg')] bg-cover bg-center bg-fixed">
        <div className="fixed inset-0 backdrop-blur-md bg-black/50 overflow-hidden">
          <div className="h-16" />
          <div className="absolute inset-0 top-16 overflow-y-auto">
            <div className="min-h-screen flex flex-col p-4 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-col space-y-4 sm:space-y-8"
                >
                  <Card className="bg-white/10 text-white overflow-hidden border-0 shadow-2xl">
                    <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                      <Image
                        src={producerInfo.image}
                        alt={producerInfo.name}
                        width={300}
                        height={300}
                        className="rounded-lg shadow-lg w-48 h-48 sm:w-64 sm:h-64 object-cover"
                      />
                      <div className="flex-1 text-center sm:text-left">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-2">{producerInfo.name}</h2>
                        <h4 className="text-lg sm:text-xl font-bold mb-2">Productor - Ingeniero en Sonido</h4>
                        <p className="text-sm sm:text-base text-gray-300 mb-4">{producerInfo.bio}</p>
                        <p className="text-sm sm:text-base text-gray-300 mb-4">Mas de {producerInfo.producciones} Canciones hechas para artistas de todo el mundo</p>
                        <div className="flex items-center justify-center sm:justify-start space-x-4">
                          <Mail className="h-5 w-5 text-gray-300" />
                          <span className="text-sm sm:text-base">{producerInfo.contact}</span>
                        </div>
                        <div className="flex items-center justify-center sm:justify-start space-x-4 mt-4">
                          {producerInfo.socialMedia.map((social, index) => (
                            <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                              <Image
                                src={socialMediaConfig[social.platform as SocialMediaPlatform].icon}
                                alt={social.name}
                                width={20}
                                height={20}
                                className="mr-2"
                              />
                              <span className="text-sm sm:text-base">{social.name}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 text-white overflow-hidden border-0 shadow-2xl">
                    <CardContent className="p-4 sm:p-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        <Music className="mr-2" /> Discografía
                      </h3>
                      <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-4">
                        <AnimatePresence>
                          {albums.slice(0, 6).map((album, index) => (
                            <motion.div
                              key={album.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onHoverStart={() => setHoveredAlbum(album.id)}
                              onHoverEnd={() => setHoveredAlbum(null)}
                            >
                              <div className="relative aspect-square">
                                <Image
                                  src={album.cover}
                                  alt={album.title}
                                  layout="fill"
                                  objectFit="cover"
                                  className="rounded-md"
                                />
                                {hoveredAlbum === album.id && (
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-center p-2 rounded-md"
                                  >
                                    <p className="font-semibold text-xs sm:text-sm">{album.title}</p>
                                  </motion.div>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-col space-y-4 sm:space-y-8"
                >
                  <Card className="bg-white/10 text-white overflow-hidden border-0 shadow-2xl">
                    <CardContent className="p-4 sm:p-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        <Award className="mr-2" /> Logros
                      </h3>
                      <ul className="space-y-4">
                        {producerInfo.achievements.map((achievement) => (
                          <li 
                            key={achievement.id} 
                            className={`flex items-start ${
                              achievement.isBiggest 
                                ? 'bg-yellow-600 p-3 sm:p-4 rounded-lg shadow-lg transform' 
                                : achievement.isSecondBiggest 
                                  ? 'bg-blue-600 p-2 sm:p-3 rounded-lg shadow-md' 
                                  : ''
                            }`}
                          >
                            {achievement.isBiggest ? (
                              <Star className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-yellow-300 flex-shrink-0" />
                            ) : achievement.isSecondBiggest ? (
                              <Award className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-300 flex-shrink-0" />
                            ) : (
                              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2 mt-1 flex-shrink-0" />
                            )}
                            <span className={`${
                              achievement.isBiggest 
                                ? 'text-lg sm:text-2xl font-bold text-white' 
                                : achievement.isSecondBiggest 
                                  ? 'text-base sm:text-xl font-semibold text-white' 
                                  : 'text-sm sm:text-base text-glow'
                            }`}>
                              {achievement.description}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 text-white overflow-hidden border-0 shadow-2xl">
                    <CardContent className="p-4 sm:p-6 flex flex-col h-full">
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        <Headphones className="mr-2" /> Colaboraciones
                      </h3>
                      <div className="space-y-4 overflow-y-auto max-h-64 sm:max-h-96 flex-grow pb-5">
                        {topSongs.map((song) => (
                          <div key={song.id} className="flex items-center space-x-4 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors">
                            <Image
                              src={song.cover}
                              alt={song.title}
                              width={48}
                              height={48}
                              className="rounded-md"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm mb-1">{song.title}</h4>
                              <p className="text-xs text-gray-300 mb-2">{song.artist}</p>
                              <Badge variant="secondary" className="bg-purple-500 text-white text-xs">
                                {(song.streams || 0).toFixed(0)}M Reproducciones
                              </Badge>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handlePlayPause(song)}
                            >
                              {isSongPlaying(song.id) ? (
                                <Pause className="text-white h-5 w-5 sm:h-6 sm:w-6" />
                              ) : (
                                <Play className="text-white h-5 w-5 sm:h-6 sm:w-6" />
                              )}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
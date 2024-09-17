'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Play, Pause, Music, Disc, Clock, Calendar, Share2, X } from "lucide-react"
import { Album, Song } from '@/app/data/musicData'
import { useMusicPlayer } from '@/app/contexts/MusicPlayerContext'

interface MusicGalleryProps {
  album: Album
  onSongClick: (song: Song) => void
  onBack: () => void
}

export default function MusicGallery({ album, onSongClick, onBack }: MusicGalleryProps) {
  const { pause, isPlaying, currentSong, playSpecificSong } = useMusicPlayer()
  const [hoveredSong, setHoveredSong] = useState<string | null>(null)
  const [showStats, setShowStats] = useState(true)

  const handlePlayPause = (song: Song) => {
    if (currentSong?.id === song.id && isPlaying) {
      pause()
    } else {
      playSpecificSong(song)
    }
  }

  const totalPlays = album.songs.reduce((sum, song) => sum + song.totalplays, 0)
  const totalDuration = album.songs.reduce((sum, song) => sum + (song.duration || 0), 0)

  return (
    <div className="min-h-screen bg-[url('/quelede.jpg')] bg-cover bg-center bg-fixed">
      <div className="fixed inset-0 backdrop-blur-md bg-black/50 overflow-hidden">
        <div className="absolute inset-0 overflow-y-auto">
          <div className="min-h-screen flex flex-col p-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button onClick={onBack} variant="link" className="text-white mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Volver
              </Button>
            </motion.div>

            <AnimatePresence>
              {showStats && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <Card className="bg-white/10 text-white overflow-hidden border-0 shadow-2xl">
                    <CardContent className="p-6">
                      <div className="flex justify-end">
                        <Button variant="ghost" size="icon" onClick={() => setShowStats(false)}>
                          <X className="text-white h-6 w-6" />
                        </Button>
                      </div>
                      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                        <img
                          src={album.cover || '/placeholder.svg?height=300&width=300'}
                          alt={album.title}
                          width={300}
                          height={300}
                          className="rounded-lg shadow-lg"
                        />
                        <div className="flex-1 space-y-4">
                          <h1 className="text-4xl font-bold">{album.title}</h1>
                          <p className="text-xl text-gray-300">{album.artist}</p>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center">
                              <Music className="mr-2 h-5 w-5 text-purple-400" />
                              <span>{album.songs.length} Canciones</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-2 h-5 w-5 text-purple-400" />
                              <span>{Math.floor(totalDuration / 60)}:{(totalDuration % 60).toString().padStart(2, '0')}</span>
                            </div>
                            <div className="flex items-center">
                              <Disc className="mr-2 h-5 w-5 text-purple-400" />
                              <span>{totalPlays.toLocaleString()} Reproducciones</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-5 w-5 text-purple-400" /> 
                              <span>{album.releaseDate}</span>
                            </div>
                          </div>
                          <div className="flex space-x-4">
                            <Button
                              variant="secondary"
                              className="bg-[#1DB954] hover:bg-[#1ed760] text-white"
                              onClick={() => window.open(album.spotifyUrl, '_blank')}
                            >
                              Abrir en Spotify
                            </Button>
                            <Button variant="outline" className="text-white border-white hover:bg-white/20">
                              <Share2 className="mr-2 h-4 w-4" /> Compartir
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.h2
              className="text-3xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
               Canciones 
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              <AnimatePresence>
                {album.songs.map((song, index) => (
                  <motion.div
                    key={song.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => setHoveredSong(song.id)}
                    onHoverEnd={() => setHoveredSong(null)}
                  >
                    <Card className="bg-white/10 cursor-pointer" onClick={() => onSongClick(song)}>
                      <CardContent className="p-0 relative">
                        <img
                          src={song.cover || '/placeholder.svg?height=200&width=200'}
                          alt={song.title}
                          width={200}
                          height={200}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                          {hoveredSong === song.id && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handlePlayPause(song)
                                }}
                              >
                                {currentSong?.id === song.id && isPlaying ? (
                                  <Pause className="text-white h-12 w-12" />
                                ) : (
                                  <Play className="text-white h-12 w-12" />
                                )}
                              </Button>
                            </motion.div>
                          )}
                        </div>
                        <div className="p-4">
                          <h2 className="text-white text-xl font-semibold mb-1">{song.title}</h2>
                          <p className="text-gray-300 text-sm mb-1">{song.artist}</p>
                          <p className="text-gray-400 text-xs">{song.releaseDate}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Music, 
  Play, 
  Pause,
  Calendar,
  Disc,
  ExternalLink
} from 'lucide-react'
import { Album, albums } from '@/data/musicData' // Import albums data
import { useMusicPlayer } from '@/app/contexts/MusicPlayerContext'
import Image from 'next/image'
import { getImageUrl } from '@/config/storage'
import { AlbumDetails } from './AlbumDetails'

interface GalleryProps {
  onBack: () => void
}

export default function Gallery({ onBack }: GalleryProps) {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null)
  const { playSpecificSong, pause, isSongPlaying } = useMusicPlayer()
  const [hoveredAlbum, setHoveredAlbum] = useState<string | null>(null)

  const handleAlbumSelect = (album: Album) => {
    setSelectedAlbum(album)
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url('${getImageUrl('quelede.jpg')}')`}}
    >
      <div className="fixed inset-0 backdrop-blur-md bg-black/50">
        <div className="h-16" />
        <div className="absolute inset-0 top-16 overflow-y-auto">
          <AnimatePresence mode="wait">
            {selectedAlbum ? (
              <AlbumDetails 
                album={selectedAlbum} 
                onBack={() => setSelectedAlbum(null)}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="container mx-auto p-8"
              >
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-bold text-white mb-8 flex items-center gap-3"
                >
                  <Disc className="h-8 w-8" />
                  Discografía
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {albums.map((album, index) => (
                    <motion.div
                      key={album.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group"
                    >
                      <Card 
                        className="bg-black/40 overflow-hidden cursor-pointer hover:bg-white/5 transition-all duration-300"
                        onClick={() => handleAlbumSelect(album)}
                        onMouseEnter={() => setHoveredAlbum(album.id)}
                        onMouseLeave={() => setHoveredAlbum(null)}
                      >
                        <div className="relative aspect-square">
                          <Image
                            src={album.cover}
                            alt={album.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-4 left-4 right-4">
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={hoveredAlbum === album.id ? { opacity: 1, y: 0 } : {}}
                                className="space-y-2"
                              >
                                <h3 className="text-xl font-bold">{album.title}</h3>
                                <p className="text-gray-300">{album.artist}</p>
                                <div className="flex items-center gap-2 text-gray-400">
                                  <Calendar className="h-4 w-4" />
                                  {album.releaseDate}
                                </div>
                                {album.spotifyUrl && (
                                  <a
                                    href={album.spotifyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                    Abrir en Spotify
                                  </a>
                                )}
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
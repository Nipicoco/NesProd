'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Music, Play, ChevronLeft, ChevronRight } from 'lucide-react'
import { albums, Album } from '@/data/musicData'
import { AlbumExpanded } from './AlbumGallery/AlbumExpanded'
import Image from 'next/image'
import { getImageUrl } from '@/config/storage'

interface AlbumGalleryProps {
  onBack: () => void
}

export default function AlbumGallery({ onBack }: AlbumGalleryProps) {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null)
  const [hoveredAlbum, setHoveredAlbum] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    
    const scrollAmount = 300
    const targetScroll = scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)
    
    scrollRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    })
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
              <motion.div
                key="expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <AlbumExpanded 
                  album={selectedAlbum} 
                  onBack={() => setSelectedAlbum(null)} 
                />
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="container mx-auto p-8"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Music className="h-8 w-8" />
                    Álbumes
                  </h2>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleScroll('left')}
                      className="text-white hover:bg-white/10"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleScroll('right')}
                      className="text-white hover:bg-white/10"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </div>
                </div>

                <div 
                  ref={scrollRef}
                  className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
                >
                  {albums.map((album) => (
                    <motion.div
                      key={album.id}
                      className="flex-shrink-0 w-[300px] snap-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setSelectedAlbum(album)}
                    >
                      <Card 
                        className="bg-black/40 overflow-hidden cursor-pointer group"
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
                                <p className="text-gray-300 text-sm">{album.artist}</p>
                                <p className="text-gray-400 text-sm">{album.releaseDate}</p>
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
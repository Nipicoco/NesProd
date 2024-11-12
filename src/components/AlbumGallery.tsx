'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Music } from "lucide-react"
import { albums, Album } from '@/app/data/musicData'
import Image from 'next/image'

interface AlbumGalleryProps {
  onAlbumClick: (album: Album) => void;
  onBack: () => void;
}

export default function AlbumGallery({ onAlbumClick, onBack }: AlbumGalleryProps) {
  const [hoveredAlbum, setHoveredAlbum] = useState<string | null>(null)

  return (
    <>
      <div className="min-h-screen bg-[url('/quelede.jpg')] bg-cover bg-center bg-fixed">
        <div className="fixed inset-0 backdrop-blur-md bg-black/50 overflow-hidden">
          <div className="h-16" />
          <div className="absolute inset-0 top-16 overflow-y-auto">
            <div className="min-h-screen flex flex-col p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                <AnimatePresence>
                  {albums.map((album, index) => (
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
                      <Card 
                        className="bg-white/10 cursor-pointer overflow-hidden"
                        onClick={() => onAlbumClick(album)}
                      >
                        <CardContent className="p-0 relative">
                          <Image 
                            src={album.cover} 
                            alt={album.title} 
                            width={400}
                            height={300}
                            className="w-full h-48 object-cover" 
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                            {hoveredAlbum === album.id && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                <Music className="text-white h-12 w-12" />
                              </motion.div>
                            )}
                          </div>
                          <div className="p-4">
                            <h2 className="text-white text-xl font-semibold mb-1">{album.title}</h2>
                            <p className="text-gray-300 text-sm mb-1">{album.artist}</p>
                            <p className="text-gray-400 text-xs">{album.releaseDate}</p>
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
    </>
  )
}
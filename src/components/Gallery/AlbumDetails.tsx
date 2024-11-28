'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Music,
  Calendar,
  ExternalLink,
  Share2
} from 'lucide-react'
import { Album } from '@/data/musicData'
import { useMusicPlayer } from '@/app/contexts/MusicPlayerContext'
import Image from 'next/image'

interface AlbumDetailsProps {
  album: Album
  onBack: () => void
}

export function AlbumDetails({ album, onBack }: AlbumDetailsProps) {
  const { playSpecificSong, pause, isSongPlaying } = useMusicPlayer()
  const [isImageExpanded, setIsImageExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto p-8"
    >
      <div className="relative">
        <motion.div
          className={`relative ${isImageExpanded ? 'h-[70vh]' : 'h-64'} transition-all duration-500`}
          onClick={() => setIsImageExpanded(!isImageExpanded)}
        >
          <Image
            src={album.cover}
            alt={album.title}
            fill
            className="object-cover rounded-lg cursor-pointer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <motion.h1 
              className="text-4xl font-bold mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {album.title}
            </motion.h1>
            <motion.div 
              className="flex items-center gap-4 text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span>{album.artist}</span>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {album.releaseDate}
              </div>
            </motion.div>
          </div>
        </motion.div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        {album.spotifyUrl && (
          <a
            href={album.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 right-4"
          >
            <Button 
              variant="ghost"
              className="bg-[#1DB954] hover:bg-[#1ed760] text-white gap-2"
            >
              Open in Spotify
              <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
        )}
      </div>

      <ScrollArea className="mt-8 h-[calc(100vh-24rem)]">
        <div className="space-y-4">
          {album.songs.map((song, index) => (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`bg-white/5 hover:bg-white/10 transition-colors ${
                  isSongPlaying(song.id) ? 'border-blue-500' : 'border-transparent'
                }`}
              >
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                      onClick={() => 
                        isSongPlaying(song.id) ? pause() : playSpecificSong(song)
                      }
                    >
                      {isSongPlaying(song.id) ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5" />
                      )}
                    </Button>
                    <div>
                      <h3 className="font-medium">{song.title}</h3>
                      <p className="text-sm text-gray-400">{song.artist}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </motion.div>
  )
}
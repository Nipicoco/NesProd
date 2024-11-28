'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Play, Pause, Music, Calendar, Clock, 
  Share2, ExternalLink, Disc, ArrowLeft, 
  ListMusic, BarChart3, Heart, X 
} from 'lucide-react'
import { Album, Song } from '@/data/musicData'
import { useMusicPlayer } from '@/app/contexts/MusicPlayerContext'
import Image from 'next/image'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

interface AlbumDetailsProps {
  album: Album
  onBack: () => void
}


 export function AlbumDetails({ album, onBack }: AlbumDetailsProps) {
  const { playSpecificSong, pause, isSongPlaying } = useMusicPlayer()
  const totalDuration = album.songs.reduce((acc, song) => acc + (song.duration || 0), 0)
  const totalPlays = album.songs.reduce((acc, song) => acc + (song.totalplays || 0), 0)

  return (
    <div className="container mx-auto p-8">
      {/* Back Button */}
      <motion.button
        onClick={onBack}
        className="text-white mb-6 flex items-center hover:text-gray-300 transition-colors"
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="mr-2 h-5 w-5" /> Volver a Discografía
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 backdrop-blur-md">
        {/* Left Card - Album Info */}
        <Card className="lg:col-span-1 bg-black/40 text-white border-0 shadow-2xl backdrop-blur-sm">
          <div className="p-6 space-y-6">
            {/* Album Cover */}
            <div className="relative aspect-square rounded-lg overflow-hidden group">
              <Image
                src={album.cover}
                alt={album.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                quality={95}
                priority
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:scale-110 transition-transform"
                  onClick={() => playSpecificSong(album.songs[0])}
                >
                  <Play className="h-12 w-12" />
                </Button>
              </div>
            </div>
            
            {/* Album Info */}
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-white">{album.title}</h1>
                <p className="text-gray-400">{album.artist}</p>
              </div>
              
              {/* Album Stats */}
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {album.releaseDate}
                </div>
                <div className="flex items-center gap-2">
                  <ListMusic className="h-4 w-4" />
                  {album.songs.length} tracks
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {Math.floor(totalDuration / 60)}:{(totalDuration % 60).toString().padStart(2, '0')}
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  {totalPlays.toLocaleString()} plays
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {album.spotifyUrl && (
                  <a
                    href={album.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button 
                      className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-white gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Listen on Spotify
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Right Card - Songs List */}
        <Card className="lg:col-span-2 bg-black/40 backdrop-blur-sm border-0 max-h-[80vh] overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-6 space-y-2">
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
                          <h3 className="font-medium text-white">{song.title}</h3>
                          <p className="text-sm text-gray-300">{song.artist}</p>
                        </div>
                      </div>
                      {song.duration && (
                        <span className="text-sm text-gray-300">
                          {Math.floor(song.duration / 60)}:
                          {(song.duration % 60).toString().padStart(2, '0')}
                        </span>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  )
}
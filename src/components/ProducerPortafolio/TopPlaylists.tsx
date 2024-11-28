'use client'

import Image from 'next/image'
import { Music, Play } from 'lucide-react'
import { motion } from 'framer-motion'

interface Playlist {
  id: string
  name: string
  followers: string
  imageUrl: string
  url: string
}

interface TopPlaylistsProps {
  playlists: Playlist[]
}

export function TopPlaylists({ playlists }: TopPlaylistsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="lg:col-span-3"
    >
      <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 shadow-2xl">
        <div className="flex items-center gap-2 mb-6">
          <Music className="h-5 w-5" />
          <h3 className="text-xl font-bold">Featured In Top Playlists</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {playlists.map((playlist) => (
            <a
              key={playlist.id}
              href={playlist.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center gap-3 p-3">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={playlist.imageUrl}
                    alt={playlist.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold truncate">{playlist.name}</h4>
                  <p className="text-sm text-gray-400">{playlist.followers} followers</p>
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 bg-[#1DB954] rounded-full flex items-center justify-center shadow-lg">
                    <Play className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

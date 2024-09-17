'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Music, Calendar, BarChart, ArrowRight } from "lucide-react"
import Link from 'next/link'
import Image from 'next/image'

interface Track {
  id: string
  title: string
  artist: string
  album: string
  cover: string
  releaseDate: string
  popularity: number
  spotifyUrl: string
}

export default function StatsPage() {
  const [tracks, setTracks] = useState<Track[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/spotify/top-tracks')
      .then(res => res.json())
      .then(data => {
        setTracks(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching tracks:', error)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-[url('/quelede.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 backdrop-blur-md bg-black/70"></div>
      <div className="relative z-10 p-8 max-w-7xl mx-auto">
        <Link href="/">
          <Button variant="ghost" className="mb-6 text-white">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver a la página principal
          </Button>
        </Link>
        <motion.h1 
          className="text-4xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Artist Top Tracks
        </motion.h1>
        {loading ? (
          <motion.div 
            className="flex justify-center items-center h-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tracks.slice(0, 10).map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-md text-white overflow-hidden hover:bg-white/20 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Image
                        src={track.cover}
                        alt={track.title}
                        width={80}
                        height={80}
                        className="rounded-md"
                      />
                      <div>
                        <h2 className="font-semibold text-lg">{track.title}</h2>
                        <p className="text-sm text-gray-300">{track.artist}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Music className="mr-2 h-4 w-4 text-gray-400" />
                        <span>{track.album}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                        <span>{new Date(track.releaseDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <BarChart className="mr-2 h-4 w-4 text-gray-400" />
                        <span>Popularity: {track.popularity}</span>
                      </div>
                    </div>
                    <a
                      href={track.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-sm text-green-400 hover:text-green-300 transition-colors"
                    >
                      Listen on Spotify
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { getImageUrl } from '@/config/storage'
import { BeatList } from './BeatList'
import { BeatPlayer } from './BeatPlayer'
import { BeatDetails } from './BeatDetails'
import { useToast } from "@/hooks/use-toast"
import { Beat, BeatFolder } from './types'
import { mockBeatFolders } from './mockData'

export default function Marketplace() {
  const [selectedFolder, setSelectedFolder] = useState<BeatFolder | null>(null)
  const [selectedBeat, setSelectedBeat] = useState<Beat | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    return () => {
      setIsPlaying(false)
    }
  }, [])

  useEffect(() => {
    setIsPlaying(false)
  }, [selectedBeat])

  const handleBeatSelect = (beat: Beat) => {
    if (selectedBeat?.id === beat.id) {
      setIsPlaying(!isPlaying)
    } else {
      setSelectedBeat(beat)
      setIsPlaying(true)
    }
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleBeatPurchase = () => {
    toast({
      title: "¡Contacto iniciado!",
      description: "Te redirigiremos al formulario de contacto.",
    })
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url('${getImageUrl('quelede.jpg')}')`}}
    >
      <div className="fixed inset-0 backdrop-blur-md bg-black/50">
        <div className="container mx-auto h-screen pt-16">
          <div className="h-full p-4 md:p-8 flex flex-col">
            {/* Grid Layout */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 h-full max-h-[calc(100vh-7rem)]">
              {/* Left Panel - Beat Folders and List */}
              <div className="lg:col-span-1 h-full">
                <BeatList
                  folders={mockBeatFolders}
                  selectedFolder={selectedFolder}
                  onFolderSelect={setSelectedFolder}
                  onBeatSelect={handleBeatSelect}
                  selectedBeat={selectedBeat}
                />
              </div>

              {/* Right Panel - Beat Player and Details */}
              <div className="lg:col-span-2 h-full">
                <Card className="bg-black/40 text-white border-none backdrop-blur-md h-full flex flex-col">
                  <AnimatePresence mode="wait">
                    {selectedBeat ? (
                      <motion.div
                        key="beat-details"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="p-6 flex flex-col h-full"
                      >
                        <BeatPlayer
                          beat={selectedBeat}
                          isPlaying={isPlaying}
                          onPlayPause={handlePlayPause}
                        />
                        <div className="flex-1 overflow-y-auto mt-6">
                          <BeatDetails
                            beat={selectedBeat}
                            onPurchase={handleBeatPurchase}
                          />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="no-selection"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-full flex items-center justify-center p-8 text-center"
                      >
                        <div className="space-y-4">
                          <h2 className="text-2xl font-bold">Beats Disponibles</h2>
                          <p className="text-gray-400">
                            Selecciona un beat para escuchar y ver más detalles
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
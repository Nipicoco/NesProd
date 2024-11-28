'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Music, Play } from 'lucide-react'
import { BeatFolder } from '@/components/Marketplace/types'
import Image from 'next/image'

interface LivePreviewProps {
  folders: BeatFolder[]
  selectedFolder: BeatFolder | null
}

export function LivePreview({ folders, selectedFolder }: LivePreviewProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Vista Previa</h3>
      
      <Card className="bg-black/20 backdrop-blur-md p-4 h-[600px]">
        <ScrollArea className="h-full">
          <AnimatePresence mode="wait">
            {selectedFolder ? (
              <motion.div
                key={selectedFolder.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={selectedFolder.cover}
                    alt={selectedFolder.name}
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">{selectedFolder.name}</h4>
                    <p className="text-gray-400">{selectedFolder.description}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {selectedFolder.beats.map((beat) => (
                    <motion.div
                      key={beat.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <Music className="h-4 w-4" />
                        <div>
                          <p className="font-medium">{beat.title}</p>
                          <p className="text-sm text-gray-400">
                            {beat.bpm} BPM • {beat.key}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-blue-400">${beat.price}</span>
                        <Play className="h-4 w-4" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex items-center justify-center text-gray-400"
              >
                Selecciona una carpeta para ver la vista previa
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollArea>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        {folders.slice(0, 3).map((folder) => (
          <motion.div
            key={folder.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group cursor-pointer"
          >
            <Image
              src={folder.cover}
              alt={folder.name}
              width={150}
              height={150}
              className="rounded-lg"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <p className="text-sm font-medium">{folder.name}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, ChevronRight, Music } from 'lucide-react'
import { BeatFolder, Beat } from './types'
import Image from 'next/image'

interface BeatListProps {
  folders: BeatFolder[]
  selectedFolder: BeatFolder | null
  selectedBeat: Beat | null
  onFolderSelect: (folder: BeatFolder) => void
  onBeatSelect: (beat: Beat) => void
}

export function BeatList({
  folders,
  selectedFolder,
  selectedBeat,
  onFolderSelect,
  onBeatSelect
}: BeatListProps) {
  return (
    <Card className="bg-black/40 text-white border-none backdrop-blur-md h-full">
      <ScrollArea className="h-full">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Colecciones</h2>
          <div className="space-y-3">
            {folders.map((folder) => (
              <motion.div
                key={folder.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div
                  className="flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-white/5 transition-colors"
                  onClick={() => onFolderSelect(folder)}
                >
                  <Image
                    src={folder.cover}
                    alt={folder.name}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{folder.name}</h3>
                    <p className="text-sm text-gray-400 truncate">{folder.description}</p>
                  </div>
                  {selectedFolder?.id === folder.id ? (
                    <ChevronDown className="h-5 w-5 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="h-5 w-5 flex-shrink-0" />
                  )}
                </div>

                <AnimatePresence>
                  {selectedFolder?.id === folder.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      {folder.beats.map((beat) => (
                        <motion.div
                          key={beat.id}
                          className={`ml-4 p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedBeat?.id === beat.id
                              ? 'bg-white/10'
                              : 'hover:bg-white/5'
                          }`}
                          onClick={() => onBeatSelect(beat)}
                        >
                          <div className="flex items-center gap-3">
                            <Music className="h-4 w-4 flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="font-medium truncate">{beat.title}</p>
                              <p className="text-sm text-gray-400">
                                {beat.bpm} BPM • {beat.key}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </Card>
  )
}
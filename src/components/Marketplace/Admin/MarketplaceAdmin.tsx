'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getImageUrl } from '@/config/storage'
import { FolderManager } from './FolderManager'
import { BeatManager } from './BeatManager'
import { useToast } from "@/hooks/use-toast"
import { BeatFolder } from '../types'
import { mockBeatFolders } from '../mockData'

export default function MarketplaceAdmin() {
  const [folders, setFolders] = useState<BeatFolder[]>(mockBeatFolders)
  const { toast } = useToast()

  const handleFolderAdd = (newFolder: BeatFolder) => {
    setFolders([...folders, newFolder])
    toast({
      title: "Carpeta creada",
      description: `La carpeta "${newFolder.name}" ha sido creada exitosamente.`
    })
  }

  const handleFolderDelete = (folderId: string) => {
    setFolders(folders.filter(folder => folder.id !== folderId))
    toast({
      title: "Carpeta eliminada",
      description: "La carpeta ha sido eliminada exitosamente."
    })
  }

  const handleBeatAdd = (folderId: string, newBeat: any) => {
    setFolders(folders.map(folder => {
      if (folder.id === folderId) {
        return {
          ...folder,
          beats: [...folder.beats, newBeat]
        }
      }
      return folder
    }))
    toast({
      title: "Beat agregado",
      description: `El beat "${newBeat.title}" ha sido agregado exitosamente.`
    })
  }

  const handleBeatDelete = (folderId: string, beatId: string) => {
    setFolders(folders.map(folder => {
      if (folder.id === folderId) {
        return {
          ...folder,
          beats: folder.beats.filter(beat => beat.id !== beatId)
        }
      }
      return folder
    }))
    toast({
      title: "Beat eliminado",
      description: "El beat ha sido eliminado exitosamente."
    })
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed pt-24"
      style={{ backgroundImage: `url('${getImageUrl('quelede.jpg')}')`}}
    >
      <div className="fixed inset-0 pt-16 backdrop-blur-md bg-black/50">
        <div className="container mx-auto px-4 py-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white mb-8 text-center"
          >
            Administrar Marketplace
          </motion.h1>

          <Card className="bg-black/40 text-white border-none backdrop-blur-md p-6">
            <Tabs defaultValue="folders" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/10">
                <TabsTrigger value="folders" className="text-white">
                  Carpetas
                </TabsTrigger>
                <TabsTrigger value="beats" className="text-white">
                  Beats
                </TabsTrigger>
              </TabsList>

              <TabsContent value="folders">
                <FolderManager
                  folders={folders}
                  onFolderAdd={handleFolderAdd}
                  onFolderDelete={handleFolderDelete}
                />
              </TabsContent>

              <TabsContent value="beats">
                <BeatManager
                  folders={folders}
                  onBeatAdd={handleBeatAdd}
                  onBeatDelete={handleBeatDelete}
                />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  )
}
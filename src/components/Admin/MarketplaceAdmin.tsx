'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FolderManager } from './MarketplaceAdmin/FolderManager'
import { BeatManager } from './MarketplaceAdmin/BeatManager'
import { LivePreview } from './MarketplaceAdmin/LivePreview'
import { useToast } from "@/hooks/use-toast"
import { BeatFolder } from '@/components/Marketplace/types'
import { mockBeatFolders } from '@/components/Marketplace/mockData'

export function MarketplaceAdmin() {
  const [folders, setFolders] = useState<BeatFolder[]>(mockBeatFolders)
  const [selectedFolder, setSelectedFolder] = useState<BeatFolder | null>(null)
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
    <div className="p-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-8">
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
                onFolderSelect={setSelectedFolder}
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
        </div>

        {/* Live Preview */}
        <LivePreview 
          folders={folders}
          selectedFolder={selectedFolder}
        />
      </div>
    </div>
  )
}
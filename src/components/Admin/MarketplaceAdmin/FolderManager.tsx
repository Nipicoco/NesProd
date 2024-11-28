'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Folder, Trash2, Upload } from 'lucide-react'
import { BeatFolder } from '@/components/Marketplace/types'
import Image from 'next/image'

interface FolderManagerProps {
  folders: BeatFolder[]
  onFolderAdd: (folder: BeatFolder) => void
  onFolderDelete: (folderId: string) => void
  onFolderSelect: (folder: BeatFolder) => void
}

export function FolderManager({
  folders,
  onFolderAdd,
  onFolderDelete,
  onFolderSelect
}: FolderManagerProps) {
  const [newFolder, setNewFolder] = useState({
    name: '',
    description: '',
    cover: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const folder: BeatFolder = {
      id: Date.now().toString(),
      name: newFolder.name,
      description: newFolder.description,
      cover: newFolder.cover || '/default-cover.jpg',
      beats: []
    }

    onFolderAdd(folder)
    setNewFolder({ name: '', description: '', cover: '' })
  }

  return (
    <div className="space-y-6">
      {/* Add New Folder Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Nombre de la Carpeta</Label>
            <Input
              id="name"
              value={newFolder.name}
              onChange={(e) => setNewFolder({ ...newFolder, name: e.target.value })}
              className="bg-white/10 border-none text-white"
              placeholder="Ej: Trap Beats 2024"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="cover">Portada (URL)</Label>
            <Input
              id="cover"
              value={newFolder.cover}
              onChange={(e) => setNewFolder({ ...newFolder, cover: e.target.value })}
              className="bg-white/10 border-none text-white"
              placeholder="URL de la imagen"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            value={newFolder.description}
            onChange={(e) => setNewFolder({ ...newFolder, description: e.target.value })}
            className="bg-white/10 border-none text-white"
            placeholder="Describe esta colección de beats..."
            required
          />
        </div>

        <Button type="submit" className="w-full">
          <Folder className="mr-2 h-4 w-4" />
          Crear Nueva Carpeta
        </Button>
      </form>

      {/* Existing Folders List */}
      <ScrollArea className="h-[400px] rounded-md border border-white/10 p-4">
        <div className="space-y-4">
          {folders.map((folder) => (
            <motion.div
              key={folder.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              onClick={() => onFolderSelect(folder)}
            >
              <div className="flex items-center gap-4">
                {folder.cover && (
                  <Image
                    src={folder.cover}
                    alt={folder.name}
                    width={60}
                    height={60}
                    className="rounded-md"
                  />
                )}
                <div>
                  <h3 className="font-semibold">{folder.name}</h3>
                  <p className="text-sm text-gray-400">{folder.description}</p>
                  <p className="text-sm text-gray-500">
                    {folder.beats.length} beats
                  </p>
                </div>
              </div>

              <Button
                variant="destructive"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  onFolderDelete(folder.id)
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
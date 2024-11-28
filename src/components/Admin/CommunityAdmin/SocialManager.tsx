'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Trash2, Plus, Image as ImageIcon } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { SocialPost, InstagramPhoto } from '@/data/socialData'
import Image from 'next/image'

export function SocialManager() {
  const [posts, setPosts] = useState<SocialPost[]>([])
  const [photos, setPhotos] = useState<InstagramPhoto[]>([])
  const { toast } = useToast()

  const [newPost, setNewPost] = useState({
    platform: 'instagram',
    content: '',
    image: ''
  })

  const [newPhoto, setNewPhoto] = useState({
    url: '',
    caption: ''
  })

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault()
    
    const post: SocialPost = {
      id: Date.now().toString(),
      platform: newPost.platform as 'instagram' | 'twitter',
      author: {
        name: 'NES',
        username: 'nesontheshet',
        avatar: '/NES2.jpg'
      },
      content: newPost.content,
      image: newPost.image || undefined,
      likes: 0,
      comments: 0,
      timestamp: new Date().toISOString()
    }

    setPosts([post, ...posts])
    setNewPost({
      platform: 'instagram',
      content: '',
      image: ''
    })

    toast({
      title: "Post agregado",
      description: "El post ha sido agregado exitosamente."
    })
  }

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault()
    
    const photo: InstagramPhoto = {
      id: Date.now().toString(),
      url: newPhoto.url,
      caption: newPhoto.caption,
      likes: 0
    }

    setPhotos([photo, ...photos])
    setNewPhoto({
      url: '',
      caption: ''
    })

    toast({
      title: "Foto agregada",
      description: "La foto ha sido agregada exitosamente."
    })
  }

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter(post => post.id !== id))
    toast({
      title: "Post eliminado",
      description: "El post ha sido eliminado exitosamente."
    })
  }

  const handleDeletePhoto = (id: string) => {
    setPhotos(photos.filter(photo => photo.id !== id))
    toast({
      title: "Foto eliminada",
      description: "La foto ha sido eliminada exitosamente."
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
      {/* Posts Manager */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold">Gestionar Posts</h3>
        
        <form onSubmit={handleAddPost} className="space-y-4">
          <div>
            <Label>Plataforma</Label>
            <Select
              value={newPost.platform}
              onValueChange={(value) => setNewPost({ ...newPost, platform: value })}
            >
              <SelectTrigger className="bg-white/10 border-none">
                <SelectValue placeholder="Selecciona la plataforma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Contenido</Label>
            <Textarea
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              className="bg-white/10 border-none min-h-[100px]"
              placeholder="Escribe el contenido del post..."
              required
            />
          </div>

          <div>
            <Label>URL de la imagen (opcional)</Label>
            <Input
              value={newPost.image}
              onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
              className="bg-white/10 border-none"
              placeholder="https://..."
            />
          </div>

          <Button type="submit" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Agregar Post
          </Button>
        </form>

        <ScrollArea className="h-[300px] rounded-md border border-white/10 p-4">
          <div className="space-y-4">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-white/5 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-400">{post.platform}</p>
                      <p className="mt-1">{post.content}</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  {post.image && (
                    <div className="mt-2">
                      <Image
                        src={post.image}
                        alt="Post preview"
                        width={100}
                        height={100}
                        className="rounded-md"
                      />
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Photos Manager */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold">Gestionar Fotos</h3>
        
        <form onSubmit={handleAddPhoto} className="space-y-4">
          <div>
            <Label>URL de la foto</Label>
            <Input
              value={newPhoto.url}
              onChange={(e) => setNewPhoto({ ...newPhoto, url: e.target.value })}
              className="bg-white/10 border-none"
              placeholder="https://..."
              required
            />
          </div>

          <div>
            <Label>Descripción</Label>
            <Input
              value={newPhoto.caption}
              onChange={(e) => setNewPhoto({ ...newPhoto, caption: e.target.value })}
              className="bg-white/10 border-none"
              placeholder="Descripción de la foto..."
              required
            />
          </div>

          <Button type="submit" className="w-full">
            <ImageIcon className="mr-2 h-4 w-4" />
            Agregar Foto
          </Button>
        </form>

        <ScrollArea className="h-[300px] rounded-md border border-white/10 p-4">
          <div className="grid grid-cols-2 gap-4">
            {photos.map((photo) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card className="bg-white/5 overflow-hidden">
                  <div className="relative aspect-square">
                    <Image
                      src={photo.url}
                      alt={photo.caption}
                      fill
                      className="object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => handleDeletePhoto(photo.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-2">
                    <p className="text-sm truncate">{photo.caption}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollArea>

        {/* Live Preview */}
        <Card className="bg-white/5 p-4">
          <h4 className="text-lg font-semibold mb-4">Vista Previa</h4>
          <div className="aspect-square relative rounded-lg overflow-hidden">
            {photos[0] && (
              <Image
                src={photos[0].url}
                alt={photos[0].caption}
                fill
                className="object-cover"
              />
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
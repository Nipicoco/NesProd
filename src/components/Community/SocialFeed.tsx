'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Instagram, 
  Heart, 
  MessageCircle, 
  Share2,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import Image from 'next/image'
import { getImageUrl } from '@/config/storage'
import { socialPosts, instagramPhotos } from '@/data/socialData'

export function SocialFeed() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % instagramPhotos.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const handleNextPhoto = () => {
    setIsAutoPlaying(false)
    setCurrentPhotoIndex((prev) => (prev + 1) % instagramPhotos.length)
  }

  const handlePrevPhoto = () => {
    setIsAutoPlaying(false)
    setCurrentPhotoIndex((prev) => (prev - 1 + instagramPhotos.length) % instagramPhotos.length)
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Instagram Profile and Slideshow */}
        <div className="lg:col-span-1 space-y-6">
          {/* Instagram Profile Card */}
          <Card className="bg-white/5 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={getImageUrl('NES2.jpg')} alt="NES" />
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">@nesontheshet</h3>
                  <p className="text-gray-400">Productor Musical</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 text-center mb-6">
                <div>
                  <div className="text-2xl font-bold">150K</div>
                  <div className="text-sm text-gray-400">Seguidores</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">1.2K</div>
                  <div className="text-sm text-gray-400">Posts</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">500</div>
                  <div className="text-sm text-gray-400">Siguiendo</div>
                </div>
              </div>

              <a
                href="https://instagram.com/nesontheshet"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                <Instagram className="inline-block mr-2 h-4 w-4" />
                Seguir en Instagram
              </a>
            </div>
          </Card>

          {/* Photo Slideshow */}
          <Card className="bg-white/5 overflow-hidden">
            <div className="relative aspect-square">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPhotoIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={instagramPhotos[currentPhotoIndex].url}
                    alt={instagramPhotos[currentPhotoIndex].caption}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm">
                      {instagramPhotos[currentPhotoIndex].caption}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrevPhoto}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              <button
                onClick={handleNextPhoto}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>

              {/* Dots Navigation */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {instagramPhotos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsAutoPlaying(false)
                      setCurrentPhotoIndex(index)
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentPhotoIndex 
                        ? 'bg-white w-4' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Social Feed */}
        <div className="lg:col-span-2">
          <ScrollArea className="h-[800px]">
            <div className="space-y-6">
              {socialPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/5 overflow-hidden">
                    {/* Post Header */}
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={post.author.avatar} alt={post.author.name} />
                        </Avatar>
                        <div>
                          <p className="font-semibold">{post.author.name}</p>
                          <p className="text-sm text-gray-400">@{post.author.username}</p>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className={post.platform === 'instagram' ? 
                          'bg-pink-500/20 text-pink-300' : 
                          'bg-blue-500/20 text-blue-300'
                        }
                      >
                        {post.platform === 'instagram' ? (
                          <Instagram className="mr-2 h-4 w-4" />
                        ) : (
                          <ExternalLink className="mr-2 h-4 w-4" />
                        )}
                        {post.platform}
                      </Badge>
                    </div>

                    {/* Post Content */}
                    <div className="px-4 pb-4">
                      <p className="text-gray-200 mb-4 whitespace-pre-line">{post.content}</p>
                      {post.image && (
                        <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                          <Image
                            src={post.image}
                            alt="Post image"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>

                    {/* Post Footer */}
                    <div className="px-4 pb-4 flex items-center justify-between text-gray-400">
                      <button className="flex items-center gap-2 hover:text-red-400 transition-colors">
                        <Heart className="h-5 w-5" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                        <MessageCircle className="h-5 w-5" />
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-green-400 transition-colors">
                        <Share2 className="h-5 w-5" />
                      </button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
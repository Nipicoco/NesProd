'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getImageUrl } from '@/config/storage'
import { Timeline } from '@/components/Community/Timeline'
import { SocialFeed } from '@/components/Community/SocialFeed'
import { NewReleases } from '@/components/Community/NewReleases'

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('releases')

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url('${getImageUrl('quelede.jpg')}')`}}
    >
      <div className="fixed inset-0 backdrop-blur-md bg-black/50">
        <main className="container mx-auto px-4 py-8 pt-24">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white mb-8"
          >
            Comunidad NES
          </motion.h1>

          <Card className="bg-black/40 text-white border-none backdrop-blur-md">
            <Tabs 
              defaultValue="releases" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 bg-white/10">
                <TabsTrigger value="releases" className="text-white">
                  Lanzamientos
                </TabsTrigger>
                <TabsTrigger value="timeline" className="text-white">
                  Timeline
                </TabsTrigger>
                <TabsTrigger value="social" className="text-white">
                  Social Feed
                </TabsTrigger>
              </TabsList>

              <TabsContent value="releases">
                <NewReleases />
              </TabsContent>

              <TabsContent value="timeline">
                <Timeline />
              </TabsContent>

              <TabsContent value="social">
                <SocialFeed />
              </TabsContent>
            </Tabs>
          </Card>
        </main>
      </div>
    </div>
  )
}
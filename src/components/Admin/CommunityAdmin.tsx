'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReleasesManager } from './CommunityAdmin/ReleasesManager'
import { BattlesManager } from './CommunityAdmin/BattlesManager'
import { TimelineManager } from './CommunityAdmin/TimelineManager'
import { SocialManager } from './CommunityAdmin/SocialManager'
import { useToast } from "@/hooks/use-toast"

export function CommunityAdmin() {
  const { toast } = useToast()

  return (
    <div className="p-6">
      <Card className="bg-black/40 text-white border-none backdrop-blur-md">
        <Tabs defaultValue="releases" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/10">
            <TabsTrigger value="releases" className="text-white">
              Lanzamientos
            </TabsTrigger>
            <TabsTrigger value="battles" className="text-white">
              Beat Battles
            </TabsTrigger>
            <TabsTrigger value="timeline" className="text-white">
              Timeline
            </TabsTrigger>
            <TabsTrigger value="social" className="text-white">
              Social Feed
            </TabsTrigger>
          </TabsList>

          <TabsContent value="releases">
            <ReleasesManager />
          </TabsContent>

          <TabsContent value="battles">
            <BattlesManager />
          </TabsContent>

          <TabsContent value="timeline">
            <TimelineManager />
          </TabsContent>

          <TabsContent value="social">
            <SocialManager />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
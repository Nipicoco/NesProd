'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getImageUrl } from '@/config/storage'
import { MarketplaceAdmin } from '@/components/Admin/MarketplaceAdmin'
import { PortafolioAdmin } from '@/components/Admin/PortafolioAdmin'
import { StatsAdmin } from '@/components/Admin/StatsAdmin'
import { CommunityAdmin } from '@/components/Admin/CommunityAdmin'
import { AdminNav } from '@/components/Admin/AdminNav'

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('marketplace')

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url('${getImageUrl('quelede.jpg')}')`}}
    >
      <div className="fixed inset-0 backdrop-blur-md bg-black/50">
        <AdminNav />
        
        <main className="container mx-auto px-4 py-8 pt-24">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <h1 className="text-4xl font-bold text-white">Panel de Administración</h1>
            <span className="text-gray-400">Acceso Restringido</span>
          </motion.div>

          <Card className="bg-black/40 text-white border-none backdrop-blur-md">
            <Tabs 
              defaultValue="marketplace" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4 bg-white/10">
                <TabsTrigger value="marketplace" className="text-white">
                  Marketplace
                </TabsTrigger>
                <TabsTrigger value="Portafolio" className="text-white">
                  Portafolio
                </TabsTrigger>
                <TabsTrigger value="community" className="text-white">
                  Comunidad
                </TabsTrigger>
                <TabsTrigger value="stats" className="text-white">
                  Estadísticas
                </TabsTrigger>
              </TabsList>

              <TabsContent value="marketplace">
                <MarketplaceAdmin />
              </TabsContent>

              <TabsContent value="Portafolio">
                <PortafolioAdmin />
              </TabsContent>

              <TabsContent value="community">
                <CommunityAdmin />
              </TabsContent>

              <TabsContent value="stats">
                <StatsAdmin />
              </TabsContent>
            </Tabs>
          </Card>
        </main>
      </div>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { MusicPlayerProvider } from './contexts/MusicPlayerContext'
import { Toaster } from "@/components/ui/toaster"
import LandingScreen from '@/components/LandingScreen'
import Discography from '@/components/Discography/Discography'
import ProducerPortafolio from '@/components/ProducerPortafolio'
import Marketplace from '@/components/Marketplace/Marketplace'
import Community from '@/components/Community'
import ContactForm from '@/components/ContactForm/ContactForm'
import Gallery from '@/components/Gallery/PhotoGallery'
import { Album, Song, topAlbums, topSongs } from '@/data/musicData'
import NavigationBar from '@/components/NavigationBar'
import Cookies from 'js-cookie'

export default function Page() {
  useEffect(() => {
    // Set cookie consent by default
    Cookies.set('cookieConsent', 'true', { expires: 365 })
  }, [])

  const [currentScreen, setCurrentScreen] = useState('landing')
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null)
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)
  const [isContactFormVisible, setIsContactFormVisible] = useState(false)
  
  const transitionToDiscography = () => {
    setCurrentScreen('discography')
  }

  const transitionToGallery = () => {
    setCurrentScreen('gallery')
  }

  const transitionToPortafolio = () => {
    setCurrentScreen('Portafolio')
  }

  const transitionToMarketplace = () => {
    setCurrentScreen('marketplace')
  }

  const transitionToCommunity = () => {
    setCurrentScreen('community')
  }

  const transitionToContact = () => {
    setIsContactFormVisible(true)
  }

  const goBack = () => {
    if (['discography', 'gallery', 'Portafolio', 'marketplace', 'community'].includes(currentScreen)) {
      setCurrentScreen('landing')
    }
  }

  const closeContactForm = () => {
    setIsContactFormVisible(false)
  }

  return (
    <MusicPlayerProvider>
      <main className="min-h-screen bg-black">
        {currentScreen !== 'landing' && (
          <NavigationBar 
            onBack={goBack}
            title={
              currentScreen === 'Portafolio' ? 'Portafolio' :
              currentScreen === 'discography' ? 'Discografía' :
              currentScreen === 'gallery' ? 'Galería' :
              currentScreen === 'marketplace' ? 'Marketplace' :
              currentScreen === 'community' ? 'Comunidad' : 'Home'
            }
          />
        )}
        <div>
          <AnimatePresence mode="wait">
            {currentScreen === 'landing' && (
              <LandingScreen 
                key="landing" 
                onDiscography={transitionToDiscography}
                onGallery={transitionToGallery}
                onContact={transitionToContact} 
                onPortafolio={transitionToPortafolio}
                onMarketplace={transitionToMarketplace}
                onCommunity={transitionToCommunity}
              />
            )}
            {currentScreen === 'Portafolio' && (
              <ProducerPortafolio 
                key="Portafolio" 
                onBack={goBack} 
                onContinue={transitionToDiscography} 
                albums={topAlbums} 
                topSongs={topSongs} 
              />
            )}
            {currentScreen === 'discography' && (
              <Discography 
                key="discography" 
                onBack={goBack}
              />
            )}
            {currentScreen === 'gallery' && (
              <Gallery 
                key="gallery" 
                onBack={goBack}
              />
            )}
            {currentScreen === 'marketplace' && (
              <Marketplace 
                key="marketplace"
              />
            )}
            {currentScreen === 'community' && (
              <Community 
                key="community"
              />
            )}
          </AnimatePresence>
        </div>
        {isContactFormVisible && (
          <ContactForm key="contact" onClose={closeContactForm} />
        )}
        <Toaster />
      </main>
    </MusicPlayerProvider>
  )
}
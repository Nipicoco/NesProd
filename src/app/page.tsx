"use client"
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { MusicPlayerProvider } from './contexts/MusicPlayerContext'
import { Toaster } from "@/components/ui/toaster"
import LandingScreen from '@/components/LandingScreen'
import AlbumGallery from '@/components/AlbumGallery'
import ProducerPortfolio from '@/components/ProducerPortfolio'
import MusicGallery from '@/components/MusicGallery'
import AlbumDetail from '@/components/SongDetail'
import ContactForm from '@/components/ContactForm'
import { Album, Song, topAlbums, topSongs } from '@/app/data/musicData'
import NavigationBar from '@/components/NavigationBar'

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('landing')
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null)
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)
  const [isContactFormVisible, setIsContactFormVisible] = useState(false)
  
  const transitionToGallery = () => {
    setCurrentScreen('gallery')
  }

  const transitionToPortfolio = () => {
    setCurrentScreen('portfolio')
  }

  const transitionToContact = () => {
    setIsContactFormVisible(true)
  }

  const transitionToAlbum = (album: Album) => {
    setSelectedAlbum(album)
    setCurrentScreen('musicGallery')
  }

  const transitionToSongDetail = (song: Song) => {
    setSelectedSong(song)
    setCurrentScreen('album')
  }

  const goBack = () => {
    if (currentScreen === 'album') {
      setCurrentScreen('musicGallery')
    } else if (currentScreen === 'musicGallery') {
      setCurrentScreen('gallery')
    } else if (currentScreen === 'gallery') {
      setCurrentScreen('landing')
    } else if (currentScreen === 'portfolio') {
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
              currentScreen === 'portfolio' ? 'Portfolio' :
              currentScreen === 'gallery' ? 'Albums' :
              currentScreen === 'musicGallery' ? selectedAlbum?.title || 'Album' :
              currentScreen === 'album' ? selectedSong?.title || 'Song' : 'Home'
            }
          />
        )}
        <div>
          <AnimatePresence mode="wait">
            {currentScreen === 'landing' && (
              <LandingScreen key="landing" onContinue={transitionToGallery} onContact={transitionToContact} onPortfolio={transitionToPortfolio} />
            )}
            {currentScreen === 'portfolio' && (
              <ProducerPortfolio key="portfolio" onBack={goBack} onContinue={transitionToGallery}  albums={topAlbums} topSongs={topSongs} />
            )}
            {currentScreen === 'gallery' && (
              <AlbumGallery key="gallery" onAlbumClick={transitionToAlbum} onBack={goBack} />
            )}
            {currentScreen === 'musicGallery' && selectedAlbum && (
              <MusicGallery key="musicGallery" album={selectedAlbum} onSongClick={transitionToSongDetail} onBack={goBack} />
            )}
            {currentScreen === 'album' && selectedSong && (
              <AlbumDetail key="album" song={selectedSong} onBack={goBack} />
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
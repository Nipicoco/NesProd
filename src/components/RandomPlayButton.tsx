'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Shuffle, Pause } from 'lucide-react'
import { useMusicPlayer } from '@/app/contexts/MusicPlayerContext'
import { albums } from '@/data/musicData'

export function RandomPlayButton() {
  const { playSpecificSong, pause, isPlaying } = useMusicPlayer()

  const playRandomSong = () => {
    const randomAlbum = albums[Math.floor(Math.random() * albums.length)]
    const randomSong = randomAlbum.songs[Math.floor(Math.random() * randomAlbum.songs.length)]
    playSpecificSong(randomSong)
  }

  const handleClick = () => {
    if (isPlaying) {
      pause()
    } else {
      playRandomSong()
    }
  }

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <motion.button
        className="flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-full overflow-hidden text-white w-14 h-14"
        onClick={handleClick}
        whileHover={{
          boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
        }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isPlaying ? 'pause' : 'play'}
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Shuffle className="h-6 w-6" />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </motion.div>
  )
}
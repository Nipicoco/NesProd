'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Music, Award, TrendingUp, Mail, Star, Play, Pause, Calendar, Mic2, Sliders, Globe2, BarChartIcon as ChartBar, Users, Instagram, AirplayIcon as Spotify, MapPin, Laptop, Package, Headphones, Clock, Speaker, Piano, Disc, BarChart3, Trophy, Music2 } from 'lucide-react'
import { Album, Song } from '@/data/musicData'
import Image from 'next/image'
import { useMusicPlayer } from '@/app/contexts/MusicPlayerContext'
import React from 'react'
import { DynamicShowcase } from './ProducerPortafolio/DynamicShowcase'
import { TopPlaylists } from './ProducerPortafolio/TopPlaylists'

interface ProducerPortafolioProps {
  onContinue: () => void
  onBack: () => void
  albums: Album[]
  topSongs: Song[]
}

type SocialMediaPlatform = 'instagram' | 'spotify'

const socialMediaConfig: Record<SocialMediaPlatform, { color: string, Icon: React.ElementType }> = {
  instagram: {
    color: 'bg-[#E1306C]',
    Icon: Instagram
  },
  spotify: {
    color: 'bg-[#1DB954]',
    Icon: Spotify
  }
}

interface FeaturedProject {
  id: number
  spotifyId: string
  title: string
  artist: string
  description: string
  coverImage: string
  spotifyUrl: string
  releaseDate: string
  achievements: string[]
  awards: {
    platinum: number;
    gold: number;
    diamond?: number;
  };
  stats: {
    totalPlays: string
    monthlyListeners: string
    chartPosition?: number
    popularity: number
    markets: number
    topCountries: Array<{ name: string, streams: string }>
    features: {
      danceability: number
      energy: number
      valence: number
      tempo: number
      acousticness: number
      instrumentalness: number
      liveness: number
      speechiness: number
    }
    streams: {
      total: string;
      monthly: string;
      peak: string;
    };
  }
}

const profileImages = [
  '/1.png',
  '/2.jpg',
  '/3.jpg',
  '/4.jpg',
  '/5.jpg'
].map((src) => {
  const img = new window.Image();
  img.src = src;
  return { src };
});

interface ProducerInfoType {
  location: {
    city: string
    country: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  name: string
  image: string
  bio: string
  achievements: Array<{
    id: number
    description: string
    isBiggest?: boolean
    isSecondBiggest?: boolean
    isHighlight?: boolean
  }>
  contact: string
  socialMedia: Array<{
    name: string
    url: string
    platform: SocialMediaPlatform
  }>
  stats: {
    monthlyListeners: string
    countries: string
    topCharts: string
    totalPlays: string
  }
  services: Array<{
    id: number
    name: string
    icon: React.ReactNode
  }>
  topCountries: Array<{
    name: string
    listeners: string
    flagFileName: string
  }>
  worldTour: Array<{
    location: string
    date: string
  }>
}

const producerInfo: ProducerInfoType = {
  location: {
    city: "Villarrica",
    country: "Chile",
    coordinates: {
      lat: -39.2857,
      lng: -72.2279
    }
  },
  name: "NES",
  image: profileImages[0].src,
  bio: "Joaquín Nicolás Rodríguez Vergara (NES), de 23 años, nació en Villarrica, Chile. Desde temprana edad ha estado inmerso en el mundo de la música, desarrollando habilidades en composición y producción musical. A través de los años, ha perfeccionado un estilo distintivo que combina magistralmente elementos del trap, reggaetón y música electrónica, consolidándose como uno de los productores más destacados de la escena musical latinoamericana.",
  achievements: [
    { id: 1, description: "Más de 15 discos de platino", isBiggest: true },
    { id: 2, description: "600+ millones de reproducciones totales", isSecondBiggest: true },
    { id: 3, description: "Productor del Año 2023", isHighlight: true },
    { id: 4, description: "Top 10 Productores en Spotify Chile", isHighlight: true },
    { id: 5, description: "Colaboraciones Internacionales", isHighlight: true },
  ],
  contact: "contacto@nesproducciones.cl",
  socialMedia: [
    { name: "Instagram", url: "https://www.instagram.com/nesontheshet/", platform: 'instagram' as SocialMediaPlatform },
    { name: "Spotify", url: "https://open.spotify.com/artist/3dC19P4w1BbDuwCailjybv", platform: 'spotify' as SocialMediaPlatform },
  ],
  stats: {
    monthlyListeners: "4.93M",
    countries: "45+",
    topCharts: "15",
    totalPlays: "600M+"
  },
  services: [
    { id: 1, name: "Producción Musical", icon: <Music className="h-5 w-5" /> },
    { id: 2, name: "Mezcla y Masterización", icon: <Sliders className="h-5 w-5" /> },
    { id: 3, name: "Composición", icon: <Mic2 className="h-5 w-5" /> },
    { id: 4, name: "Grabación Profesional", icon: <Music className="h-5 w-5" /> },
  ],
  topCountries: [
    { name: "México", listeners: "1.3M", flagFileName: "mex.jpg" },
    { name: "Chile", listeners: "1.2M", flagFileName: "chile.jpg" },
    { name: "Argentina", listeners: "500K", flagFileName: "arg.jpg" },
  ],
  worldTour: [
    { location: "Buenos Aires, Argentina", date: "2025-01-10" },
  ],
}

const topPlaylists = [
  {
    id: '1',
    name: 'MANSIÓN REGGAETÓN',
    followers: '9.7M',
    imageUrl: 'https://i.scdn.co/image/ab67706f00000002f9bfcf2f714369d595b625fd',
    url: 'https://open.spotify.com/playlist/37i9dQZF1DWZjqjZMudx9T?si=a3d2eb419f684923'
  },
  {
    id: '2',
    name: 'Hits Urbanos',
    followers: '2.39M',
    imageUrl: 'https://i.scdn.co/image/ab67706f000000025288e87e10e233f4f9ab6dc0',
    url: 'https://open.spotify.com/playlist/37i9dQZF1DWVskFRGurTfg?si=9f1c0396c2604942'
  },
  {
    id: '3',
    name: 'Perreo Workout',
    followers: '1.49M',
    imageUrl: 'https://i.scdn.co/image/ab67706f0000000277e68846667b7fc2c316dc3b',
    url: 'https://open.spotify.com/playlist/37i9dQZF1DX9ZKyQHcEFXZ?si=1f0bd39f0a2f4f91'
  }
]

export default function ProducerPortafolio({ onContinue, onBack, albums, topSongs }: ProducerPortafolioProps) {
  const { pause, playSpecificSong, isSongPlaying } = useMusicPlayer()
  const [hoveredAlbum, setHoveredAlbum] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % profileImages.length)
    }, 6000) // Changed to 6 seconds

    return () => clearInterval(interval)
  }, [])

  const featuredProjects: FeaturedProject[] = [
    {
      id: 1,
      spotifyId: "7mXCrLeenoAdef6RDhDJRc",
      title: "Cabaña",
      artist: "El Jordan 23, Los Patos Feos Inc, NES",
      description: "",
      coverImage: "/cabana.jpg",
      spotifyUrl: "https://open.spotify.com/track/6UR1k5NGqgNGzgVmMtT768?si=49f5fb2171154c31",
      releaseDate: "Junio, 2023",
      achievements: ["Top 10 Billboard Latino", "300M+ Reproducciones"],
      awards: {
        platinum: 3,
        gold: 1
      },
      stats: {
        totalPlays: "300M+",
        monthlyListeners: "1.2M",
        chartPosition: 1,
        popularity: 85,
        markets: 45,
        streams: {
          total: "5M+",
          monthly: "1.2M",
          peak: "250K"
        },
        topCountries: [],
        features: {
          danceability: 0.8,
          energy: 0.9,
          valence: 0.75,
          tempo: 128,
          acousticness: 0.2,
          instrumentalness: 0.1,
          liveness: 0.3,
          speechiness: 0.4
        }
      }
    },
    {
      id: 2,
      spotifyId: "2kvpHbQHp9QmcG9WhyLwco",
      title: "Daytona",
      artist: "Cris Mj, NES",
      description: "",
      coverImage: "/partyson.jpg",
      spotifyUrl: "https://open.spotify.com/track/2kvpHbQHp9QmcG9WhyLwco?si=531c9de86fba4874",
      releaseDate: "Noviembre, 2023",
      achievements: ["Top 10 Billboard Latino", "200M+ Reproducciones"],
      awards: {
        platinum: 3,
        gold: 2
      },
      stats: {
        totalPlays: "320M+",
        monthlyListeners: "1.4M",
        chartPosition: 2,
        popularity: 85,
        markets: 45,
        streams: {
          total: "5M+",
          monthly: "1.2M",
          peak: "250K"
        },
        topCountries: [],
        features: {
          danceability: 0.8,
          energy: 0.9,
          valence: 0.75,
          tempo: 128,
          acousticness: 0.2,
          instrumentalness: 0.1,
          liveness: 0.3,
          speechiness: 0.4
        }
      }
    },
    {
      id: 3,
      spotifyId: "604IC2o3T3bxPu6C7Pimd7",
      title: "QUE LE DE",
      artist: "NES, Cris Mj",
      description: "",
      coverImage: "/quelede.jpg",
      spotifyUrl: "https://open.spotify.com/track/604IC2o3T3bxPu6C7Pimd7?si=6870c807ac2f415b",
      releaseDate: "Julio, 2024",
      achievements: ["Top 10 Billboard Latino", "40M+ Reproducciones"],
      awards: {
        platinum:1,
        gold: 1
      },
      stats: {
        totalPlays: "40M+",
        monthlyListeners: "350K",
        chartPosition: 3,
        popularity: 85,
        markets: 45,
        streams: {
          total: "1.2M",
          monthly: "350K",
          peak: "100K"
        },
        topCountries: [],
        features: {
          danceability: 0.8,
          energy: 0.9,
          valence: 0.75,
          tempo: 128,
          acousticness: 0.2,
          instrumentalness: 0.1,
          liveness: 0.3,
          speechiness: 0.4
        }
      }
    }
  ];
  
  const handlePlayPause = (song: Song) => {
    if (isSongPlaying(song.id)) {
      pause()
    } else {
      playSpecificSong(song)
    }
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed pt-20 relative"
         style={{ backgroundImage: `url('${('/quelede.jpg')}')` }}>
      <div className="fixed inset-0 backdrop-blur-sm bg-black/40" />
      
      {/* Content container */}
      <div className="relative z-10 min-h-screen overflow-y-auto py-8 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Enhanced Producer Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <Card className="bg-black/40 text-white border-0 shadow-2xl backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="relative p-6 backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row gap-8">
                      {/* Profile Image Section */}
                      <div className="relative w-full md:w-[380px] aspect-square">
                        <div className="relative h-full overflow-hidden rounded-xl group">
                          <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                              key={currentImageIndex}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ 
                                duration: 0.7,
                                ease: [0.32, 0.72, 0, 1] // Custom easing for smoother animation
                              }}
                              className="absolute inset-0"
                            >
                              <Image
                                src={profileImages[currentImageIndex].src}
                                alt={producerInfo.name}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, 380px"
                                quality={90}
                              />
                              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
                            </motion.div>
                          </AnimatePresence>
                          
                          {/* Image navigation dots */}
                          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                            {profileImages.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                  index === currentImageIndex 
                                    ? 'bg-white w-6' 
                                    : 'bg-white/50 hover:bg-white/75'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 space-y-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                              {producerInfo.name}
                            </h2>
                            <h3 className="text-xl font-medium text-gray-400">Productor Musical</h3>
                          </div>
                          
                          {/* Social Media Icons */}
                          <div className="flex gap-3">
                            {producerInfo.socialMedia.map((social) => {
                              const config = socialMediaConfig[social.platform];
                              return (
                                <a
                                  key={social.platform}
                                  href={social.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`p-2.5 rounded-full ${config.color} hover:opacity-90 transition-all duration-300 group`}
                                >
                                  <config.Icon className="h-5 w-5 text-white" />
                                </a>
                              );
                            })}
                          </div>
                        </div>

                        <p className="text-gray-300 leading-relaxed">{producerInfo.bio}</p>

                        {/* Sony Certification Badge */}
                        <div className="relative">
                          <div className="absolute inset-0 bg-black/40 rounded-lg blur-lg opacity-50" />
                          <Card className="relative border-0 p-4 backdrop-blur-sm shadow-lg animate-card-gradient">
                            <div className="flex items-center gap-4">
                              <div className="opacity-80">
                                <Image 
                                  src="/sony.png" 
                                  alt="Sony Music" 
                                  width={60} 
                                  height={24}
                                  className="object-contain"
                                />
                              </div>
                              <div className="flex-1 text-center">
                                <h1 className="text-4xl font-extrabold text-black bg-clip-text text-black/80 font-quicksand">
                                  Certificado por Sony Music
                                </h1>
                              </div>
                            </div>
                          </Card>
                        </div>

                        
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[
                            { icon: Music2, value: '4.93M', label: 'Reproducciones Mensuales', color: 'text-blue-500' },
                            { icon: Globe2, value: '10+', label: 'Países', color: 'text-purple-500' },
                            { icon: Award, value: '15', label: 'Top 50 Charts', color: 'text-pink-500' },
                            { icon: Trophy, value: '15+', label: 'Discos de Platino', color: 'text-indigo-500' }
                          ].map((stat, index) => (
                            <Card 
                              key={index} 
                              className="bg-white/5  border-0 p-4 text-center hover:bg-zinc-900/70 transition-colors duration-300"
                            >
                              <stat.icon className={`h-5 w-5 mx-auto mb-2 ${stat.color}`} />
                              <div className="text-2xl text-white/80 font-bold">{stat.value}</div>
                              <div className="text-xs text-white/60">{stat.label}</div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Achievements Section */}
                  <div className="border-t border-white/10 pt-6">
                    <div className="flex items-center gap-2.5 mb-6">
                      <Award className="h-6 w-6 text-white/80" />
                      <h3 className="text-2xl font-bold">Logros Destacados</h3>
                    </div>
                  </div>
                    
                    <div className="flex flex-col gap-3">
                      {[
                        {
                          icon: Star,
                          title: 'Más de 15 discos de platino',
                          subtitle: '2023 Reconocimiento',
                          awards: 3,
                          gradient: 'from-amber-900/30 to-yellow-900/30'
                        },
                        {
                          icon: BarChart3,
                          title: '600+ millones de reproducciones totales',
                          subtitle: '2022-2023',
                          info: 'Alcance Global',
                          gradient: 'from-blue-900/30 to-indigo-900/30'
                        },
                        {
                          icon: TrendingUp,
                          title: 'Productor del Año 2023',
                          subtitle: 'Reconocimiento de la Industria',
                          gradient: 'from-emerald-900/30 to-green-900/30'
                        },
                        {
                          icon: Globe2,
                          title: 'Colaboraciones Internacionales',
                          subtitle: 'Top 10 Productores en Spotify Chile',
                          gradient: 'from-purple-900/30 to-fuchsia-900/30'
                        }
                      ].map((achievement, index) => (
                        <div key={index} className="group relative">
                          <div className={`absolute -inset-0.5 bg-gradient-to-r ${achievement.gradient} rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-500`}></div>
                          <div className="relative p-4 bg-white/5 rounded-lg backdrop-blur-sm">
                            <div className="flex items-center gap-3">
                              <div className="p-2.5 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                                <achievement.icon className="h-5 w-5 text-white/80" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="text-base font-medium text-white/90 leading-tight">
                                  {achievement.title}
                                </h4>
                                <p className="text-sm text-white/60 mt-0.5">
                                  {achievement.subtitle}
                                </p>
                                {achievement.awards && (
                                  <div className="flex gap-1.5 mt-2">
                                    {[...Array(achievement.awards)].map((_, i) => (
                                      <div 
                                        key={i} 
                                        className="w-6 h-6 rounded-full bg-white/10 p-1.5 group-hover:bg-white/20 transition-colors"
                                      >
                                        <Disc className="w-full h-full text-white/70" />
                                      </div>
                                    ))}
                                  </div>
                                )}
                                {achievement.info && (
                                  <div className="flex items-center gap-1.5 mt-1.5">
                                    <Users className="h-3.5 w-3.5 text-white/60" />
                                    <span className="text-sm text-white/60">{achievement.info}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Specializations & Skills Section */}
                  <div className="border-t border-white/10 pt-8"> 
                    <div className="flex items-center gap-3 mb-8">
                      <Laptop className="h-7 w-7 text-white/80" />
                      <h3 className="text-2xl font-bold">Experiencia en Producción</h3>
                    </div>
                      
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Habilidades de Producción Básicas */}
                      <div className="group relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-500"></div>
                        <div className="relative h-full p-6 bg-white/5 rounded-xl backdrop-blur-sm">
                          <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
                            <Music className="h-5 w-5 text-white/80" /> Competencias Básicas
                          </h4>
                          
                          <div className="space-y-5">
                            {[
                              { name: 'Producción Urbana', color: 'from-purple-500/50 to-violet-500/50', level: 95 },
                              { name: 'Producción Vocal', color: 'from-blue-500/50 to-cyan-500/50', level: 90 },
                              { name: 'Diseño de Sonido', color: 'from-emerald-500/50 to-green-500/50', level: 85 },
                              { name: 'Creación de Beats', color: 'from-rose-500/50 to-pink-500/50', level: 92 },
                              { name: 'Composición', color: 'from-amber-500/50 to-yellow-500/50', level: 88 },
                              { name: 'Mezcla', color: 'from-teal-500/50 to-cyan-500/50', level: 87 }
                            ].map((skill) => (
                              <div key={skill.name} className="relative">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm font-medium text-white/90">{skill.name}</span>
                                  <span className="text-xs text-white/60">{skill.level}%</span>
                                </div>
                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-500 ease-out`}
                                    style={{ width: `${skill.level}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Configuración del Estudio */}
                      <div className="group relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-900/30 to-orange-900/30 rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-500"></div>
                        <div className="relative h-full p-6 bg-white/5 rounded-xl backdrop-blur-sm">
                          <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
                            <Package className="h-5 w-5 text-white/80" /> Configuración Profesional
                          </h4>

                          <div className="space-y-8">
                            <div>
                              <h5 className="text-sm text-white/60 mb-4">Software de Producción</h5>
                              <div className="grid grid-cols-1 gap-3">
                                {[
                                  { name: 'FL Studio', image: '/flstudio.png' },
                                ].map((software) => (
                                  <div key={software.name} 
                                       className="group/item relative"
                                  >
                                    <div className="relative bg-black/40 p-4 rounded-lg flex flex-col items-center gap-3 hover:bg-white/5 transition-colors duration-300">
                                      <Image 
                                        src={software.image}
                                        alt={software.name}
                                        width={48}
                                        height={48}
                                        className="rounded transition-transform duration-300 group-hover/item:scale-105"
                                      />
                                      <span className="text-sm text-white/70">{software.name}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h5 className="text-sm text-white/60 mb-4">Equipo Clave</h5>
                              <div className="grid grid-cols-2 gap-3">
                                {[
                                  { icon: Headphones, name: 'Universal Audio Apollo', desc: 'Interfaz de Audio' },
                                  { icon: Mic2, name: 'Neumann U87', desc: 'Micrófono de Condensador' },
                                  { icon: Speaker, name: 'Yamaha HS8', desc: 'Monitores de Estudio' },
                                  { icon: Piano, name: 'Native Instruments S88', desc: 'Controlador MIDI' }
                                ].map((item) => (
                                  <div 
                                    key={item.name}
                                    className="p-3 bg-black/40 rounded-lg hover:bg-white/5 transition-colors duration-300"
                                  >
                                    <div className="flex items-start gap-3">
                                      <div className="p-2 bg-white/5 rounded-lg">
                                        <item.icon className="h-4 w-4 text-white/70" />
                                      </div>
                                      <div>
                                        <h6 className="text-sm font-medium text-white/90">{item.name}</h6>
                                        <p className="text-xs text-white/50 mt-0.5">{item.desc}</p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <a 
                      href="mailto:contacto@nesproducciones.cl"
                      className="flex items-center gap-2.5 text-white/60 hover:text-white transition-colors group"
                    >
                      <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      <span className="text-sm hover:underline">contacto@nesproducciones.cl</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
              
            </motion.div>
                        
            {/* Services Card */}
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="lg:col-span-3"
            >
              <DynamicShowcase 
                featuredProjects={featuredProjects}
              />
            </motion.div>

            <TopPlaylists playlists={topPlaylists} />

            {/* Contact CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="lg:col-span-3"
            >
              <Card className="bg-black/40 text-white border-0 shadow-2xl backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="text-center max-w-2xl mx-auto">
                    <h3 className="text-2xl font-bold mb-4">¿Listo para crear música juntos?</h3>
                    <p className="text-gray-300 mb-6">
                      Contacta ahora para discutir tu próximo proyecto y llevar tu música al siguiente nivel
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        className="bg-white/10 hover:bg-white/20 text-white"
                        onClick={() => window.location.href = `mailto:${producerInfo.contact}`}
                      >
                        <Mail className="h-5 w-5 mr-2" />
                        Enviar Email
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                        onClick={() => window.open(producerInfo.socialMedia[0].url, '_blank')}
                      >
                        <Instagram className="h-5 w-5 mr-2" />
                        Mensaje Directo
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
import { Instagram, Twitter, Youtube, AirplayIcon as Spotify } from 'lucide-react'

export function SocialIcons() {
  const socialLinks = [
    { icon: <Instagram className="h-6 w-6" />, href: 'https://instagram.com/producer' },
    { icon: <Twitter className="h-6 w-6" />, href: 'https://twitter.com/producer' },
    { icon: <Youtube className="h-6 w-6" />, href: 'https://youtube.com/producer' },
    { icon: <Spotify className="h-6 w-6" />, href: 'https://open.spotify.com/artist/producer' },
  ]

  return (
    <div className="flex justify-center space-x-6">
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-yellow-400 transition-colors"
        >
          {link.icon}
        </a>
      ))}
    </div>
  )
}
'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { AlertCircle } from 'lucide-react'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8 relative">
          <AlertCircle className="h-24 w-24 text-primary mx-auto animate-pulse" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="text-4xl font-bold text-primary-foreground animate-bounce-404">404</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-foreground">Oops! Page Not Found</h1>
        <p className="text-xl mb-8 text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Button onClick={() => router.push('/')} className="animate-pulse-slow">
          Volver a la página principal
        </Button>
      </div>
      <style jsx global>{`
        @keyframes bounce-404 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.1); }
        }
        .animate-bounce-404 {
          animation: bounce-404 2s infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite;
        }
      `}</style>
    </div>
  )
}
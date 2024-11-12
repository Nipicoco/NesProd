'use client'

import React, { createContext, useContext, useState } from 'react'

type NavigationContextType = {
  currentPath: string[]
  setCurrentPath: (path: string[]) => void
  onBack?: () => void
  setOnBack: (callback: (() => void) | undefined) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export const useNavigation = () => {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider')
  }
  return context
}

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string[]>(['Home'])
  const [onBack, setOnBack] = useState<(() => void) | undefined>(undefined)

  return (
    <NavigationContext.Provider value={{ currentPath, setCurrentPath, onBack, setOnBack }}>
      {children}
    </NavigationContext.Provider>
  )
} 
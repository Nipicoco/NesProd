import { useEffect } from 'react'

export const useImagePreload = (imagePaths: string[]) => {
  useEffect(() => {
    const preloadImages = imagePaths.map(path => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = path
      return link
    })

    preloadImages.forEach(link => document.head.appendChild(link))

    return () => {
      preloadImages.forEach(link => document.head.removeChild(link))
    }
  }, [imagePaths])
}

export const useAudioPreload = (audioPaths: string[]) => {
  useEffect(() => {
    const audioElements = audioPaths.map(path => {
      const audio = new Audio()
      audio.preload = 'metadata'
      audio.src = path
      return audio
    })

    return () => {
      audioElements.forEach(audio => {
        audio.src = ''
        audio.remove()
      })
    }
  }, [audioPaths])
}

export const measurePerformance = (metricName: string) => {
  if (typeof performance === 'undefined') return

  const mark = `${metricName}-start`
  const measure = metricName

  performance.mark(mark)

  return () => {
    try {
      performance.measure(measure, mark)
      const entries = performance.getEntriesByName(measure)
      const duration = entries[0]?.duration
      console.debug(`${metricName} took ${duration}ms`)
      performance.clearMarks(mark)
      performance.clearMeasures(measure)
    } catch (error) {
      console.warn(`Error measuring ${metricName}:`, error)
    }
  }
}

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}
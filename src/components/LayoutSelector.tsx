'use client'

import { Button } from "@/components/ui/button"
import { Grid, Columns } from "lucide-react"

interface LayoutSelectorProps {
  layout: 'grid' | 'carousel'
  setLayout: (layout: 'grid' | 'carousel') => void
}

export default function LayoutSelector({ layout, setLayout }: LayoutSelectorProps) {
  return (
    <div className="flex justify-center space-x-4 mb-6">
      <Button
        variant={layout === 'grid' ? 'default' : 'outline'}
        onClick={() => setLayout('grid')}
      >
        <Grid className="mr-2 h-4 w-4" />
        Grid
      </Button>
      <Button
        variant={layout === 'carousel' ? 'default' : 'outline'}
        onClick={() => setLayout('carousel')}
      >
        <Columns className="mr-2 h-4 w-4" />
        Carousel
      </Button>
    </div>
  )
}
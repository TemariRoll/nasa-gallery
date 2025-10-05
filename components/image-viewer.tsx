"use client"

import { useEffect } from "react"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import { X, ZoomIn, ZoomOut, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageViewerProps {
  image: {
    id: number
    title: string
    description: string
    src: string
  }
  onClose: () => void
}

export function ImageViewer({ image, onClose }: ImageViewerProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-4 z-10 h-10 w-10 rounded-full bg-card/80 text-foreground hover:bg-card"
        onClick={onClose}
      >
        <X className="h-5 w-5" />
        <span className="sr-only">Close viewer</span>
      </Button>

      {/* Image info */}
      <div className="absolute left-4 top-4 z-10 max-w-md rounded-lg bg-card/80 p-4 backdrop-blur-sm">
        <h2 className="mb-1 font-sans text-xl font-bold text-card-foreground">{image.title}</h2>
        <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{image.description}</p>
      </div>

      {/* Zoom controls */}
      <TransformWrapper initialScale={1} minScale={0.5} maxScale={8} centerOnInit>
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            {/* Control buttons */}
            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-lg bg-card/80 p-2 backdrop-blur-sm">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-foreground hover:bg-primary hover:text-primary-foreground"
                onClick={() => zoomIn()}
              >
                <ZoomIn className="h-5 w-5" />
                <span className="sr-only">Zoom in</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-foreground hover:bg-primary hover:text-primary-foreground"
                onClick={() => zoomOut()}
              >
                <ZoomOut className="h-5 w-5" />
                <span className="sr-only">Zoom out</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-foreground hover:bg-primary hover:text-primary-foreground"
                onClick={() => resetTransform()}
              >
                <Maximize2 className="h-5 w-5" />
                <span className="sr-only">Reset zoom</span>
              </Button>
            </div>

            {/* Zoomable image */}
            <TransformComponent
              wrapperClass="!w-full !h-full flex items-center justify-center"
              contentClass="!w-auto !h-auto"
            >
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.title}
                className="max-h-[90vh] max-w-[90vw] object-contain"
              />
            </TransformComponent>
          </>
        )}
      </TransformWrapper>

      {/* Instructions */}
      <div className="absolute bottom-4 right-4 rounded-lg bg-card/80 p-3 text-xs text-muted-foreground backdrop-blur-sm">
        <p className="text-pretty">
          <span className="font-semibold text-foreground">Tip:</span> Click and drag to pan • Scroll to zoom • ESC to
          close
        </p>
      </div>
    </div>
  )
}

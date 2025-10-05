"use client"

import { useState } from "react"
import { ImageViewer } from "./image-viewer"
import { Card } from "@/components/ui/card"
import { Rocket } from "lucide-react"

const nasaImages = [
  {
    id: 1,
    title: "The Moon",
    description: "Webb Space Telescope captures the iconic Pillars of Creation",
    src: "/pillars-of-creation-nebula-space.jpg",
    thumbnail: "/pillars-of-creation-nebula-space-thumbnail.jpg",
    // Add the external URL for this specific item
    externalUrl: "https://pub-6408cffb5b2841e69181c7d05d188d0f.r2.dev/index.html",
  },
  {
    id: 2,
    title: "Planet Guessr",
    description: "Let´s see if you recognize the surfasces",
    src: "/carina-nebula-cosmic-cliffs-space.jpg",
    thumbnail: "/carina-nebula-cosmic-cliffs-space-thumbnail.jpg",
  },
  {
    id: 3,
    title: "Southern Ring Nebula",
    description: "A dying star creates stunning rings of gas",
    src: "/southern-ring-nebula-planetary-nebula.jpg",
    thumbnail: "/southern-ring-nebula-planetary-nebula-thumbnail.jpg",
  },
  {
    id: 4,
    title: "Deep Field",
    description: "Thousands of galaxies in a tiny patch of sky",
    src: "/deep-space-field-galaxies-hubble.jpg",
    thumbnail: "/deep-space-field-galaxies-hubble-thumbnail.jpg",
  },
  {
    id: 5,
    title: "Jupiter",
    description: "Webb captures Jupiter in unprecedented detail",
    src: "/jupiter-planet-infrared-space.jpg",
    thumbnail: "/jupiter-planet-infrared-space-thumbnail.jpg",
  },
  {
    id: 6,
    title: "Cartwheel Galaxy",
    description: "A galaxy shaped by a cosmic collision",
    src: "/cartwheel-galaxy-spiral-collision.jpg",
    thumbnail: "/cartwheel-galaxy-spiral-collision-thumbnail.jpg",
  },
]

export function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<(typeof nasaImages)[0] | null>(null)

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <header className="mb-12 text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <Rocket className="h-10 w-10 text-primary" />
          <h1 className="font-sans text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            NASA Image Gallery
          </h1>
        </div>
        <p className="mx-auto max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground">
          Explore stunning images from space. Click any image to zoom and pan for detailed viewing.
        </p>
      </header>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {nasaImages.map((image) => {
          // Define the card's content to avoid repetition
          const CardContent = (
            <>
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={image.thumbnail || "/placeholder.svg"}
                  alt={image.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <div className="p-4">
                <h3 className="mb-1 font-sans text-lg font-semibold text-card-foreground">{image.title}</h3>
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{image.description}</p>
              </div>
            </>
          )

          // Conditionally render an <a> tag for "The Moon" or a regular Card for others
          if (image.title === "The Moon" && image.externalUrl) {
            return (
              <a
                key={image.id}
                href={image.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card className="group overflow-hidden border-border bg-card transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/20">
                  {CardContent}
                </Card>
              </a>
            )
          }

          return (
            <Card
              key={image.id}
              className="group cursor-pointer overflow-hidden border-border bg-card transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/20"
              onClick={() => setSelectedImage(image)}
            >
              {CardContent}
            </Card>
          )
        })}
      </div>

      {/* Image Viewer Modal */}
      {selectedImage && <ImageViewer image={selectedImage} onClose={() => setSelectedImage(null)} />}
    </div>
  )
}